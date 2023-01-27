// External depedencies
const express = require('express');

// Internal depedencies
const {getUser, removeUser, updateUser} = require('./controller/userController');
const decorateHtmlRes = require('../middleware/common/decorateHtmlRes');
const {checkLogin, requireRole} = require('../middleware/common/checkLogin');

const router = express.Router();

// Get user page
router.get("/", decorateHtmlRes('Users'), checkLogin, requireRole(['Admin']), getUser);

// Delete user
router.delete("/:id", checkLogin, requireRole(['Admin']), removeUser);

// update user role
router.put("/", checkLogin,requireRole(['Admin']), updateUser);

module.exports = router;