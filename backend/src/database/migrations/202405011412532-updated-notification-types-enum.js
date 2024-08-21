'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.query(
        `ALTER TYPE "enum_notifications_type" ADD VALUE 'FOLLOWING_USER_ACTION';`,
        { transaction },
      );
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.query(
        `ALTER TYPE "enum_notifications_type" DROP VALUE 'FOLLOWING_USER_ACTION';`,
        { transaction },
      );
    });
  },
};
