'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('musics', 'previewCompressedTrack', {
      type: Sequelize.STRING,
      allowNull: true,
      default: null,
    });
    // await queryInterface.sequelize.query(`
    //   UPDATE "musics"
    //   SET "previewCompressedTrack" = "previewTrack"
    // `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('musics', 'previewCompressedTrack');
  },
};
