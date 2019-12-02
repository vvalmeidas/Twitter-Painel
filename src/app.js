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
    //tweet.search();
    /* while (true) {
        
        await sleep(60000);
    }
 */

    /*     monitoring.add('dua lipa', 100, 'extended', 'recent', 'São Paulo', '10km').then(function(uid) {
            console.log(uid);
        }).catch(err => {
            console.log(err.message)
        });
     */

    //monitoring.add('oi', 100, 'extended', 'recent', 'Rio de Janeiro', '10km').catch(error => console.log(error.message))


}


function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

iniciar();