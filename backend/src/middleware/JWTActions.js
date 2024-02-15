require('dotenv').config();

import jwt from 'jsonwebtoken';

const nonSecurePaths = ['/', '/login', '/register', '/logout', '/group/read'];

const CreateJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        //60 ms
        token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES });
    } catch (e) {
        console.log('>>>check Error: ', e);
    }
    return token;
};

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    } catch (e) {
        console.log('>>>check Error: ', e);
    }
    return decoded;
};

const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
};

const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) {
        return next();
    }

    let cookies = req.cookies;
    let tokenFormHeader = extractToken(req);
    if ((cookies && cookies.jwt) || tokenFormHeader) {
        let token = cookies && cookies.jwt ? cookies.jwt : tokenFormHeader;
        let decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
            req.token = token;
            next();
        } else {
            return res.status(401).json({
                EM: 'Not authenticated the user!',
                EC: -1,
                DT: '',
            });
        }
    } else {
        return res.status(401).json({
            EM: 'NOT AUTHENTICATED THE USER!',
            EC: -1,
            DT: '',
        });
    }
};

const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === '/account') return next();

    if (req.user) {
        let roles = req.user.GroupWithRoles.Roles;
        let currentURL = req.path;
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EM: '',
                EC: -1,
                EM: `you don't permission to access this resource...!`,
            });
        }

        let canAccess = roles.some((item) => item.url === currentURL || currentURL.includes(item.url));
        if (canAccess === true) {
            next();
        } else {
            return res.status(403).json({
                EM: '',
                EC: -1,
                EM: `you don't permission to access this resource...!`,
            });
        }
    }
};

const checkUserCanUpdate = (req, res, next) => {
    console.log('chung ta cua hien tai');
};

module.exports = {
    CreateJWT,
    verifyToken,
    checkUserJWT,
    checkUserPermission,
    checkUserCanUpdate,
};
