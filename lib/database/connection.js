const Promise = require('bluebird');
const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://srujanjack:blueline1@ds157380.mlab.com:57380/opennote';

module.exports = {
    openConnection: function(){return mongoClient.connect(url, { promiseLibrary: Promise })},
    closedConnection: function(){return mongoClient.connect(url, { promiseLibrary: Promise }).disposer(conn => conn.close())}
}