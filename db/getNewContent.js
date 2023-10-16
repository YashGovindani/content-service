var utils = require("./utils");

module.exports = async () => {
    var client = await utils.getConnectedClient();
    var queryString = "SELECT * FROM content ORDER BY created_at DESC";
    let result = await client.query(queryString);
    await client.end();
    return result.rows;
}