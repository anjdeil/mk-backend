'use-strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'user-payout',
      {
        userId: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
            onDelete: 'cascade',
            onUpdate: 'cascade',
          },
        },
        type: {
          type: Sequelize.ENUM('individual', 'bussiness'),
          allowNull: false,
        },
        swiftCode: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        accountNumber: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
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
      },
      {
        timestamps: true,
        freezeTableName: true,
        tableName: 'user-payout',
      },
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user-payout');
  },
};
