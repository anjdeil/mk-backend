'use-strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'billing-address',
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
        country: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        city: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        phoneNumber: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        phoneCode: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        postalCode: {
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
        tableName: 'billing-address',
      },
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('billing-address');
  },
};
