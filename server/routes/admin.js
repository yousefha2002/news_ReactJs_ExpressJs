const express = require('express');
const router = express.Router();

const adminController = require('../controller/admin');

router.get('/info' , adminController.getAllStatistics);

module.exports = router;