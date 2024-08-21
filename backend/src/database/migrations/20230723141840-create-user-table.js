'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        pseudonym: {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true,
        },
        role: {
          type: Sequelize.ENUM('admin', 'moderator', 'buyer', 'seller'),
          allowNull: false,
          defaultValue: 'buyer',
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true,
        },
        biography: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        avatar: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        confirmed: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        sequelize: queryInterface.sequelize,
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
