const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');
const { getToken } = require('./src/getToken.js');
const { postTransmitter } = require('./src/postTransmitter.js');
const { Transmitter } = require('./src/transmitterCr.js');
const { api_key, email, password, objGroup } = require('./src/envs.js');


(async () => {
    try {
        const pathfile = path.join(__dirname, 'file.csv');
        const data = [];

        fs.createReadStream(pathfile)
            .pipe(csv())
            .on('data', (row) => {
                data.push(row);
            })
            .on('end', async () => {
                const token = await getToken(email, password);

                data.forEach(async (transmitterData) => {
                    try {
                        const transmitter = new Transmitter(api_key, transmitterData.mac, objGroup, transmitterData.mac, transmitterData.mac);
                        await postTransmitter(transmitter, token);
                    } catch(err) {
                        console.error(err.status);
                    }
                });
            });

    } catch(err) {
        console.error(err.status);
    }
})();