// External depedencies
const express = require('express');

// Internal depedencies
const {getRegister} = require('./controller/registerController');
const decorateHtmlRes = require('../middleware/common/decorateHtmlRes');

const router = express.Router();

// Get login page
router.get("/",decorateHtmlRes('Register'), getRegister);

module.exports = router;