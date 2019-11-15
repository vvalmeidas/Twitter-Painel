//user settings
var querySearch = 'twitter';
var cityName = 'Salvador';
var lat = '';
var long = '';
var radius = '5km';

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

    return registeredSearchs;
};