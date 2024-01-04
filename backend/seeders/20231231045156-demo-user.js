'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         */
        await queryInterface.bulkInsert(
            'Users',
            [
                {
                    email: 'John Doe',
                    password: '1234',
                    username: 'chung ta cua hien tai',
                },
                {
                    email: 'Tran Thai Duy',
                    password: '5677',
                    username: 'tui la Duy',
                },
                {
                    email: 'Joe biden',
                    password: '7890',
                    username: 'Tổng thún Hoa Kỳ',
                },
            ],
            {},
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
