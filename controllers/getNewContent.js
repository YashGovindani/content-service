var db = require('../db');

module.exports = async (req, res, _next) => {
    if(!req.body) {
        res.status(400);
        return res.json({
            status: "failed",
            message: "invalid input"
        });
    }
    try {
        var result = await db.getNewContent();
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