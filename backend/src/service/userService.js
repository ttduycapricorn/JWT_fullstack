import bcrypt from 'bcryptjs';
// import mysql from 'mysql2/promise';
// import bluebird from 'bluebird';
import db from '../models';

// create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'jwt',
// });

// thuật toán hash password
var salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);
};

const CreateNewUser = async (email, password, username) => {
    let passwordUser = hashPassword(password);

    try {
        await db.User.create({
            username: username,
            email: email,
            password: passwordUser,
        });
    } catch (error) {
        console.log('>>> Check Error: ', error);
    }
};

const getListUser = async () => {
    // test relationship
    let newUser = await db.User.findOne({
        where: { id: 1 },
        include: { model: db.Group },
        raw: true,
        nest: true,
    });

    // console.log('>>Check new User: ', newUser);

    let role = await db.Group.findOne({
        where: { id: 1 },
        include: { model: db.Role },
        nest: true,
    });

    // console.log('>>check New role: ', role);

    let r = await db.Role.findAll({
        include: { model: db.Group, where: { id: 1 } },
        raw: true,
        nest: true,
    });

    let getUsers = [];
    getUsers = await db.User.findAll();
    return getUsers;
};

const DeleteUser = async (id) => {
    let user = await db.User.destroy({
        where: {
            id: id,
        },
    });

    return user;
};

const getUserById = async (id) => {
    let user = {};

    user = await db.User.findOne({
        where: {
            id: id,
        },
    });
    user = user.get({ plain: true });
    return user;
};

const updateUserInfo = async (userEmail, userName, id) => {
    await db.User.update({
        email: userEmail,
        username: userName,

        where: {
            id: id,
        },
    });
};

module.exports = {
    CreateNewUser,
    getListUser,
    DeleteUser,
    getUserById,
    updateUserInfo,
    hashPassword,
};
