var tweet = require('./tweet');
var dynamo = require('./dynamo');
var monitoring = require('./monitoring');
var util = require('./util');
const fs = require('fs');


async function iniciar() {

    dynamo.read('tweets',
            '#filter = :filter_val AND #secondFilter = :secondFilter_val',
            JSON.parse('{ "#filter": "' + 'responsible' + '", "#secondFilter": "' + 'date' + '"}'),
            JSON.parse('{ ":filter_val": "' + '5a4dfc09f4b89e1e063877415b84ea11' + '", ":secondFilter_val": "8/3/2020"}')
        )
        .then(data => console.log(data))
        .catch(err => console.log(err));


    /*     while (true) {
            if (tweet.search() == -1) {
                break;
            }
            await sleep(60000 * 30);

            console.log("XXXXXXXXXXXXXX");
        } */
}


function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}


iniciar();