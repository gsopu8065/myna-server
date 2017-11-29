var aws = require('aws-sdk'),
    multer = require('multer'),
    multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: process.env.MYNA_AWS_SECRETKEY,
    accessKeyId: process.env.MYNA_AWS_ACCESSKEY,
    region: process.env.MYNA_AWS_REGION 
});

var s3 = new aws.S3();
module.exports = s3;