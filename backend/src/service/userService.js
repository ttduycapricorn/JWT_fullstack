import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import bluebird from 'bluebird';
import db from '../models';

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
});

// thuật toán hash password
var salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);
};

const CreateNewUser = async (email, password, username) => {
    let userPassword = hashPassword(password);

    try {
        await db.User.create({
            username: username,
            email: email,
            password: userPassword,
        });
    } catch (error) {
        console.log('>>> Check Error: ', error);
    }
};

const getListUser = async () => {
    // CODE CŨ
    // let users = [];
    //  connection.query('select * from users', function (err, results, fields) {
    //     if (err) {
    //         console.log(err);
    //         return users;
    //     }
    //     users = results;
    //     console.log('run get user!', users);
    //     return users;
    // });

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    try {
        const [rows, fields] = await connection.execute('select * from user');
        return rows;
    } catch (error) {
        console.log('Check error: ', error);
    }
};

const DeleteUser = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    try {
        const [row, fields] = await connection.execute('delete from users where id=?', [id]);
    } catch (error) {
        console.log('Check error Delete user: ', error);
    }
};

const getUserById = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    try {
        const [rows, fields] = await connection.execute('select * from users where id=?', [id]);
        return rows;
    } catch (error) {
        console.log('Check error Delete user: ', error);
    }
};

const updateUserInfo = async (userEmail, userName, id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    try {
        const [rows, fields] = await connection.execute('update user set email=?, username=? where id=?', [
            userEmail,
            userName,
            id,
        ]);
        return rows;
    } catch (error) {
        console.log('Check error Delete user: ', error);
    }
};

module.exports = {
    CreateNewUser: CreateNewUser,
    getListUser: getListUser,
    DeleteUser: DeleteUser,
    getUserById: getUserById,
    updateUserInfo: updateUserInfo,
};
