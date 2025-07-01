const axios = require('axios');

async function postTransmitter(transmitter, token) {
    try {
        const response = await axios.post('https://rtls.navigine.com/tracking/v1/tracked-objects/create', transmitter, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'IvanStepanov',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('Status:', response.status);
        console.log('Data:', response.data);
        return response.data;
    } catch (err) {
        console.error('Post error:', err.response?.status, err.response?.data || err.message);
        throw err;
    }
}

module.exports = { postTransmitter };
