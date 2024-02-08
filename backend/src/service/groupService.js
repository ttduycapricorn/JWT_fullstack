import db from '../models';

const getGroup = async () => {
    try {
        let data = await db.Group.findAll({
            order: [['name', 'ASC']],
            attributes: ['id', 'name', 'description'],
        });

        // console.log('>>check data: ', data);
        return {
            EM: 'get group success!',
            EC: 0,
            DT: data,
        };
    } catch (e) {
        console.log('>>check Error: ', e);
        return {
            EM: 'error from service!',
            EC: 1,
            DT: [],
        };
    }
};

module.exports = {
    getGroup,
};
