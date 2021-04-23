const { request } = require('express');
const { databaseName, generalTableName } = require('../../../database');
const DB = require('../../../database');

exports.deleteAllDevices = (onSuccess, onError) => {

    DB.connectDb((error, connection) => {
        if (error){
            onError(error.message);
        }
        else{
            DB.r.db(databaseName).table(generalTableName).delete().run(connection, (error, result) => {
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
            DB.r.db(databaseName).table(generalTableName).get(id).delete().run(connection, (error, result) => {
                if (error) {
                    onError(error.message, 500);
                }
                else if (result.deleted > 0) {
                    onSuccess();
                }
                else {
                    onError('Device not found', 404);
                }
                
            });
        }
    });
}