require('dotenv').config();
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';

import db from '../models/index';
import { getGroupWithRoles } from '../service/JWTService';
import { CreateJWT } from '../middleware/JWTActions';

// thuật toán hash password
var salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);
};

const checkEmail = async (userEmail) => {
    let isExit = await db.User.findOne({
        where: {
            email: userEmail,
        },
    });

    if (isExit) {
        return true;
    } else return false;
};

// check Email from server
const ValidateEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const checkPhone = async (userPhone) => {
    let isExit = await db.User.findOne({
        where: {
            phone: userPhone,
        },
    });

    if (isExit) {
        return true;
    } else return false;
};

const registerNewUser = async (rawUserData) => {
    try {
        // check email/phoneNumber đã tồn tại chưa?
        let ExitEmail = await checkEmail(rawUserData.email);

        if (ExitEmail === true) {
            return {
                EM: 'The email is already exits!',
                EC: '1',
            };
        }

        let ExitPhone = await checkPhone(rawUserData.phone);

        if (ExitPhone === true) {
            return {
                EM: 'The phone number is already exits!',
                EC: '1',
                DT: '', //data
            };
        }

        // hash password
        let passwordHashed = hashPassword(rawUserData.password);

        // create a new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: passwordHashed,
            phone: rawUserData.phone,
            // mặc định chúng ta sẽ gám group cho người mới là only view
            groupId: 5,
        });

        return {
            EM: 'A new user created successfully!',
            EC: '0',
            DT: '', //data
        };
    } catch (e) {
        console.log('>>>Check Error create a new user: ', e);
        return {
            EM: 'Something wrong in service...!',
            EC: '-2',
        };
    }
};

const checkPasswordHash = (password, hashPassword) => {
    // Load hash from your password DB.
    return bcrypt.compareSync(password, hashPassword); //return true or false
};

const loginUser = async (rawUserData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [{ email: rawUserData.email }, { phone: rawUserData.email }],
            },
        });

        if (user) {
            let checkPassword = checkPasswordHash(rawUserData.password, user.password);

            if (checkPassword === true) {
                // let token

                // test roles
                let GroupWithRoles = await getGroupWithRoles(user);
                let payLoad = {
                    email: user.email,
                    GroupWithRoles,
                    username: user.username,
                    expiresIn: process.env.JWT_EXPIRES, //60 ms
                };

                let token = CreateJWT(payLoad);
                return {
                    EM: 'OK!',
                    EC: '0',
                    DT: {
                        access_token: token,
                        GroupWithRoles,
                        email: user.email,
                        username: user.username,
                    },
                };
            } else {
                return {
                    EM: 'Your password is incorrect!',
                    EC: '-1',
                    DT: '',
                };
            }
        }
        console.log('>>>Not found email and phone number, check Error: ', rawUserData.email);
        return {
            EM: 'Your email or Your phone number is incorrect!',
            EC: '-1',
            DT: '',
        };
    } catch (e) {
        console.log('>>check Error loginUser: ', e);
    }
};

module.exports = {
    registerNewUser,
    loginUser,
    hashPassword,
    checkEmail,
    checkPhone,
    ValidateEmail,
};
