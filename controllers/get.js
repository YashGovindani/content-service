let db = require("../db");

let requestCheck = async (data) => {
    var failed = false;
    var msgs = [];
    let whats = data.what;
    if(!Array.isArray(whats)) {
        failed = true;
        msgs.push("invalid input");
        return {failed, msgs};
    }
    for (key of whats) {
        if(["id", "title", "story", "authorId", "created_at"].findIndex(val => val == key) == -1) {
            failed = true;
            msgs.push("invalid input");
            return {failed, msgs};
        }
    }
    data = data.by;
    if(Array.isArray(data) || typeof data != "object") {
        failed = true;
        msgs.push("invalid input");
    }
    for(key of Object.keys(data)) {
        if(["id", "title", "story", "authorId"].findIndex(val => val == key) == -1 || !Array.isArray(data[key])) {
            failed = true;
            msgs.push("invalid input");
            return {failed, msgs};
        }
        for(val of data[key]) {
            if(typeof val != "string") {
                failed = true,
                msgs.push(`${key} should be string`);
            }
        }
    }
    return {failed, msgs};
};

module.exports = async (req, res, _next) => {
    req.body = req.body.data;
    if(!req.body) {
        res.status(400);
        return res.json({
            status: "failed",
            message: "invalid input"
        });
    }
    try {
        var checkResult = await requestCheck(req.body);
        if(checkResult.failed) {
            res.status(400);
            return res.json({
                status: "failed",
                messages: checkResult.msgs
            });
        }
        let result = await db.get(req.body);
        res.status(200);
        return res.json({
            status: "success",
            data: result
        });
    } catch (err) {
        console.log(err);
        res.status(500);
        return res.json({
            status: "failed",
            message: "Something went wrong"
        });
    }
};