const { databaseName, userTableName } = require('../../database');
const DB = require('../../database');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signUp = (user, onSuccess, onError) => {
    DB.connectDb((error, connection) => {
        if (error) {
            onError(error.message, 500);
        }
        else {
            DB.r.db(databaseName).table(userTableName).filter(function (doc) {
                return doc('userName').match(user.userName)
            }).run(connection, (error, result) => {
                if (error) {
                    onError(error.message, 500);
                }
                else {
                    if (result._responses[0]) {
                        if (result._responses[0].r.length > 0) {
                            onError('User already exists', 409);
                        }
                    }
                    else {
                        var hash = Buffer.from(user.password).toString('base64');
                                const userModel = new User(user.userName, hash);
                                DB.connectDb((error, connection) => {
                                    if (error) {
                                        onError(error.message, 500);
                                    }
                                    else {
                                        DB.r.db(databaseName).table(userTableName).insert(userModel).run(connection, (error, resultInsert) => {
                                            if (error) {
                                                onError(error.message, 500);
                                            }
                                            else {
                                                onSuccess();
                                            }
                                        });
                                    }
                                });
                            }
                        }
            });
        }
    });
};

exports.login = (user, onSuccess, onError) => {
    DB.connectDb((error, connection) => {
        if (error) {
            onError(error.message)
        }
        else {
            DB.r.db(databaseName).table(userTableName).filter(function (doc) {
                return doc('userName').match(user.userName)
            }).run(connection, (error, result) => {
                if (error) {
                    onError(error.message)
                }
                else {
                    if (result._responses[0]) {
                        if (result._responses[0].r.length < 1) {
                            onError();
                        }
                        else {
                            const userModel = result._responses[0].r[0];
                            var hash = Buffer.from(user.password).toString('base64');
                            if (hash === userModel.password){
                                const token = jwt.sign({
                                    userName: user.userName,
                                    pw: hash,
                                    userId: user.id
                                },
                                    process.env.JWT_KEY,
                                    {
                                        expiresIn: "2h"
                                    });

                                onSuccess(token, userModel.id);
                            }
                            else{
                                onError();
                            }
                        }
                    }
                    else {
                        onError();
                    }
                }

            });
        }
    });
};

exports.delete = (id, onSuccess, onError) => {
    DB.connectDb((error, connection) => {
        if (error) {
            onError(error.message, 500)
        }
        else {
            DB.r.db(databaseName).table(userTableName).get(id).delete().run(connection, (error, result) => {
                if (error) {
                    onError(error.message, 500);
                }
                else if (result.deleted > 0) {
                    onSuccess();
                }
                else {
                    onError('User not found', 404);
                }
            });
        }
    });
};

exports.updateUserById = (id, updateOps, onSuccess, onError) => {
    const updOps = {};

    for (const ops of updateOps) {
        updOps[ops.propName] = ops.value;
    }

    DB.connectDb((error, connection) => {
        if (error) {
            onError(error.message);
        }
        else{
            DB.r.db(databaseName).table(userTableName).get(id).update(updOps).run(connection, (error, result) => {
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

exports.updateUserPasswordById = (id, body, onSuccess, onError) => {
    const newPassword = body.password;
    var hash = Buffer.from(newPassword).toString('base64');


            DB.connectDb((error, connection) => {
                if (error) {
                    onError(error.message, 500);
                }
                else {
                    DB.r.db(databaseName).table(userTableName).get(id).update({password: hash}).run(connection, (error, result) => {
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

exports.getUserById = (id, onSuccess, onError) => {
    DB.connectDb((error, connection) => {
        if (error) {
            onError(error.message, 500)
        }
        else{
            DB.r.db(databaseName).table(userTableName).get(id).run(connection, (error, result) => {
                if (error) {
                    onError(error.message, 500)
                }
                else if (result == null) {
                    onError('Entry not found', 404);
                }
                else {
                    onSuccess(result);
                }
            });
        }
    });
}