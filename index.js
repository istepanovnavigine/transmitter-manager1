const ExcelJS = require('exceljs');
const path = require('path');
const { getToken } = require('./src/getToken.js');
const { postTransmitter } = require('./src/postTransmitter.js');
const { Transmitter } = require('./src/transmitterCr.js');
const { api_key, email, password, objGroup } = require('./src/envs.js');


const transmitter = new Transmitter(api_key, "My_object10", objGroup, "AA:BB:CC:DD:EE:FF", "Device 40");

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

        await postTransmitter(transmitter, token);
    } catch(err) {
        console.error(err);
    }
})();