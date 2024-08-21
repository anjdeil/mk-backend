'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'comments',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        musicId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'musics', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        comment: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        parentCommentId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'comments', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
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
    await queryInterface.dropTable('comments');
  },
};
