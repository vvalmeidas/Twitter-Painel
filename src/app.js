var read = require('./read_tweets');

var AWS = require("aws-sdk");

var params = {
    RequestItems: {
        "Music": {
            Keys: [{
                    "Artist": {
                        S: "No One You Know"
                    },
                    "SongTitle": {
                        S: "Call Me Today"
                    }
                },
                {
                    "Artist": {
                        S: "Acme Band"
                    },
                    "SongTitle": {
                        S: "Happy Day"
                    }
                },
                {
                    "Artist": {
                        S: "No One You Know"
                    },
                    "SongTitle": {
                        S: "Scared of My Shadow"
                    }
                }
            ],
            ProjectionExpression: "AlbumTitle"
        }
    }
};

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