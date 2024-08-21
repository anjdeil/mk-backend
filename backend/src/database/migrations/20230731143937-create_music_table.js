'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'musics',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        artistId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        previewTrack: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        previewImage: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        requirements: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        stems: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        bpm: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        duration: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        listenCount: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        downloadCount: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        status: {
          type: Sequelize.ENUM(
            'pending',
            'approved',
            'rejected',
            'published',
            'blocked',
          ),
          allowNull: false,
          defaultValue: 'pending',
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
        freezeTableName: true,
        sequelize: queryInterface.sequelize,
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('musics');
  },
};
