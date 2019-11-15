require('dotenv').config();
var Twitter = require('twitter');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');


var dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
//user settings
var querySearch = 'twitter';
var cityName = 'Salvador';
var lat = '';
var long = '';
var radius = '5km';

//reading geolocation data
var citiesData = require('./municipios.json');
citiesData.forEach(city => {
    if (city.nome == cityName) {
        lat = city.latitude;
        long = city.longitude;
    }
});

//twitter search results
var text = '';
var id = '';
var isRt = false;
var date = '';

//aux
var i = 0;
var createdAt = '';
var months = {
    'Jan': '01',
    'Feb': '02',
    'Mar': '03',
    'Apr': '04',
    'May': '05',
    'Jun': '06',
    'Jul': '07',
    'Aug': '08',
    'Sep': '09',
    'Oct': '10',
    'Nov': '11',
    'Dec': '12'
}

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});




client.get('search/tweets', {
    q: querySearch,
    tweet_mode: 'extended',
    count: 100,
    geocode: lat + ',' + long + ',' + radius
}, function(error, tweets, response) {
    tweets.statuses.forEach(function(tweet) {
        id = tweet.id_str;
        createdAt = tweet.created_at.split(' ');
        date = createdAt[2] + '/' + months[createdAt[1]] + '/' + createdAt[5];

        if (tweet.retweeted_status) {
            tweet = tweet.retweeted_status;
            isRT = true;
        } else {
            isRT = false;
        }

        text = tweet.full_text;

        /*
        console.log("DADOS DO TWEET");
        console.log(id);
        console.log(text);
        console.log(date);
        console.log(isRT);
        console.log("\n\n");
*/
        var params = {
            Item: {
                "id": {
                    S: id
                },
                "text": {
                    S: text
                },
                "date": {
                    S: date
                }
            },
            ReturnConsumedCapacity: "TOTAL",
            TableName: "tweet"
        };
        dynamodb.putItem(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data); // successful response
        });

        i++;
    });

    console.log(i);
});