const TempDeviceGetService = require('../services/temp-devices/get');
const TempDeviceCreateService = require('../services/temp-devices/create');
const TempDeviceUpdateService = require('../services/temp-devices/update');
const TempDeviceDeleteService = require('../services/temp-devices/delete');

exports.tempDevices_get_all = (request, response, next) => {
    TempDeviceGetService.getAllDevices(onSuccess, onError);

    function onSuccess(result) {
        const resp = {
            count: result.length,
            devices: result
        };
        response.status(200).json(resp);
    }

    function onError(errorMessage) {
        response.status(500).json({
            message: errorMessage
        });
    }
}

exports.tempDevices_get_id = (request, response, next) => {
    const id = request.params.deviceId;
    debugger;
    TempDeviceGetService.getDeviceById(id, onSuccess, onError)

    function onSuccess(result) {
        response.status(200).json(result);
    }

    function onError(errorMessage, status) {
        response.status(status).json({
            message: errorMessage
        });
    }
};

exports.tempDevices_post = (request, response, next) => {
    TempDeviceCreateService.createNewDevice(request.body, onSuccess, onError);
    function onSuccess(result) {
        response.status(201).json({
            message: 'Created new device',
            createdDevice: result
        });
    }

    function onError(errorMessage) {
        response.status(500).json({
            message: errorMessage
        });
    }
};

exports.tempDevices_delete_all = (request, response, next) => {
    TempDeviceDeleteService.deleteAllDevices(onSuccess, onError);

    function onSuccess(result) {
        const resp = {
            count: result.deleted,
            message: 'Deleted ' + result.deleted + ' devices'
        };
        response.status(200).json(resp);
    }

    function onError(errorMessage) {
        response.status(500).json({
            message: errorMessage
        });
    }
};

exports.tempDevices_patch_id = (request, response, next) => {
    const id = request.params.deviceId;
    TempDeviceUpdateService.updateDeviceById(id, request.body, onSuccess, onError);
    function onSuccess() {
        response.status(200).json({
            message: 'Updated device',
            request: {
                type: 'GET',
                url: 'http://localhost:' + process.env.PORT + '/temp-devices/' + id
            }
        });
    }
    function onError(errorMessage) {
        response.status(500).json({
            message: errorMessage
        });
    }
};

exports.tempDevices_delete_id = (request, response, next) => {
    const id = request.params.deviceId;
    TempDeviceDeleteService.deleteDeviceById(id, onSuccess, onError);

    function onSuccess() {
        response.status(200).json({
            message: 'Deleted device',
            deletedDeviceId: id
        });
    };

    function onError(errorMessage, status) {
        response.status(status).json({
            message: errorMessage
        });
    };
};