const express = require('express');
const router = express.Router();
const { registerUser, loginUser,userProfile,updateUserProfile } = require('../controllers/UserController');
const protect = require('../Middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile',protect, userProfile);
router.put('/profile',protect, updateUserProfile);
router.put('/profile/image', protect, updateProfileImage);

module.exports = router;
