var read = require('./read_tweets');

var AWS = require("aws-sdk");

var dynamodb = new AWS.DynamoDB({ region: 'sa-east-1' });
dynamodb.batchGetItem(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
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