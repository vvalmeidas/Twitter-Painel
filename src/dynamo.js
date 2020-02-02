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

var cont = 1298;

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
                reject(error);
            });

        } catch (error) {
            reject(error);
        }
    });
}

module.exports.write = function(tableName, data) {
    return new Promise(async function(resolve, reject) {
        var itemData = {};
        var S;
        Object.keys(data).forEach(key => {
            S = data[key].toString();
            itemData[key] = S
        });

        params = {
            Item: itemData,
            ConditionExpression: "attribute_not_exists(id)",
            ReturnConsumedCapacity: "TOTAL",
            TableName: tableName
        };

        try {
            const awsRequest = await docClient.put(params);
            const result = await awsRequest.promise()
                .then(function(data) {
                    cont++;
                    resolve(data);
                }, function(error) {
                    reject(error);
                });

        } catch (error) {
            reject(error);
        }

        console.log("cont = " + cont);
    });

}