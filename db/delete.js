var utils = require("./utils");

module.exports = async (id) => {
    var client = await utils.getConnectedClient();
    var queryString = `delete from content where id='${id}'`;
    await client.query(queryString, []);
    await client.end();
}