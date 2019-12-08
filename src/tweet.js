var client = require('./twitter_client');
var settingsSearch = require('./settings_search');
var dynamo = require('./dynamo');
var monitoring = require('./monitoring');
var util = require('./util');

class Tweet {
    constructor(result) {
        this.id = result.id;
        this.user = result.user;
        this.language = result.language;
        this.date = result.date;
        this.time = result.time;
        this.isRT = result.isRT;
        this.text = result.text;
        this.responsible = result.responsible;
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

    monitoring.getMonitorings().then(function(data) {
        data.forEach(monitoring => {
            client.get('search/tweets', monitoring.getParams(), function(error, tweets, response) {

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

                    result.responsible = monitoring.id;

                    dynamo.write('tweets', new Tweet(result)).catch(function(error) {
                        if (error.code != 'ConditionalCheckFailedException') {
                            console.log(error.message);
                        }
                    })
                    i++;

                });

                console.log(i);
                i = 0;
            });
        });
    })



};