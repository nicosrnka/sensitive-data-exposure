const express = require('express');
const router = express.Router();

const checkAuthentication = require('../middleware/check-authentication');
const TempDeviceController = require('../controllers/temp-devices');


router.get('/', checkAuthentication, TempDeviceController.tempDevices_get_all);

router.post('/', checkAuthentication, TempDeviceController.tempDevices_post);

router.delete('/', checkAuthentication, TempDeviceController.tempDevices_delete_all);

router.get('/:deviceId', checkAuthentication, TempDeviceController.tempDevices_get_id);

router.patch('/:deviceId', checkAuthentication, TempDeviceController.tempDevices_patch_id);

router.delete('/:deviceId', checkAuthentication, TempDeviceController.tempDevices_delete_id);

module.exports = router;