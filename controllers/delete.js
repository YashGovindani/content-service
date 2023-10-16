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
        if(!req.body.id || typeof req.body.id != "string") {
            res.status(400);
            return res.json({
                status: "failed",
                message: "invalid id"
            });
        }
        await db.delete(req.body.id);
        res.status(200);
        res.json({
            status: "success"
        });
    } catch (err) {
        console.log(err);
        res.status(500);
        return res.json({
            status: "failed",
            message: "Something went wrong"
        });
    }
}