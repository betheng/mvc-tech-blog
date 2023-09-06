// Middleware to ensure the user is authenticated
const withAuth = (req, res, next) => {
    // Redirect to login if user is not authenticated
    if (!req.session.user_id) {
        res.redirect('/login');
        return;
    } 
    
    // Continue to next middleware if user is authenticated
    next();
};

// Export the middleware
module.exports = withAuth;
