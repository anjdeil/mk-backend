'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(
      'transactions',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        amount: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        type: {
          type: Sequelize.ENUM('sell', 'withdraw'),
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM('pending', 'finished', 'rejected'),
          allowNull: false,
        },
        recipientId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
        },
        senderId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
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
    await queryInterface.dropTable('transactions');
  },
};
