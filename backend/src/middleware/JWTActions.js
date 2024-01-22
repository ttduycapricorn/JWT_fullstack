require('dotenv').config();

import jwt from 'jsonwebtoken';

const CreateJWT = () => {
    let payload = { Name: 'Trần Thái Duy', address: 'Can Thơ' };
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key);
        console.log('>>>check token: ', token);
    } catch (e) {
        console.log('>>>check Error: ', e);
    }
    return token;
};

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;
    try {
        let decoded = jwt.verify(token, key);
        data = decoded;
    } catch (e) {
        console.log('>>>check Error: ', e);
    }
    return data;
};

module.exports = {
    CreateJWT,
    verifyToken,
};
