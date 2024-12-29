'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('notifications', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM(
          'MUSIC_APPROVED',
          'MUSIC_PUBLISHED',
          'PUBLISH_TRACK',
          'MUSIC_BOUGHT',
          'MUSIC_FAVORITES',
          'MUSIC_MAX_PUBLISHED',
          'COMMENTED_TO_MUSIC',
          'COMMENTED_TO_COMMENT',
          'UPGRAFE_ACCOUNT',
          'UPGRAFE_ACCOUNT_PRO',
          'SUBSCRIPTION_EXPIRED',
          'TOP_UP_BALANCE',
          'WITHDRAWAL',
        ),
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      read: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('notifications');
  },
};
