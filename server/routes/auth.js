const express = require('express');
const router = express.Router();

const authController = require('../controller/auth');

router.post('/admin/signup' , authController.registerAdmin);
router.post('/admin/login' , authController.loginAdmin);

module.exports = router;