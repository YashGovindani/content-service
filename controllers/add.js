let db = require("../db");

var requestCheck = async (data) => {
    var failed = false;
    var msgs = [];
    if(Object.keys(data).length != 3) {
        failed = true;
        msgs.push("invalid input");
        return {failed, msgs};
    }
    for(key of Object.keys(data)) {
        if(["title", "story", "authorId"].findIndex(val => val == key) == -1) {
            failed = true;
            msgs.push("invalid input");
            return {failed, msgs};
        }
    }
    if(typeof data.title != "string") {
        failed = true;
        msgs.push(`title should be a string`);
    } 
    else if(data.title.length <= 0) {
        failed = true;
        msgs.push(`invalid title`);
    } 
    return {failed, msgs};
}

var handleArray = async (req, res, _next) => {
    try {
        var existing = [];
        if(req.body.length == 0)
        {
            res.status(200);
            return res.json({
                status: "success",
                countOfAdded: 0
            });
        }
        for(obj of req.body) {
            var checkResult = await requestCheck(obj);
            if(checkResult.failed) {
                existing.push({
                    data: obj,
                    messages: checkResult.msgs
                });
                continue;
            } 
            await db.add(obj);
        }
        res.status(200);
        if(existing.length > 0) {
            return res.json({
                status: "failed",
                messages: existing,
                countOfAdded: req.body.length - existing.length 
            })
        }
        else {
            return res.json({
                status: "success",
                countOfAdded: req.body.length
            });
        }
    } catch(err) {
        console.log(err);
        res.status(500);
        return res.json({
            status: "failed",
            message: "Something went wrong"
        });
    }
}

module.exports = async (req, res, _next) => {
    if(!req.body || !req.body.data || !Array.isArray(req.body.data)) {
        res.status(400);
        return res.json({
            status: "failed",
            message: "invalid input"
        });
    }
    req.body = req.body.data;
    return await handleArray(req, res, _next);
}