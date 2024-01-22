import db from '../models/index';

const getGroupWithRoles = async (user) => {
    // scope: quyền hạn phạm vi truy cập của hệ thống
    let roles = await db.Group.findOne({
        where: { id: user.groupId },
        include: { model: db.Role, attributes: ['id', 'url', 'description'], through: { attributes: [] } },
    });

    return roles ? roles : {};
};

module.exports = {
    getGroupWithRoles,
};
