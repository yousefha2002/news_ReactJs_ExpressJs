const express = require('express');
const router = express.Router();

const socialController = require('../controller/socialmedia');

const adminAuth = require('../middleware/adminAuth');


router.post('/create' , adminAuth ,socialController.createSocialMedia);
router.get('/all' ,socialController.getSocialMedia);
router.delete('/:socialId' ,adminAuth ,socialController.deleteSocial);


module.exports = router;