const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.autorization;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch(error) {
        return res.status(401).json({
            message: 'Only registered users can create a product'
        });
    }  
};