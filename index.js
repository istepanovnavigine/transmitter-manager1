const ExcelJS = require('exceljs');
const path = require('path');
const { getToken } = require('./src/getToken.js');
const { postTransmitter } = require('./src/postTransmitter.js');
const { Transmitter } = require('./src/transmitterCr.js');
const { api_key, email, password, objGroup } = require('./src/envs.js');


(async () => {
    try {
        const pathfile = path.join(__dirname, 'file.xlsx');

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(pathfile);

        const worksheet = workbook.getWorksheet(1); 

        const data = [];

        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
            data.push(row.values.slice(1)); 
        });

        const token = await getToken(email, password);

        const transmitterData = data[0];

        const transmitter = new Transmitter(api_key, transmitterData[0], objGroup, transmitterData[1], transmitterData[2]);

        await postTransmitter(transmitter, token);
    } catch(err) {
        console.error(err);
    }
})();