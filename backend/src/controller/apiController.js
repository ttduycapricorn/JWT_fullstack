import CRUD_UserService from '../service/CRUD_UserService';

const testAPI = (req, res) => {
    return res.status(200).json({
        message: 'OK',
        data: 'test-api',
    });
};

const handleRegister = async (req, res) => {
    try {
        // req.body: email, username, phone, password
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing required parameter',
                EC: '1',
                DT: '', //data
            });
        }
        // service: create user
        let data = await CRUD_UserService.registerNewUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: '', //data
        });
    } catch (e) {
        console.log('>>check error: ', e);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: '', //data
        });
    }
};

const handleLogin = async (req, res) => {
    console.log('check req.body: ', req.body);
    return res.status(200).json({
        message: 'test api success!',
        data: 'test api login',
    });
};

module.exports = {
    testAPI,
    handleRegister,
    handleLogin,
};
