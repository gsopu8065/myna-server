'use strict'

module.exports.errorLogger = function errorLogger(logwriter, winston) {
    var level = 'error';

    return function (err, req, res, next) {
        try {

            var exceptionMeta = winston.exception.getAllInfo(err);
            exceptionMeta.req = {
                date: (new Date()).toISOString(),
                body: bodyToString(req.body),
                method: req.method,
                url: req.originalUrl || req.url,
                originalUrl: req.originalUrl,
                headers: req.headers,
                query: req.query,
                params: req.params,
                hostname: req.hostname,
                ip: req.ip
            };
            exceptionMeta.date = (new Date()).toISOString();

            logwriter.log(level, exceptionMeta);

        } catch (erm) {
            logwriter.error(JSON.stringify({
                "LoggerError": {
                    "error": erm,
                    "level": "error",
                    "message": "logger.errorLogger"
                }
            }));
        } finally {
            next(err);
        }
    };
};

module.exports.logger = function logger(logwriter) {
    var statusLevels = "info";

    return function (req, res, next) {
        try {
            var end = res.end;
            req._startTime = (new Date());
            res.end = function (responseBody, encoding) {

                res.end = end;
                res.end(responseBody, encoding);

                if (res.statusCode >= 100) {
                    statusLevels = "info";
                }
                if (res.statusCode >= 400) {
                    statusLevels = "warn";
                }
                if (res.statusCode >= 500) {
                    statusLevels = "error";
                }
                var isResponseJson = (res._headers && res._headers['content-type'] && res._headers['content-type'].indexOf('json') >= 0);

                var logData = {
                    date: (new Date()).toISOString(),

                    res: {
                        body: bodyToString(responseBody),
                        responseTime: (new Date()) - req._startTime,
                        statusCode: res.statusCode,
                        headers: res.headers
                    },


                    req: {
                        body: bodyToString(req.body),
                        method: req.method,
                        url: req.originalUrl || req.url,
                        originalUrl: req.originalUrl,
                        headers: req.headers,
                        query: req.query,
                        params: req.params,
                        hostname: req.hostname,
                        ip: req.ip
                    }
                };

                if (!req.url.includes('/healthcheck')){
                    logwriter.info(logData);
                }
            };
        } catch (err) {
            logwriter.error(JSON.stringify({
                "LoggerError": {
                    "error": err,
                    "level": "error",
                    "message": "logger.logger"
                }
            }));
        } finally {
            next();
        }
    };
};

function safeJSONParse(string) {
    try {
        return JSON.parse(string);
    } catch (e) {
        return string;
    }
}

function bodyToString(body) {
    var stringBody = body && body instanceof Buffer ? body.toString() : body;
    return safeJSONParse(stringBody);
}

