const express = require('express');
const userController = require('../controller/user.controller');

const router = express.Router();

router.post('/user-sign-up', userController.signUpUser);
router.get('/user-sign-in/:user_email/:user_password', userController.signInUser);

module.exports = router;