import db from '../models/index';

const createNewRoles = async (roles) => {
    try {
        const currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true,
        });

        const persist = roles.filter(({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2));

        await db.Role.bulkCreate(persist);

        if (persist.length === 0) {
            return {
                EM: 'Nothing to create!',
                EC: 0,
                DT: [],
            };
        } else {
            return {
                EM: `Create ${persist.length} roles success...!`,
                EC: 0,
                DT: [],
            };
        }

        // await db.Role.bulkCreate(roles);
    } catch (e) {
        console.log('>>check Error: ', e);
        return {
            EM: `Something wrong from server!`,
            EC: -1,
            DT: [],
        };
    }
};

module.exports = {
    createNewRoles,
};
