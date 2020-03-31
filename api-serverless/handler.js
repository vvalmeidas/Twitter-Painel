/* 'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.search = async event => {
    var columnFilter = null;

    if (!('table' in event.queryStringParameters)) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                    message: 'Table parameter missing'
                },
                null,
                2
            ),
        };
    }

    Object.keys(event.queryStringParameters).forEach(key => {
        if (key != 'table' && key != 'startkey') {
            columnFilter = key;
        }
    });


    var params = {};

    return new Promise(async function(resolve, reject) {
        params.TableName = event.queryStringParameters.table;

        if (columnFilter != null) {
            params.FilterExpression = "#filter = :filter_val";
            params.ExpressionAttributeNames = JSON.parse('{ "#filter": "' + columnFilter + '" }');
            params.ExpressionAttributeValues = JSON.parse('{ ":filter_val": "' + event.queryStringParameters[columnFilter] + '" }');
        }

        if ('startkey' in event.queryStringParameters) {
            params.ExclusiveStartKey = JSON.parse('{ "id": "' + event.queryStringParameters.startkey + '" }');
        }

        try {
            const awsRequest = await dynamoDb.scan(params);
            const result = await awsRequest.promise().then(function(data) {
                resolve(data);
            }, function(error) {
                reject(error);
            });

        } catch (error) {
            reject(error);
        }
    }).then(function(data) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                    result: data,
                },
                null,
                2
            ),
        };
    }, function(error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                    message: error
                },
                null,
                2
            ),
        };
    });
};


module.exports.read = async event => {
    return {
        statusCode: 500,
        body: JSON.stringify({
                message: event
            },
            null,
            2
        ),
    };
}; */