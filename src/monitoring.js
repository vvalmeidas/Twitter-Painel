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
        this.cityName = cityName; //mudar para classe-objeto
        this.lat = lat;
        this.long = long;
        this.radius = radius;
    }

    getParams() {
        return {
            "id": this.id,
            "q": this.query,
            "count": this.count,
            "tweet_mode": this.tweetMode,
            "result_type": this.resultType,
            "geocode": this.lat + ',' + this.long + ',' + this.radius
        };
    }

}

module.exports.add = async function(query, count, tweetMode, resultType, cityName, radius) {
    var coordinates = util.getCityCoordinates(cityName);

    var lat = coordinates[0];
    var long = coordinates[1];
    var result;

    id = crypto.createHash("md5").update(query + count + tweetMode + cityName + lat + long + radius).digest("hex");

    await dynamo.write("monitorings", new Monitoring(id, query, count, tweetMode, resultType, cityName, lat, long, radius))
        .then(function(data) {
            return data;
        });
    //tratar exceção (já existe com id)
}

module.exports.getMonitorings = async function() {
    var monitoringsTable = await dynamo.readTable("monitorings");
    var results = [];

    monitoringsTable.forEach(monitoring => {
        results.push(monitoring);
    });

    return results;
}