'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'music-instruments',
      {
        musicId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'musics', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        instrumentId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'instruments', key: 'id' },
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
      `ALTER TABLE "music-instruments" ADD CONSTRAINT "music-instruments_pk" 
       PRIMARY KEY("musicId", "instrumentId")`,
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `ALTER TABLE "music-instruments" DROP CONSTRAINT "music-instruments_pk"`,
    );

    await queryInterface.dropTable('MusicsInstruments');
  },
};
