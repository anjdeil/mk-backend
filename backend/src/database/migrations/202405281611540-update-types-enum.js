'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.query(
        `ALTER TYPE "enum_notifications_type" ADD VALUE 'MUSIC_APPROVED';`,
        { transaction },
      );

      await queryInterface.sequelize.query(
        `ALTER TYPE "enum_notifications_type" ADD VALUE 'MUSIC_DECLINED';`,
        { transaction },
      );

      await queryInterface.sequelize.query(
        `ALTER TYPE "enum_notifications_type" ADD VALUE 'MUSIC_BLOCKED';`,
        { transaction },
      );

      await queryInterface.sequelize.query(
        `ALTER TYPE "enum_notifications_type" ADD VALUE 'NEW_PLAYLISTS_FOLLOWER';`,
        { transaction },
      );
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.query(
        `ALTER TYPE "enum_notifications_type" DROP VALUE 'NEW_PLAYLISTS_FOLLOWER';`,
        { transaction },
      );
    });
  },
};
