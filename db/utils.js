const {Client } = require('pg');
const config = require('../config').db;

const connectionString = `postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;

var getClient = () => {
    var client = new Client(connectionString);
    return client;
}

var getConnectedClient = async () => {
    let client = getClient();
    await client.connect();
    return client;
}

module.exports = {
    getClient,
    getConnectedClient
}