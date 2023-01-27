// External depedencies
const express = require('express');

// Internal depedencies
const decorateHtmlRes = require('../middleware/common/decorateHtmlRes');
const {checkLogin} = require('../middleware/common/checkLogin');

const router = express.Router();

// Get login page
router.get("/",decorateHtmlRes('Dashboard'), checkLogin, (req, res)=>{
    res.render('dashboard');
});

module.exports = router;