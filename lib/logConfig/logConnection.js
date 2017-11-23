var expressWinston = require('express-winston');
var fs = require('file-system');
var winston = require('winston');
//var winstonRotator = require('winston-daily-rotate-file');

if(!fs.existsSync('/tmp/logs')){
    fs.mkdirSync('/tmp/logs');
}

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

const logwriter = new winston.Logger({
    'transports': [new (winston.transports.Console)()]
});
/*logwriter.add(winstonRotator, {
    'name': 'access-file',
    'level': 'info',
    'filename': '/tmp/logs/apilogs.log',
    'json': true,
    'datePattern': 'yyyy-MM-dd-',
    'prepend': true
});*/

module.exports = {
    logwriter: logwriter,
    winston: winston
};