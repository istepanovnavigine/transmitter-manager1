class Transmitter {
    constructor(apiKey, title, groupId, mac, deviceTitle) {
        this.api_key = apiKey;
        this.title = title;
        this.group = {id: groupId};
        this.device = {
            mac: mac,
            title: deviceTitle
        };
    }
}

module.exports = { Transmitter }