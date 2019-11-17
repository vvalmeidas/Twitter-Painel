var AWS = require('aws-sdk');

var config = {
    "apiVersion": "2012-08-10",
    "accessKeyId": "AKIAJ3PJ5N7YUZWPE66Q",
    "secretAccessKey": "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",
    "region": "us-east-2"
}
var dynamodb = new AWS.DynamoDB(config);

module.exports.saveData = function(id, text, date, isRT) {
    params = {
        Item: {
            "id": {
                S: id
            },
            "text": {
                S: text
            },
            "date": {
                S: date
            },
            "isRT": {
                S: isRT
            }
        },
        ReturnConsumedCapacity: "TOTAL",
        TableName: "tweets"
    };

    dynamodb.putItem(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
    });
};

module.exports.readTable = function(tableName) {
    params = {
        TableName: tableName
    };

    dynamodb.scan(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data.Items); // successful response

    });
};