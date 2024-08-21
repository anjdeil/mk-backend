'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'music-categories',
      {
        musicId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'musics', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        categoryId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'categories', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      {
        timestamps: false,
        freezeTableName: true,
        sequelize: queryInterface.sequelize,
      },
    );
    await queryInterface.sequelize.query(
      `ALTER TABLE "music-categories" ADD CONSTRAINT "music-categories_pk" 
       PRIMARY KEY("musicId", "categoryId")`,
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `ALTER TABLE "music-categories" DROP CONSTRAINT "music-categories_pk"`,
    );
    await queryInterface.dropTable('music-categories');
  },
};
