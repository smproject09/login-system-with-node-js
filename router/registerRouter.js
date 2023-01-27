// External depedencies
const express = require('express');

// Internal depedencies
const {getRegister, addUser} = require('./controller/registerController');
const decorateHtmlRes = require('../middleware/common/decorateHtmlRes');
const {addUserValidator, addUserValidatorHandler} = require('../middleware/user/userValidator');
const {redirectLoggedIn} = require('../middleware/common/checkLogin');

const router = express.Router();

// Get login page
router.get("/",decorateHtmlRes('Register'), redirectLoggedIn, getRegister);

// Add user
router.post('/', addUserValidator, addUserValidatorHandler, addUser);

module.exports = router;