const express = require('express');
const router = express.Router();

const authorController = require('../controller/author');
const adminAuth = require('../middleware/adminAuth');

router.post('/add',adminAuth,authorController.addAuthor);
router.put('/:authorId',adminAuth,authorController.editAuthor);
router.get('/all',authorController.getAllAuthors)
router.get('/:authorId',authorController.getSingleAuthor)
router.get('/:authorId/opinions',authorController.getAuthorOpinions)

module.exports = router;