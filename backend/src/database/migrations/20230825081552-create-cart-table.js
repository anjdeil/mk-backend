'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'cart',
      {
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
        fileId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'files',
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
    await queryInterface.sequelize.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "cart_pk" 
       PRIMARY KEY("fileId", "userId")`,
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "cart_pk"`,
    );
    await queryInterface.dropTable('cart');
  },
};
