var read = require('./read_tweets');


async function iniciar() {
    while (true) {
        read.start();
        console.log("oi");
        await sleep(60000);
    }
}


function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

iniciar();