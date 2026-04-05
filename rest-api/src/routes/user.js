const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/:id/profile', userController.getProfile);
router.put('/:id/profile', auth, userController.updateProfile);
router.post('/:id/follow', auth, userController.followUser);
router.get('/notifications', auth, userController.getNotifications);

module.exports = router;