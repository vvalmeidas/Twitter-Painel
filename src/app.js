var tweet = require('./tweet');
var dynamo = require('./dynamo');
var monitoring = require('./monitoring');
var util = require('./util');

async function iniciar() {
    /* 
        var data = {};

        data.id = '119689528370034614019';
        data.user = 'GumballUniverso',
            data.date = '19/11/2019',
            data.time = '17:57:27',
            data.text = 'Dá uma olhada na mulherada que vai cantar no #AMAs2019 \n' +
            '\n' +
            'Toni Braxton\n' +
            'Shania Twain\n' +
            'Christina Aguilera\n' +
            'Kesha\n' +
            'Selena Gomez\n' +
            'Taylor Swift\n' +
            'Camila Cabello\n' +
            'Dua Lipa\n' +
            'Billie Eilish\n' +
            'Lizzo https://t.co/QRcTkYV0o0',
            data.isRT = 'true' */


    //dynamo.saveData("tweets", data);
    tweet.search();
    /* while (true) {
        
        await sleep(60000);
    }
 */
}


function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

iniciar();