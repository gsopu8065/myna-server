const Promise = require('bluebird');
const mongoClient = require('mongodb').MongoClient;
const url = process.env.MYNA_MONGO_URL;

module.exports = {
    openConnection: function(){return mongoClient.connect(url, { promiseLibrary: Promise })},
    closedConnection: function(){return mongoClient.connect(url, { promiseLibrary: Promise }).disposer(conn => conn.close())}
}