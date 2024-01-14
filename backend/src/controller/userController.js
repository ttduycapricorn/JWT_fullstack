import userAPIService from '../service/userAPIService';

const Read = async (req, res) => {
    try {
        let data = await userAPIService.getAllUser();
        if (data) {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT, //data
            });
        }
    } catch (e) {
        console.log('>>check error: ', e);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: '', //data
        });
    }
};
const Create = (req, res) => {
    try {
    } catch (e) {
        console.log('>>check Create func: ', e);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: '', //data
        });
    }
};
const Update = (req, res) => {
    try {
    } catch (e) {
        console.log('>>check Update func: ', e);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: '', //data
        });
    }
};

const Delete = (req, res) => {
    try {
    } catch (e) {
        console.log('>>check Delete func: ', e);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: '', //data
        });
    }
};

module.exports = {
    Read,
    Create,
    Update,
    Delete,
};
