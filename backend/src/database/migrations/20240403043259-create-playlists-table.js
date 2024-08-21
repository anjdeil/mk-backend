'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'playlists',
      {
      id: {
          allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      coverImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      public: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    }, {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
      sequelize: queryInterface.sequelize
    });

    await queryInterface.createTable('playlist-musics', {
      playlistId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'playlists',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      musicId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'musics',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('playlist-musics');
    await queryInterface.dropTable('playlists');
  },
};
