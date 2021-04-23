const express = require('express');
const app = express();
const morgan = require('morgan'); //logger middleware
const bodyParser = require('body-parser');
const dataBase = require('./database');

const tempDevicesRoutes = require('./api/routes/temp-devices');
const generalDevicesRoutes = require('./api/routes/general-devices');
const userRoutes = require('./api/routes/user');
const { request, response } = require('express');

dataBase.initDataBase();

//middle wares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', '*');

    if (request.method === 'OPTIONS') {
        response.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return response.status(200).json({});
    }
    next();
});

// routes
app.use('/temp-devices', tempDevicesRoutes);
app.use('/general-devices', generalDevicesRoutes);
app.use('/user', userRoutes);

app.use((request, response, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, request, response, next) => {
    let responseStatus = error.status || 500;
    response.status(responseStatus).json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;