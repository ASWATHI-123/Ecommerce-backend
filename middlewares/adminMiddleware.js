const authenticate = require('./authMiddleware');

const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden. Admins only.' });
    }
    next();
};

module.exports = { authenticate, authorizeAdmin };
