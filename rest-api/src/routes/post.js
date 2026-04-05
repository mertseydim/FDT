const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');

router.post('/create', auth, postController.createPost);
router.get('/feed', postController.getFeed);
router.post('/:id/like', auth, postController.likePost);
router.post('/:id/comment', auth, postController.commentPost);

module.exports = router;