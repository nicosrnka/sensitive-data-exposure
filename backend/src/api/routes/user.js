const express = require('express');
const router = express.Router();

const checkAuthentication = require('../middleware/check-authentication');
const UserController = require('../controllers/user');

router.get('/:userId', checkAuthentication, UserController.user_get_id);

router.post('/signup', UserController.user_create);

router.post('/login', UserController.user_login);

router.delete('/:userId', checkAuthentication, UserController.user_delete);

router.patch('/:userId', checkAuthentication, UserController.user_patch_id);

router.patch('/password/:userId', checkAuthentication, UserController.user_patch_password_id);

module.exports = router;