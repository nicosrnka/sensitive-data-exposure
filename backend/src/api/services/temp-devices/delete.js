const { request } = require('express');
const { databaseName, tempTableName } = require('../../../database');
const DB = require('../../../database');

exports.deleteAllDevices = (onSuccess, onError) => {
    DB.connectDb((error, connection) => {
        if (error){
            onError(error.message);
        }
        else{
            DB.r.db(databaseName).table(tempTableName).delete().run(connection, (error, result) => {
                if (error) {
                    onError(error.message);
                }
                else{
                    onSuccess(result);
                }
            });
        }
    });
};

exports.deleteDeviceById = (id, onSuccess, onError) => {
    DB.connectDb((error, connection) => {
        if (error){
            onError(error.message, 500);
        }
        else{
            DB.r.db(databaseName).table(tempTableName).get(id).delete().run(connection, (error, result) => {
                if (error) {
                    onError(error.message, 500);
                }
                else if (result.deleted > 0) {
                    onSuccess();
                }
                else {
                    onError('Entry not found', 404);
                }
                
            });
        }
    });
}