const axios = require('axios');
const { authDNS } = require('./envs.js');

async function getToken(email, password) {
    try {
        const response = await axios.post(authDNS, {
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'User-Agent': 'IvanStepanov'
            }
        });

        return response.data.token;

    } catch(err) {
        console.error('GetToken Error: ', err.status);
    }
}

module.exports = { getToken };