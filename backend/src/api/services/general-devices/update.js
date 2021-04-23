const { databaseName, generalTableName } = require('../../../database');
const DB = require('../../../database');

exports.updateDeviceById = (id, updateOps, onSuccess, onError) => {
    const updOps = {};

    for (const ops of updateOps) {
        updOps[ops.propName] = ops.value;
    }

    DB.connectDb((error, connection) => {
        if (error) {
            onError(error.message);
        }
        else{
            DB.r.db(databaseName).table(generalTableName).get(id).update(updOps).run(connection, (error, result) => {
                if (error) {
                    onError(error.message);
                }
                else{
                    onSuccess();
                }
                
            });
        }
    });
};