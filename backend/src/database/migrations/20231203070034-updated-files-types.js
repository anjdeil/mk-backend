'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('files', 'type');
    await queryInterface.sequelize.query('drop type enum_files_type;');
    await queryInterface.addColumn('files', 'type', {
      type: Sequelize.ENUM('mp3', 'wav', 'stems'),
      allowNull: false,
      defaultValue: 'mp3',
    });
  },

  down: async (queryInterface, Sequelize) => {},
};
