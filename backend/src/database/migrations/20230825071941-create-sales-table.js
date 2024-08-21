'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(
      'sales',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        fileId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'files',
            key: 'id',
          },
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
        },
        transactionId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'transactions',
            key: 'id',
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
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
      },
      {
        timestamps: true,
        deletedAt: false,
        freezeTableName: true,
        sequelize: queryInterface.sequelize,
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sales');
  },
};
