const jwt = require('jsonwebtoken');

module.exports.verifyAccount = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(403); // Forbidden
    }
}
