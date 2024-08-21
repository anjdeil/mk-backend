'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'music-keys',
      {
        musicId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'musics', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        keyId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'keys', key: 'id' },
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
      `ALTER TABLE "music-keys" ADD CONSTRAINT "music-keys_pk" 
       PRIMARY KEY("musicId", "keyId")`,
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `ALTER TABLE "music-keys" DROP CONSTRAINT "music-keys_pk"`,
    );
    await queryInterface.dropTable('MusicKeys');
  },
};
