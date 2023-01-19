// External depedencies
const express = require('express');

// Internal depedencies
const {getUser} = require('./controller/userController');
const decorateHtmlRes = require('../middleware/common/decorateHtmlRes');

const router = express.Router();

// Get login page
router.get("/",decorateHtmlRes('Users'), getUser);

module.exports = router;