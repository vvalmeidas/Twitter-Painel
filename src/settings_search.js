//user settings
var querySearch = 'dua lipa';
var cityName = 'São Paulo';
var lat = '';
var long = '';
var radius = '10km';

//reading geolocation data
var citiesData = require('../files/municipios.json');
citiesData.forEach(city => {
    if (city.nome == cityName) {
        lat = city.latitude;
        long = city.longitude;
    }
});

var registeredSearchs = [];

var searchParams = {};


module.exports.getUpdateParams = function() {
    //atualiza os parâmetros (pelo banco de dados) e adiciona eles no registeredSearch
    searchParams.q = querySearch;
    searchParams.tweet_mode = 'extended';
    searchParams.count = 100;
    searchParams.geocode = lat + ',' + long + ',' + radius;

    registeredSearchs.push(searchParams);

    console.log(registeredSearchs);

    return registeredSearchs;
};