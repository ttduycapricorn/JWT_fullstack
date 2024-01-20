import db from '../models/index';
import { checkEmail, hashPassword, checkPhone, ValidateEmail } from '../service/CRUD_UserService';

const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ['id', 'username', 'email', 'phone', 'sex'],
            include: { model: db.Group, attributes: ['name', 'description'] },
            order: [['id', 'DESC']],
        });
        if (users) {
            return {
                EM: 'get success data users',
                EC: 0,
                DT: users,
            };
        } else {
            return {
                EM: '',
                EC: 0,
                DT: [],
            };
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'Something wrong with service!',
            EC: -1,
            DT: [],
        };
    }
};

const getUserWithPagination = async (page, limit) => {
    try {
        // công thức
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ['id', 'username', 'email', 'phone', 'sex', 'address', 'groupId'],
            include: { model: db.Group, attributes: ['name', 'description', 'id'] },
            order: [['id', 'DESC']],
        });

        let data = {
            totalRows: count,
            // công thức
            totalPages: Math.ceil(count / limit),
            users: rows,
        };

        // console.log('>>check data: ', data);
        return {
            EM: 'Have data users!',
            EC: 0,
            DT: data,
        };
    } catch (e) {
        console.log('>>check error: ', e);
        return {
            EM: 'Something wrong with services!',
            EC: 1,
            DT: [],
        };
    }
};

const createNewUser = async (data) => {
    try {
        // check email/phoneNumber đã tồn tại chưa?
        let ExitEmail = await checkEmail(data.email);

        if (ExitEmail === true) {
            return {
                EM: 'The email is already exits!',
                EC: '1',
                DT: 'email',
            };
        }

        if (ValidateEmail(data.email) === false) {
            return {
                EM: 'Email invalidate!',
                EC: '1',
                DT: 'email',
            };
        }

        let ExitPhone = await checkPhone(data.phone);

        if (ExitPhone === true) {
            return {
                EM: 'The phone number is already exits!',
                EC: '1',
                DT: 'phone', //data
            };
        }

        // hash password
        let passwordHashed = hashPassword(data.password);

        await db.User.create({
            ...data,
            email: data.email,
            phone: data.phone,
            password: passwordHashed,
        });

        return {
            EM: 'Create new user success!',
            EC: 0,
            DT: [],
        };
    } catch (e) {
        console.log(e);
        return {
            EM: 'Something wrong with services!',
            EC: 1,
            DT: [],
        };
    }
};

const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: 'Update error without groupID!',
                EC: 2,
                DT: 'group',
            };
        }
        let user = await db.User.findOne({
            where: {
                id: data.id,
            },
        });
        if (user) {
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId,
            });
            return {
                EM: 'Update user success!',
                EC: 0,
                DT: [],
            };
        } else {
            return {
                EM: 'User not found!',
                EC: -1,
                DT: [],
            };
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'Something wrong with services!',
            EC: 1,
            DT: [],
        };
    }
};

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: {
                id: id,
            },
        });

        if (user) {
            await user.destroy();
            return {
                EM: 'Delete user success!',
                EC: 0,
                DT: [],
            };
        } else {
            return {
                EM: 'User not exit!',
                EC: 2,
                DT: [],
            };
        }
    } catch (e) {
        console.log('>>>Check error: ', e);
        return {
            EM: 'Error from service!',
            EC: 1,
            DT: [],
        };
    }
};

module.exports = {
    getAllUser,
    getUserWithPagination,
    createNewUser,
    updateUser,
    deleteUser,
};
