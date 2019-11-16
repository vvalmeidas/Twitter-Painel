var read = require('./read_tweets');

var AWS = require('aws-sdk');
var config = {
    "apiVersion": "2012-08-10",
    "accessKeyId": "AKIAJ3PJ5N7YUZWPE66Q",
    "secretAccessKey": "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",
    "region": "us-east-2"
}
var dynamodb = new AWS.DynamoDB(config);

var params = {
    Item: {
        "AlbumTitle": {
            S: "Somewhjsdnjatttt Famous"
        },
        "Artist": {
            S: "No Onfdssfdeeeeee You Know"
        },
        "SongTitle": {
            S: "Calllll Me Today"
        }
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: "tweet"
};
dynamodb.putItem(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
});

var params = {
    TableName: "tweet"
};
dynamodb.scan(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data.Items); // successful response

});




async function iniciar() {
    /*
    while (true) {
        read.start();
        console.log("oi");
        await sleep(60000);
    }
    */
}


function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

iniciar();