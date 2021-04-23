const UserService = require('../services/user');

exports.user_create = (request, response, next) => {
    UserService.signUp(request.body, onSuccess, onError);

    function onSuccess() {
        response.status(201).json({
            message: 'New user created'
        })
    };

    function onError(errorMessage, status) {
        response.status(status).json({
            message: errorMessage
        })
    };

};

exports.user_login = (request, response, next) => {

    UserService.login(request.body, onSuccess, onError);

    function onSuccess(token, userId) {
        response.status(200).json({
            message: 'Authentication successful',
            token: token,
            id: userId
        })
    };

    function onError() {
        response.status(401).json({
            message: 'Authentication failed'
        });
    };
};

exports.user_delete = (request, response, next) => {
    const id = request.params.userId;
    UserService.delete(id, onSuccess, onError);

    function onSuccess() {
        response.status(200).json({
            message: 'Deleted user',
            deletedEntryId: id
        });
    };

    function onError(errorMessage, status) {
        response.status(status).json({
            message: errorMessage
        })
    };
};

exports.user_patch_id = (request, response, next) => {
    const id = request.params.userId;
    UserService.updateUserById(id, request.body, onSuccess, onError);
    function onSuccess() {
        response.status(200).json({
            message: 'Updated user'
        });
    }
    function onError(errorMessage) {
        response.status(500).json({
            message: errorMessage
        });
    }
};

exports.user_patch_password_id = (request, response, next) => {
    const id = request.params.userId;
    console.log('Body: ' + request.body.password);
    UserService.updateUserPasswordById(id, request.body, onSuccess, onError);
    function onSuccess() {
        response.status(200).json({
            message: 'Password updated'
        });
    }
    function onError(errorMessage) {
        response.status(500).json({
            message: errorMessage
        });
    }
};

exports.user_get_id = (request, response, next) => {
    const id = request.params.userId;
    UserService.getUserById(id, onSuccess, onError);

    function onSuccess(result) {
        response.status(200).json(result);
    }

    function onError(errorMessage, status) {
        response.status(status).json({
            message: errorMessage
        });
    }
};