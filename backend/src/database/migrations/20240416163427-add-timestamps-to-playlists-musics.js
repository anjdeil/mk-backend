'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('"playlist-musics"', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
    await queryInterface.addColumn('"playlist-musics"', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });

    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW."updatedAt" = now();
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER update_playlist_musics_updated_at BEFORE UPDATE
      ON "playlist-musics" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('"playlist-musics"', 'createdAt');
    await queryInterface.removeColumn('"playlist-musics"', 'updatedAt');

    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS update_playlist_musics_updated_at ON "playlist-musics";
    `);
    await queryInterface.sequelize.query(`
      DROP FUNCTION IF EXISTS update_updated_at_column();
    `);
  },
};
