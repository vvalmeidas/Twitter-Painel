var read = require('./tweet');
var dynamo = require('./dynamo');
var monitoring = require('./monitoring');

async function iniciar() {

    while (true) {
        read.start();
        await sleep(60000);
    }
}


function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

iniciar();