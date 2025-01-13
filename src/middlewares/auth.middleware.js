const config = require('../config/config')

const authenticate = (role = 'customer') => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            return res.sendStatus(401);
        }

        try {
            var decoded = jwt.verify(token, config.jwtSecret);
        } catch(err) {
        // err
        }
    }
}

module.exports = authenticate;