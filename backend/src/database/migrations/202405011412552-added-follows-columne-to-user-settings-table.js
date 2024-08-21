'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user-settings', 'follows', {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: {
        email: true,
        push: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user-settings', 'follows');
  },
};
