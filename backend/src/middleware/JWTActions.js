require('dotenv').config();

import jwt from 'jsonwebtoken';

const nonSecurePaths = ['/', '/login', '/register'];

const CreateJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key);
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

const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();

    let cookies = req.cookies;
    if (cookies && cookies.jwt) {
        let token = cookies.jwt;
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
            EC: 0,
            DT: '',
        });
    }
};

const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === '/account') return next();

    if (req.user) {
        // let email = req.user.email;
        let roles = req.user.GroupWithRoles.Roles;
        let currentURL = req.path;
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EM: '',
                EC: -1,
                EM: `you don't permission to access this resource...!`,
            });
        }

        let canAccess = roles.some((item) => item.url === currentURL);
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
