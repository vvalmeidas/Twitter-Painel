var util = require('./util');

//user settings
var registeredSearchs = [];

var searchParams = {};
var coordinates;

//pegar id do usuário e horário

//atualiza os parâmetros (pelo banco de dados) e adiciona eles no registeredSearch
module.exports.getUpdateParams = function() {
    searchParams.q = 'dua lipa';
    searchParams.tweet_mode = 'extended';
    searchParams.result_type = 'recent';
    searchParams.count = 100;
    coordinates = util.getCityCoordinates('São Paulo');
    searchParams.geocode = coordinates[0] + ',' + coordinates[1] + ',' + '10km'; //raios determinados

    console.log(util.getCityCoordinates('São Paulo'))

    registeredSearchs.push(searchParams);

    /*     searchParams = {};
        searchParams.q = 'rio vermelho';
        searchParams.tweet_mode = 'extended';
        searchParams.count = 100;
        coordinates = util.getCityCoordinates('Salvador');
        searchParams.geocode = coordinates[0] + ',' + coordinates[1] + ',' + '10km';

        console.log(util.getCityCoordinates('Salvador'))

        registeredSearchs.push(searchParams);

        searchParams = {};
        searchParams.q = 'assalto';
        searchParams.tweet_mode = 'extended';
        searchParams.count = 100;
        coordinates = util.getCityCoordinates('Rio de Janeiro');
        searchParams.geocode = coordinates[0] + ',' + coordinates[1] + ',' + '10km';

        console.log(util.getCityCoordinates('Rio de Janeiro'))

        registeredSearchs.push(searchParams);
        console.log(registeredSearchs);
     */
    return registeredSearchs;
};