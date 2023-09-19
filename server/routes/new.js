const express = require('express');
const router = express.Router();

const newController = require('../controller/news');

const adminAuth = require('../middleware/adminAuth');

router.post('/create' , adminAuth , newController.createNew);
router.put('/update/:newId' , adminAuth , newController.updateNew);
router.delete('/:newId' , adminAuth , newController.deleteNew);

router.get('/all' , newController.getNewsWithPaginaition);
router.get('/random' , newController.getRandomNews);
router.get('/last' , newController.lastNews);
router.get('/category/:categoryId' , newController.getNewsByCategoryWithPaginaition);
router.get('/mostViews' , newController.getMostViewsNews);
router.get('/admin/:newId' , adminAuth ,newController.getSingleNewForAdmin);
router.get('/:newId' , newController.getSingleNewForUser);


module.exports = router;