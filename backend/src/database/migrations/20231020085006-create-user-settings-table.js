'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('user-settings', {
      userId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      comments: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {
          email: true,
          push: true,
        },
      },
      mentions: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {
          email: true,
          push: true,
        },
      },
      favorites: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {
          email: true,
          push: true,
        },
      },
      withdrawal: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {
          email: true,
          push: true,
        },
      },
      subscriptions: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {
          email: true,
          push: true,
        },
      },
      sales: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {
          email: true,
          push: true,
        },
      },
      promotions: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {
          email: true,
          push: true,
        },
      },
      system: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {
          email: true,
          push: true,
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user-settings');
  },
};
