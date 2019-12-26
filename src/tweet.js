var client = require('./twitter_client');
var dynamo = require('./dynamo');
var monitoring = require('./monitoring');
var util = require('./util');
const fs = require('fs');



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


//aux
var i = 0;
var dateTimeConverted;
var result;
var lastId = {};
var firstResult = true;

//tratar caso sem coordenadas

module.exports.search = function() {
    monitoring.getMonitorings().then(function(data) {
        data.forEach(function(monitoring) {
            result = null;

            client.get('search/tweets', monitoring.getParams(lastId[monitoring.id]), function(error, tweets, response) {
                if (error == null) {
                    tweets.statuses.forEach(function(tweet) {
                        result = {};
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

                        //console.log(result);

                        dynamo.write('tweets', new Tweet(result)).catch(function(error) {
                            if (error.code != 'ConditionalCheckFailedException') {
                                fs.appendFile("../log/log.txt", error + "\n", function(error) {
                                    if (error) {
                                        return console.log(error);
                                    }
                                });
                                return -1;
                            }
                        });

                        if (firstResult) {
                            lastId[monitoring.id] = result.id;
                            firstResult = false;
                        }

                        i++;
                    });
                    console.log(i + " " + monitoring.query);
                    i = 0;
                    firstResult = true;
                } else {
                    fs.appendFile("../log/log.txt", error + "\n", function(error) {
                        if (error) {
                            return console.log(error);
                        }
                    });

                    return -1;
                }
            });

        });
    }).catch(function(error) {
        fs.appendFile("../log/log.txt", error + "\n", function(error) {
            if (error) {
                return console.log(error);
            }
        });

        return -1;
    });

};