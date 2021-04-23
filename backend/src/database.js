const r = require('rethinkdb');

const databaseName = 'smartHomeDataBase';
const temperatureDevices = 'temperatureDevices';
const generalDevices = 'generalDevices';
const userTableName = 'users';

function connect(callback) {
    r.connect({ host: 'localhost', port: 28015 }, callback);
};

function createDatabase(connection, callback) {
    r.dbList()
        .contains(databaseName)
        .do(function (containsDb) {
            return r.branch(containsDb, { created: 0 }, r.dbCreate(databaseName));
        }).run(connection, function (error) {
            callback(error);
        });
};

function createTemperatureDevicesTable(connection, callback) {
    r.db(databaseName)
        .tableList()
        .contains(temperatureDevices)
        .do(function (containsTable) {
            return r.branch(
                containsTable,
                { created: 0 },
                r.db(databaseName).tableCreate(temperatureDevices)
            );
        })
        .run(connection, function (error) {
            callback(error);
        });
};

function createGeneralDevicesTable(connection, callback) {
    r.db(databaseName)
        .tableList()
        .contains(generalDevices)
        .do(function (containsTable) {
            return r.branch(
                containsTable,
                { created: 0 },
                r.db(databaseName).tableCreate(generalDevices)
            );
        })
        .run(connection, function (error) {
            callback(error);
        });
};

function createUserTable(connection, callback) {
    r.db(databaseName)
        .tableList()
        .contains(userTableName)
        .do(function (containsTable) {
            return r.branch(
                containsTable,
                { created: 0 },
                r.db(databaseName).tableCreate(userTableName)
            );
        })
        .run(connection, function (error) {
            callback(error);
        });
};

function initDataBase() {
    connect((error, connection) => {
        if (error){
            console.error(error.message);
        }
        else{
            createDatabase(connection, () => {
                createTemperatureDevicesTable(connection, () => {
                        createGeneralDevicesTable(connection, () => {
                            createUserTable(connection, () => {
                                createSecIndexOnUserName(connection, () => {
    
                            })
                        });
                    });
                });
            });
        }
    });
};

function getAllTempDevices(connection, callback) {
    r.db(databaseName).table(temperatureDevices).run(connection, callback);
};

function getAllGeneralDevices(connection, callback) {
    r.db(databaseName).table(generalDevices).run(connection, callback);
};

function createSecIndexOnUserName(connection, callback){
    r.db(databaseName).table(userTableName).indexCreate("user_Name").run(connection, callback);
}

module.exports.connectDb = connect;
module.exports.initDataBase = initDataBase;
module.exports.getAllGeneralDevices = getAllGeneralDevices;
module.exports.getAllTempDevices = getAllTempDevices;
module.exports.databaseName = databaseName;
module.exports.tempTableName = temperatureDevices;
module.exports.generalTableName = generalDevices;
module.exports.userTableName = userTableName;
module.exports.r = r;