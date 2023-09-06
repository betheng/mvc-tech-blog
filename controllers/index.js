// Import required modules
const express = require('express');

// Initialize the router
const router = express.Router();

// Import and set up API routes for users, blogs, and comments
const userRoutes = require('./api/userRoutes.js');
const blogRoutes = require('./api/blogRoutes');
const commentRoutes = require('./api/commentRoutes');

router.use('/api/users', userRoutes);
router.use('/api/blogs', blogRoutes);
router.use('/api/comments', commentRoutes);

// Import and set up frontend routes
const frontEnd = require('./frontendRoutes');
router.use('/', frontEnd);

// Route for displaying session information (mainly for debugging)
router.get('/showsessions', (req, res) => {
  res.json(req.session);
});

// Export the router
module.exports = router;