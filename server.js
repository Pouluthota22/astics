/**
 * Module Dependencies
 */
require('dotenv').config({
    path: '.env'
});
//require('custom-env').env();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var route = require('./routes/index');
var cors = require('cors');
var config = require('./config/config');
var models = require('./models');
const { result } = require('lodash');

app.use(logger('dev'));
app.use(
    bodyParser.json({
        limit: '50mb',
    }),
);
app.use(
    bodyParser.urlencoded({
        limit: '50mb',
        extended: false,
        parameterLimit: 50000,
    }),
);

app.use(cors({
    origin: true,
    credentials: true
}));

app.use('/api', route);

//Sync Database
models.sequelize
    .sync()
    .then(async function () {
        console.info('Nice! Database looks fine');
    })
    .catch(function (err) {
        console.error(err, 'Something went wrong with the Database Update!');
        process.exit(1)
    });

const port = process.env.PORT || 4000;

//Error handling

app.use((err, req, res, next) => {
    const errorCode = err.errorCode || 5000;
    const statusCode = err.statusCode || 500;
    const status = err.status || err.message;
    const exception = err.error || err.message;
    const message = err.message;
    let error = {
        status: status,
        message: message,
        errorCode: errorCode,
        error: exception,
        logId: err.logId ? err.logId : req.logId,
    };
    return res.status(statusCode).json(error);
});

process.on('uncaughtException',(err,result)=>{
    console.log('uncaught exception',err);
});
process.on('unhandledRejection',(err,result)=>{
    console.log('unhandled rejection',err)
})
app.use(function (req, res, next) {
    res.status(404).json({
        status: '404 Not Found',
        message: 'The requested resource did not exist.',
        error: 'The requested resource did not exist.',
        errorCode: 4005,
    });
});

app.listen(port, function (err, result) {
    if (err) {
        console.error('SomeThing Went Wrong');
    } else {
        console.info(`Server Listening at port ${port}`);
    }
});