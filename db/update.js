var utils = require("./utils");

module.exports = async (data) => {
    var client = await utils.getConnectedClient();
    var updateString = '';
    for(key of Object.keys(data.update)) {
        updateString = updateString + ` ${key} = '${data.update[key]}',`;
    }
    updateString = updateString.substring(0, updateString.length - 1);
    var queryString = `UPDATE content set${updateString} where id = '${data.id}'`;
    await client.query(queryString, []);
    await client.end();
}