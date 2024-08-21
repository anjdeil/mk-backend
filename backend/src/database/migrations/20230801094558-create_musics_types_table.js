'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'music-types',
      {
        musicId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'musics', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        typeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'types', key: 'id' },
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
      `ALTER TABLE "music-types" ADD CONSTRAINT "music-types_pk" 
       PRIMARY KEY("musicId", "typeId")`,
    );
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.sequelize.query(
    //   `ALTER TABLE "music-types" DROP CONSTRAINT "music-types_pk"`);
    await queryInterface.dropTable('music-types');
  },
};
