const axios = require('axios');

async function getToken(email, password) {
    try {
        const response = await axios.post('https://ips.navigine.com/auth/login', {
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
        throw err;
    }
}

module.exports = { getToken };