var client = require('./twitter_client');
var settingsSearch = require('./settings_search');
//var dynamo = require('./dynamo');
var monitoring = require('./monitoring');
var util = require('./util');

class Tweet {
    constructor(id, text, date, isRT) {
        this.id = id;
        this.text = text;
        this.date = date;
        this.isRT = isRT;
    }
};

//twitter search results
var text = '';
var id = '';
var isRt = false;


//aux
var i = 0;
var dateTimeConverted;

var params;
var result = {};

//tratar caso sem coordenadas

module.exports.search = function() {
    params = settingsSearch.getUpdateParams(); //trocar por busca de monitoring
    params.forEach(param => {
        client.get('search/tweets', param, function(error, tweets, response) {

            tweets.statuses.forEach(function(tweet) {
                result.id = tweet.id_str;
                result.user = tweet.user.screen_name;
                result.language = tweet.metadata.iso_language_code;

                dateTimeConverted = util.convertDateTime(tweet.created_at);
                result.date = dateTimeConverted[0];
                result.time = dateTimeConverted[1];

                if (tweet.retweeted_status) {
                    tweet = tweet.retweeted_status;
                    isRT = true;
                } else {
                    isRT = false;
                }

                result.text = tweet.full_text;
                result.isRT = isRT.toString();

                //dynamo.saveData("tweets", new Tweet(id, text, date, isRT.toString()));

                console.log("DADOS DO TWEET");
                console.log(result);
                console.log("\n\n");
                i++;

            });

            console.log(i);
            i = 0;
        });
    });
};