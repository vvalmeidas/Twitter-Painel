const AWS = require('aws-sdk');
require('dotenv').config();

var settings = {
    "apiVersion": "2012-08-10",
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
    "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
    "region": "us-east-2"
}

AWS.config.update(settings);
const docClient = new AWS.DynamoDB.DocumentClient();


var dynamodb = new AWS.DynamoDB();

var itemData = {};
var S;


//adicionar parâmetro para especificação da busca

module.exports.read = function(tableName, filterExpression, expressionAttributeValues) {
    return new Promise(async function(resolve, reject) {
        params = {
            TableName: tableName,
            FilterExpression: filterExpression,
            ExpressionAttributeValues: expressionAttributeValues
        };

        try {
            const awsRequest = await docClient.scan(params);
            const result = await awsRequest.promise().then(function(data) {
                resolve(data.Items);
            }, function(error) {
                reject(Error("Não retornou resultado"));
            });

        } catch (error) {
            reject(error);
        }
    });
}

module.exports.write = function(tableName, data) {
    return new Promise(async function(resolve, reject) {
        Object.keys(data).forEach(key => {
            S = data[key];
            itemData[key] = { S };
        });

        console.log(itemData);

        params = {
            Item: data,
            ConditionExpression: "attribute_not_exists(id)",
            ReturnConsumedCapacity: "TOTAL",
            TableName: tableName
        };

        try {
            const awsRequest = await docClient.put(params);
            const result = await awsRequest.promise().then(function(data) {
                resolve(data);
            }, function(error) {
                reject(Error(error.message));
            });

        } catch (error) {
            reject(error);
        }
    });
}

/* module.exports.saveData = function(tableName, data) {


    console.log(itemData);

    params = {
        Item: itemData,
        ConditionExpression: "attribute_not_exists(id)",
        ReturnConsumedCapacity: "TOTAL",
        TableName: tableName
    };

    dynamodb.putItem(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
    });
}; */