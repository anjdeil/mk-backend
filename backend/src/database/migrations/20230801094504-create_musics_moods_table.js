'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'music-moods',
      {
        musicId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'musics', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        moodId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'moods', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      {
        timestamps: false,
        freezeTableName: true,
        sequelize: queryInterface.sequelize,
        primaryKey: {
          name: 'musics_moods_pk',
          fields: ['musicId', 'moodId'],
        },
      },
    );

    await queryInterface.sequelize.query(
      `ALTER TABLE "music-moods" ADD CONSTRAINT "music-moods_pk" 
       PRIMARY KEY("musicId", "moodId")`,
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `ALTER TABLE "music-moods" DROP CONSTRAINT "music-moods_pk"`,
    );
    await queryInterface.dropTable('MusicMoods');
  },
};
