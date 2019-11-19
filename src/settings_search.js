var util = require('./util');

//user settings
var querySearch = 'dua lipa';
var cityName = 'São Paulo';
var lat = '';
var long = '';
var radius = '10km';

var registeredSearchs = [];

var searchParams = {};
var coordinates;

//atualiza os parâmetros (pelo banco de dados) e adiciona eles no registeredSearch
module.exports.getUpdateParams = function() {
    searchParams.q = 'dua lipa';
    searchParams.tweet_mode = 'extended';
    searchParams.count = 100;
    coordinates = util.getCityCoordinates(cityName);
    searchParams.geocode = coordinates[0] + ',' + coordinates[1] + ',' + radius;

    registeredSearchs.push(searchParams);


    return registeredSearchs;
};