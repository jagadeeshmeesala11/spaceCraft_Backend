const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('../cloudinary'); 
const multer = require('multer');
const path = require('path');

// File upload validation for profile image (only jpg, jpeg, png)
const upload = multer({
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpg|jpeg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only .jpg, .jpeg, or .png images are allowed'));
    }
  },
}).single('profileImage');

// User Registration
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'All fields are required' });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: { name: newUser.name, email: newUser.email } });
  } catch (err) {
    console.error('Registration error:', err.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// User Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'All fields are required' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login error:', err.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// User Profile
exports.userProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'User ID is missing in the request' });
    }

    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Profile error:', err.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'User ID is missing in the request' });
    }

    const { name, email } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({ message: 'User profile updated successfully', user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error('Profile update error:', err.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update Profile Image (using Cloudinary)
exports.updateProfileImage = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'user_profiles',
        public_id: `profile_${user._id}`,
      });

      user.profileImage = result.secure_url;
      await user.save();

      res.status(200).json({ message: 'Profile image updated successfully', profileImage: user.profileImage });
    } catch (error) {
      console.error('Profile image update error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
};
