//TO:Do: Singleton
var dynamo = require('./dynamo');
var crypto = require('crypto');
var util = require('./util');


var data = {};
var id;

class Monitoring {
    constructor(id, query, count, tweetMode, resultType, cityName, lat, long, radius) {
        this.id = id;
        this.query = query;
        this.count = count;
        this.tweetMode = tweetMode;
        this.resultType = resultType;
        this.cityName = cityName;
        this.lat = lat;
        this.long = long;
        this.radius = radius;
    }

    getParams(sinceId) {
        if (sinceId == undefined) {
            return {
                "id": this.id,
                "q": this.query,
                "count": this.count,
                "tweet_mode": this.tweetMode,
                "result_type": this.resultType,
                "geocode": this.lat + ',' + this.long + ',' + this.radius
            };
        } else {
            return {
                "id": this.id,
                "q": this.query,
                "count": this.count,
                "tweet_mode": this.tweetMode,
                "result_type": this.resultType,
                "since_id": sinceId,
                "geocode": this.lat + ',' + this.long + ',' + this.radius
            };
        }

    }

    getId() {
        return this.id;
    }

}

module.exports.add = async function(query, count, tweetMode, resultType, cityName, radius) {
    var coordinates = util.getCityCoordinates(cityName);

    var lat = coordinates[0];
    var long = coordinates[1];
    var result;

    id = crypto.createHash("md5").update(query + count + tweetMode + cityName + lat + long + radius).digest("hex");

    await dynamo.write("monitorings", new Monitoring(id, query, count.toString(), tweetMode, resultType, cityName, lat.toString(), long.toString(), radius))
        .then(function(data) {
            return data;
        });
}

module.exports.getMonitorings = async function() {
    var results = [];

    await dynamo.read("monitorings")
        .then(function(data) {
            data.forEach(monitoring => {
                results.push(new Monitoring(
                    monitoring.id,
                    monitoring.query,
                    monitoring.count,
                    monitoring.tweetMode,
                    monitoring.resultType,
                    monitoring.cityName,
                    monitoring.lat,
                    monitoring.long,
                    monitoring.radius
                ));
            });
        })

    return results;
}