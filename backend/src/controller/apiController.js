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
            DT: data.DT, //data
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
    try {
        let data = await CRUD_UserService.loginUser(req.body);
        if (data && data.DT.access_token) {
            // set cookie
            res.cookie('jwt', data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        }
        // set cookie
        res.cookie('jwt', data.DT.access_token, { httpOnly: true });

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT, //data
        });
    } catch (e) {
        console.log('>>check Error: ', e);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: '',
        });
    }
};

module.exports = {
    testAPI,
    handleRegister,
    handleLogin,
};
