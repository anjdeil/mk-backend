'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('musics', 'stems');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('musics', 'stems', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
