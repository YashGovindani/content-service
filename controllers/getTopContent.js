var db = require("../db");
var axios = require("axios");

module.exports = async (req, res, _next) => {
    if(!req.body) {
        res.status(400);
        return res.json({
            status: "failed",
            message: "invalid input"
        });
    }
    try {
        var interactionResp = await axios.post('http://localhost:9888/user-interaction/topContent', {
            "userId": req.body.userId
        });
        var data = interactionResp.data.data;
        var result = await db.get({
            what: [], 
            by: {
                "id": data.map(row => row.content_id)
            }
        });
        result = data.map(row => {return {...row ,...result.find(content => content.id == row.content_id)}});
        res.status(200);
        return res.json({
            status: "success",
            data: result 
        });
    } catch(err) {
        console.log(err);
        res.status(500);
        return res.json({
            status: "failed",
            message: "Something went wrong"
        });
    }
}