var aws = require('aws-sdk'),
    multer = require('multer'),
    multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: 'XX',
    accessKeyId: 'XX',
    region: 'us-east-2'
});

var s3 = new aws.S3();
module.exports = s3;