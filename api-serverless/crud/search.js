'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

function read(requestParameters, columnFilters, startKey) {
    return new Promise(async function(resolve, reject) {
        var params = {};

        params.TableName = requestParameters.table;

        if (columnFilters.length == 1) {
            params.FilterExpression = "#filter = :filter_val";
            params.ExpressionAttributeNames = {
                "#filter": columnFilters[0]
            };
            params.ExpressionAttributeValues = {
                ":filter_val": requestParameters[columnFilters[0]]
            };
        } else if (columnFilters.length == 2) {
            params.FilterExpression = "#filter = :filter_val AND #secondFilter = :secondFilter_val";
            params.ExpressionAttributeNames = {
                "#filter": columnFilters[0],
                "#secondFilter": columnFilters[1]
            };
            params.ExpressionAttributeValues = {
                ":filter_val": requestParameters[columnFilters[0]],
                ":secondFilter_val": requestParameters[columnFilters[1]]
            };
        }

        if (startKey != null) {
            params.ExclusiveStartKey = JSON.parse('{ "id": "' + startKey + '" }');
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
    });
}


module.exports.search = async event => {
    var columnFilters = [];

    if (!('table' in event.queryStringParameters)) {
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

    Object.keys(event.queryStringParameters).forEach(key => {
        if (key != 'table' && key != 'n') {
            columnFilters.push(key);
        }
    });

    var results = [];
    var foundResults = 0;
    var maxResults = Number(event.queryStringParameters.n);
    var startKey = null;
    var theresMore = true;

    while (maxResults > foundResults && theresMore) {
        await read(event.queryStringParameters, columnFilters, startKey).then(function(data) {

            for (var key in data.Items) {
                if (maxResults == foundResults) {
                    break;
                }

                results.push(data.Items[key]);
                foundResults++;
            }

            if ('LastEvaluatedKey' in data) {
                startKey = data.LastEvaluatedKey;
            } else {
                theresMore = false;
            }

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
    }

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
                count: foundResults,
                data: results
            },
            null,
            2
        ),
    };
};