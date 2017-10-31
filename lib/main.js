var mongoDb = require('./database/connection.js');
var app = require('./server/server.js');
var upload = require('./database/s3Connection');
var firebase = require('./database/firebaseConnection');
var ValidationError = require('./errorhandling/errorHandle');
var logwriter = require('./../logConfig/logConnection').logwriter;

mongoDb(function (databaseConnection) {

});

module.exports = {
    app: app,
    mongoDb: mongoDb,
    s3Upload: upload,
    firebase: firebase,
    ValidationError: ValidationError,
    logwriter: logwriter
};