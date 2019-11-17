var read = require('./read_tweets');


async function iniciar() {
    /*
    while (true) {
        read.start();
        await sleep(60000);
    }
    */
    read.start();
}


function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

iniciar();