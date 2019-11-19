var citiesData = require('../files/municipios.json');
var coordinates = [];

//tratar erro 
modules.exports.getCityCoordinates = function(cityName) {
    citiesData.forEach(city => {
        if (city.nome == cityName) {
            coordinates.push(city.latitude);
            coordinates.push(city.longitude);
        }
    });

    return coordinates;
}