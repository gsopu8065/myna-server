var firebase = require('firebase-admin');

var serviceAccount = require("./stepup-cert.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://stepup-acf74.firebaseio.com'
});

module.exports = firebase;