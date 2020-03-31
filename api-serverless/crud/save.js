'use strict';

const querystring = require('querystring');

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.save = async event => {
    var body = querystring.parse(event.body);

    if (!('table' in body)) {
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                    message: 'Table name parameter missing'
                },
                null,
                2
            ),
        };
    }

    var itemData = {};
    var S;

    Object.keys(body).forEach(key => {
        if (key != 'table') {
            S = body[key].toString();
            itemData[key] = S
        }
    });

    return new Promise(async function(resolve, reject) {

        var params = {
            Item: itemData,
            ReturnConsumedCapacity: "TOTAL",
            TableName: body.table
        };

        try {
            const awsRequest = await dynamoDb.put(params);
            const result = await awsRequest.promise()
                .then(function(data) {
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
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                    message: 'Success'
                },
                null,
                2
            ),
        };
    }, function(error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                    message: error
                },
                null,
                2
            ),
        };
    });
};