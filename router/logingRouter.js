// External depedencies
const express = require('express');

// Internal depedencies
const {getLoging} = require('./controller/logingController');
const decorateHtmlRes = require('../middleware/common/decorateHtmlRes');

const router = express.Router();

// Get login page
router.get("/", decorateHtmlRes('Loging'), getLoging);

module.exports = router;