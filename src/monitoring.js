//TO:Do: Singleton
var dynamo = require('./dynamo');
var crypto = require('crypto');

var data = {};
var id;

class Monitoring {
    constructor(id, query, cityName, lat, long, radius) {
        this.id = id;
        this.query = query;
        this.cityName = cityName; //mudar para classe-objeto
        this.long = long;
        this.radius = radius;
    }
}

module.exports.newMonitoring = function(query, cityName, lat, long, radius) {
    console.log(query + cityName + lat + long + radius);
    id = crypto.createHash("md5").update(query + cityName + lat + long + radius).digest("hex");

    dynamo.saveData("monitorings", new Monitoring(id, query, cityName, lat, long, radius));
    //tratar exceção (já existe com id)
}

module.exports.getMonitorings = function() {
    var monitoringsTable = dynamo.readTable("monitorings");
    var monitorings = [];
    console.log(monitoringsTable);

    for (var monitoring in monitoringsTable) {
        console.log("oxeeee");
    }

    console.log(monitorings);

}