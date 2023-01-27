// External depedencies
const express = require('express');

// Internal depedencies
const {getLoging, login, logout} = require('./controller/logingController');
const decorateHtmlRes = require('../middleware/common/decorateHtmlRes');
const {loginValidator, loginValidatorHandler} = require('../middleware/login/loginValidator');
const {redirectLoggedIn} = require('../middleware/common/checkLogin');

const router = express.Router();

const pageTitle = 'Login';

// Get login page
router.get("/", decorateHtmlRes(pageTitle), redirectLoggedIn, getLoging);

// User login
router.post("/", 
    decorateHtmlRes(pageTitle), 
    loginValidator, 
    loginValidatorHandler, 
    login
);

// Logout
router.delete('/', logout);

module.exports = router;