'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('transactions', 'fileId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'files',
        key: 'id',
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL',
      },
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('transactions', 'fileId');
  },
};
