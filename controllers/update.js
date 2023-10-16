let db = require('../db');

let requestCheck = async (data) => {
    var failed = false;
    var msgs = [];
    let updates = data.update;
    if(!updates || Array.isArray(updates) || (typeof updates != "object")) {
        failed = true;
        msgs.push("invalid input");
        return {failed, msgs};
    }
    for (key of Object.keys(updates)) {
        if(["title", "story"].findIndex(val => val == key) == -1 || (typeof updates[key] != "string")) {
            failed = true;
            msgs.push("invalid input");
            return {failed, msgs};
        }
    }
    if(!data.id || typeof data.id != "string") {
        failed = true;
        msgs.push("invalid input");
        return {failed, msgs};
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
        await db.update(req.body);
        res.status(200);
        return res.json({
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
};