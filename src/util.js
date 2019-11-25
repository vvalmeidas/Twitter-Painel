var citiesData = require('../files/municipios.json');
var coordinates;
var dateTime;

var months = {
    'Jan': '01',
    'Feb': '02',
    'Mar': '03',
    'Apr': '04',
    'May': '05',
    'Jun': '06',
    'Jul': '07',
    'Aug': '08',
    'Sep': '09',
    'Oct': '10',
    'Nov': '11',
    'Dec': '12'
}


module.exports.months;

//tratar erro caso não ache cidade
module.exports.getCityCoordinates = function(cityName) {
    coordinates = [];
    citiesData.forEach(city => {
        if (city.nome == cityName) {
            coordinates.push(city.latitude);
            coordinates.push(city.longitude);
        }
    });

    return coordinates;
}

module.exports.convertDateTime = function(createdAt) {
    createdAt = createdAt.split(' ');

    var date = new Date(months[createdAt[1]] + '/' + createdAt[2] + '/' + createdAt[5] + ' ' + createdAt[3] + ' GMT');
    var dateLocale;
    var dateAux;
    dateTime = [];

    dateLocale = date.toLocaleString('pt-BR', { timeZone: 'America/Bahia' }).split(' ');
    dateAux = dateLocale[0].split('-');

    console.log(dateAux[2]);
    console.log(dateAux[1]);
    console.log(dateAux[0]);

    dateTime.push(dateAux[2] + '/' + dateAux[1] + '/' + dateAux[0]);
    dateTime.push(dateLocale[1]);
    return dateTime;
}