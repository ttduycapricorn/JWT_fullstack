import rolesAPIService from '../service/rolesAPIService';

// phân trang cho trang User
const Read = async (req, res) => {
    try {
        // if (req.query.page && req.query.limit) {
        //     let page = req.query.page;
        //     let limit = req.query.limit;
        //     // console.log('>>check data: ', 'page: ', page, 'limit: ', limit);
        //     let data = await rolesAPIService.getUserWithPagination(+page, +limit);

        //     return res.status(200).json({
        //         EM: data.EM,
        //         EC: data.EC,
        //         DT: data.DT, //data
        //     });
        // } else {
        //     let data = await rolesAPIService.getAllUser();
        //     return res.status(200).json({
        //         EM: data.EM,
        //         EC: data.EC,
        //         DT: data.DT, //data
        //     });
        // }

        let data = await rolesAPIService.getAllRoles();

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT, //data
        });
    } catch (e) {
        console.log('>>check error: ', e);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '', //data
        });
    }
};

const Create = async (req, res) => {
    try {
        let data = await rolesAPIService.createNewRoles(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT, //data
        });
    } catch (e) {
        console.log('>>check Create func: ', e);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '', //data
        });
    }
};
const Update = async (req, res) => {
    try {
        let data = await rolesAPIService.updateUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT, //data
        });
    } catch (e) {
        console.log('>>check Create func: ', e);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '', //data
        });
    }
};

const Delete = async (req, res) => {
    try {
        console.log('>>>check req.body: ', req.body);
        let user = await rolesAPIService.deleteRole(req.body);
        return res.status(200).json({
            EM: user.EM,
            EC: user.EC,
            DT: user.DT, //data
        });
    } catch (e) {
        console.log('>>check Delete func: ', e);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '', //data
        });
    }
};

const getRoleByGroup = async (req, res) => {
    try {
        let id = req.params.groupId;
        let data = await rolesAPIService.getRoleByGroup(id);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT, //data
        });
    } catch (e) {
        console.log('>>>check error getRoleByGroup: ', e);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '', //data
        });
    }
};

module.exports = {
    Read,
    Create,
    Update,
    Delete,
    getRoleByGroup,
};
