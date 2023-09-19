const express = require('express');
const router = express.Router();

const videoController = require('../controller/video');

const adminAuth = require('../middleware/adminAuth');

router.post('/create' , adminAuth , videoController.createVideo);
router.delete('/:videoId' , adminAuth , videoController.deleteVideo);


router.get('/all'  , videoController.getAllVideos);
router.get('/random'  , videoController.getRandomVideos);
router.get('/:videoId'  , videoController.getSingleVideo);


module.exports = router;