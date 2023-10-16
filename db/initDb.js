var fs = require('fs/promises');
var pg = require('pg');
var utils = require('./utils');
var path = require('path');

module.exports = async () => {
    try {
        var client = await utils.getConnectedClient();
        let queryString = await fs.readFile(path.join(__dirname, '..', 'schema.sql'), "utf8");
        await client.query(queryString);
        await client.end();
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}