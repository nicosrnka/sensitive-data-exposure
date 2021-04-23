const { databaseName, tempTableName } = require('../../../database');
const DB = require('../../../database');

exports.getAllDevices = (onSuccess, onError) => {
    DB.connectDb((error, connection) => {
        if (error) {
            onError(error.message)
        }
        else{
            DB.getAllTempDevices(connection, (error, cursor) => {
                if (error) {
                    onError(error.message)
                }
                else{
                    cursor.toArray((error, result) => {
                        if (error) {
                            onError(error.message);
                        }
                        else {
                            onSuccess(result);
                        }
                    });
                }
            });
        }
        
    });
};

exports.getDeviceById = (id, onSuccess, onError) => {
    DB.connectDb((error, connection) => {
        if (error) {
            onError(error.message, 500)
        }
        else{
            DB.r.db(databaseName).table(tempTableName).get(id).run(connection, (error, result) => {
                if (error) {
                    onError(error.message, 500)
                }
                else if (result == null) {
                    onError('Device not found', 404);
                }
                else {
                    onSuccess(result);
                }
            });
        }
    });
}