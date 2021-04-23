const { databaseName, tempTableName } = require('../../../database');
const DB = require('../../../database');

exports.createNewDevice = (device, onSuccess, onError) => {
        DB.connectDb((error, connection) => {
            if (error){
                onError(error.message);
            }
            else{
                DB.r.db(databaseName).table(tempTableName).insert(device).run(connection, (error) => {
                    if (error){
                        onError(error.message);
                    }
                    else{
                        onSuccess(device);
                    }
                });
            } 
        });
};