'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'playlist_follows',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
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
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
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

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('playlist_follows');
  },
};
