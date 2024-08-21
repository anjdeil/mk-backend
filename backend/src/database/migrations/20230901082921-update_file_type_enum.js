'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('files', 'type', {
      type: Sequelize.TEXT,
    });
    await queryInterface.sequelize.query('drop type enum_files_type;');
    await queryInterface.changeColumn('files', 'type', {
      type: Sequelize.ENUM('mp3', 'wav'),
    });
  },

  down: async (queryInterface, Sequelize) => {},
};
