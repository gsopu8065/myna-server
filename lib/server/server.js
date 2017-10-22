var express = require('express');
var loggerFile = require('./../logConfig/logger');
var logwriter = require('./../logConfig/logConnection').logwriter;
var winston = require('./../logConfig/logConnection').winston;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app =  express();
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();
app.use(loggerFile.logger(logwriter));
app.use(router);
app.use(loggerFile.errorLogger(logwriter, winston));

app.all('*', function(req, res,next) {
    /**
     * Response settings
     * @type {Object}
     */
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };

    /**
     * Headers
     */
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }

});


app.get('/myna/healthcheck', function (req, res) {
    res.send('Hello World');
});


var server = app.listen(8081, function(){
    logwriter.info("server started with port # 8081")
});

module.exports = app;