const express = require('express');
const router = express.Router();

const opinionController = require('../controller/opinion');
const adminAuth = require('../middleware/adminAuth');

router.post('/add',adminAuth,opinionController.createOpinion);
router.put('/:opinionId',adminAuth,opinionController.editOpinion);
router.delete('/:opinionId',adminAuth,opinionController.deleteOpinion);

router.get('/all',opinionController.getAllOpinions)
router.get('/last',opinionController.getLastOpinions)
router.get('/:opinionId',opinionController.getSingleOpinion)
router.get('/all/categories',opinionController.getCateogiresWithOpinion)
router.get('/all/category/:categoryId',opinionController.getOpinionByCategory)

module.exports = router;