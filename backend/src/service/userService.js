import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import bluebird from 'bluebird';

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

const CreateNewUser = (email, password, username) => {
    let userPassword = hashPassword(password);

    // simple query
    connection.query(
        'insert into users (email, password, username) values (?, ?, ?)',
        [email, userPassword, username],
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
        },
    );
};

const getListUser = async () => {
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
        const [rows, fields] = await connection.execute('select * from users');
        return rows;
    } catch (error) {
        console.log('Check error: ', error);
    }
};

module.exports = {
    CreateNewUser: CreateNewUser,
    getListUser: getListUser,
};
