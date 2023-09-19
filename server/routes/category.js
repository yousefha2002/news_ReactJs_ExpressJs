const express = require('express');
const router = express.Router();

const categoryController = require('../controller/category');

const adminAuth = require('../middleware/adminAuth');

router.post('/create' , adminAuth , categoryController.createCategory);
router.put('/update/:categoryId' , adminAuth , categoryController.editCategory);

router.get('/all' , categoryController.getAllCategories);
router.get('/:categoryId' , categoryController.getSingleCategory);


module.exports = router;