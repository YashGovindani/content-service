var express = require('express');
var config = require('./config');
var routes = require('./routes');
var axios = require('axios');

var init = async () => {
    var app = express();
    var port = process.env.port || config.app.port;

    app.use(express.json());
    app.use(express.urlencoded({extended : true}));

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'z');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    app.use('/content', async (req, res, next) => {
        try {
            if(!req.body.userId) {
                res.status(400);
                return res.json({
                    status: "failed",
                    message: "userId needed"
                });
            }
            var userResp = await axios.post('http://localhost:9088/user/get', {
                "what": [],
                "by": {
                    "id": [req.body.userId]
                }
            });
            if(userResp.data.data.length <= 0) {
                res.status(403);
                return res.sendStatus(403);
            }
            next();
        } catch (err) {
            console.log(err);
            res.status(500);
            return res.json({
                status: "failed",
                message: "something went wrong"
            });
        }
    });

    app.use('/content', routes);

    app.listen(port, () => {
        console.log("App is listening on port : " + port)
    });
}

init();