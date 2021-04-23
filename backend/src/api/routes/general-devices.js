const express = require('express');
const router = express.Router();

const checkAuthentication = require('../middleware/check-authentication');
const GeneralDeviceController = require('../controllers/general-devices');


router.get('/', GeneralDeviceController.generalDevices_get_all);

router.post('/', GeneralDeviceController.generalDevices_post);

router.delete('/', checkAuthentication, GeneralDeviceController.generalDevices_delete_all);

router.get('/:deviceId', GeneralDeviceController.generalDevices_get_id);

router.patch('/:deviceId', GeneralDeviceController.generalDevices_patch_id);

router.delete('/:deviceId', checkAuthentication, GeneralDeviceController.generalDevices_delete_id);

module.exports = router;