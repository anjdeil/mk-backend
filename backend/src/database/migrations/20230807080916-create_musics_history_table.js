'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'history',
      {
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
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,
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
      `ALTER TABLE "history" ADD CONSTRAINT "history_pk" 
       PRIMARY KEY("musicId", "userId", "createdAt")`,
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `ALTER TABLE "history" DROP CONSTRAINT "history_pk"`,
    );
    await queryInterface.dropTable('history');
  },
};
