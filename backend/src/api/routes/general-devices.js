const express = require('express');
const router = express.Router();

const checkAuthentication = require('../middleware/check-authentication');
const GeneralDeviceController = require('../controllers/general-devices');


router.get('/', checkAuthentication, GeneralDeviceController.generalDevices_get_all);

router.post('/', checkAuthentication, GeneralDeviceController.generalDevices_post);

router.delete('/', checkAuthentication, GeneralDeviceController.generalDevices_delete_all);

router.get('/:deviceId', checkAuthentication, GeneralDeviceController.generalDevices_get_id);

router.patch('/:deviceId', checkAuthentication, GeneralDeviceController.generalDevices_patch_id);

router.delete('/:deviceId', checkAuthentication, GeneralDeviceController.generalDevices_delete_id);

module.exports = router;