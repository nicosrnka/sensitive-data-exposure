const GeneralDeviceGetService = require('../services/general-devices/get');
const GeneralDeviceCreateService = require('../services/general-devices/create');
const GeneralDeviceUpdateService = require('../services/general-devices/update');
const GeneralDeviceDeleteService = require('../services/general-devices/delete');

exports.generalDevices_get_all = (request, response, next) => {
    GeneralDeviceGetService.getAllDevices(onSuccess, onError);

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

exports.generalDevices_get_id = (request, response, next) => {
    const id = request.params.deviceId;
    GeneralDeviceGetService.getDeviceById(id, onSuccess, onError)

    function onSuccess(result) {
        response.status(200).json(result);
    }

    function onError(errorMessage, status) {
        response.status(status).json({
            message: errorMessage
        });
    }
};

exports.generalDevices_post = (request, response, next) => {
    GeneralDeviceCreateService.createNewDevice(request.body, onSuccess, onError);

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

exports.generalDevices_delete_all = (request, response, next) => {
    GeneralDeviceDeleteService.deleteAllDevices(onSuccess, onError);

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

exports.generalDevices_patch_id = (request, response, next) => {
    const id = request.params.deviceId;
    GeneralDeviceUpdateService.updateDeviceById(id, request.body, onSuccess, onError);
    function onSuccess() {
        response.status(200).json({
            message: 'Updated device',
            request: {
                type: 'GET',
                url: 'http://localhost:' + process.env.PORT + '/general-devices/' + id
            }
        });
    }
    function onError(errorMessage) {
        response.status(500).json({
            message: errorMessage
        });
    }
};

exports.generalDevices_delete_id = (request, response, next) => {
    const id = request.params.deviceId;
    GeneralDeviceDeleteService.deleteDeviceByI(id, onSuccess, onError);

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