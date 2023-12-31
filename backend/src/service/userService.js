import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import bluebird from 'bluebird';

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
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    let userPassword = hashPassword(password);

    const [rows, fields] = await connection.execute('insert into user (email, password, username) values (?, ?, ?)', [
        email,
        userPassword,
        username,
    ]);
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
