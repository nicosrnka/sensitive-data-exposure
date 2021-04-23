const { databaseName, generalTableName } = require('../../../database');
const DB = require('../../../database');

exports.getAllDevices = (onSuccess, onError) => {
    DB.connectDb((error, connection) => {
        if (error) {
            onError(error.message)
        }
        else{
            DB.getAllGeneralDevices(connection, (error, cursor) => {
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
            DB.r.db(databaseName).table(generalTableName).get(id).run(connection, (error, result) => {
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