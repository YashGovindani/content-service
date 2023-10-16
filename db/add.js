var utils = require("./utils");

module.exports = async (data) => {
    var client = await utils.getConnectedClient();
    var queryString = "INSERT INTO content(title, story, authorId) VALUES($1, $2, $3)";
    await client.query(queryString,[data.title, data.story, data.authorId]);
    await client.end();
}