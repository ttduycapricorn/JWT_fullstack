import userAPIService from '../service/userAPIService';

// phân trang cho trang User
const Read = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            // console.log('>>check data: ', 'page: ', page, 'limit: ', limit);
            let data = await userAPIService.getUserWithPagination(+page, +limit);

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT, //data
            });
        } else {
            let data = await userAPIService.getAllUser();
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

const Delete = async (req, res) => {
    try {
        console.log('>>>check req.body: ', req.body);
        let user = await userAPIService.deleteUser(req.body.id);
        return res.status(200).json({
            EM: user.EM,
            EC: user.EC,
            DT: user.DT, //data
        });
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
