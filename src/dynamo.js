var AWS = require('aws-sdk');
require('dotenv').config();

var config = {
    "apiVersion": "2012-08-10",
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
    "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
    "region": "us-east-2"
}
var dynamodb = new AWS.DynamoDB(config);
var itemData = {};
var S;

module.exports.saveData = function(tableName, data) {
    Object.keys(data).forEach(key => {
        S = data[key];
        itemData[key] = { S };
    });

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
};

//adicionar parâmetro para especificação da busca
module.exports.readTable = function(tableName) {
    params = {
        TableName: tableName
    };

    dynamodb.scan(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log("qqqqqq");
            console.log(data.Items);
            return data.Items;
        }

    });
};