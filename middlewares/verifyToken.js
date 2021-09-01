let config = require('../config/config');
const jwt = require('jsonwebtoken');
module.exports = async function verifyToken(req, res, next) {
    try {
        let err = {}
        if (!req.headers.authorization) {
            err.msg = "Authorization header not present"
            return res.status(400).json(err);
        }
        let type = req.headers.authorization.split(' ')[0];
        let token = req.headers.authorization.split(' ')[1];
        if(type.toLowerCase()!='bearer'){
            err.msg = 'Bearer not present in token';
            return res.status(400).json(err);
        }
        if (!token) {
            err.msg = 'Token not present in header';
            return res.status(400).json(err);
        }

        let tokenConfig = {
            issuer: config.issuer,
            audience: config.audience,
        };

        let payload = jwt.verify(token, config.privateKey, tokenConfig);
        next();
    } catch (exp) {
        console.log(exp);
        return res.status(400).send(exp);
    };

};