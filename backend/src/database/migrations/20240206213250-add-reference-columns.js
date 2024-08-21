'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Add new array columns to the 'musics' table within a transaction
      await queryInterface.addColumn(
        'musics',
        'moodIds',
        {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
          allowNull: true,
          defaultValue: null,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'musics',
        'instrumentIds',
        {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
          allowNull: true,
          defaultValue: null,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'musics',
        'keyIds',
        {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
          allowNull: true,
          defaultValue: null,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'musics',
        'typeIds',
        {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
          allowNull: true,
          defaultValue: null,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'musics',
        'categoryIds',
        {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
          allowNull: true,
          defaultValue: null,
        },
        { transaction },
      );

      // Function to update each new column with related IDs
      const updateColumn = async (tableName, columnName, relatedIdColumn) => {
        const musics = await queryInterface.sequelize.query(
          'SELECT id FROM musics',
          { type: Sequelize.QueryTypes.SELECT, transaction },
        );
        for (const music of musics) {
          await queryInterface.sequelize.query(
            `UPDATE musics SET "${columnName}" = array(SELECT "${relatedIdColumn}" FROM "${tableName}" WHERE "musicId" = :musicId) WHERE id = :musicId`,
            {
              replacements: { musicId: music.id },
              type: Sequelize.QueryTypes.UPDATE,
              transaction,
            },
          );
        }
      };

      // Populate the new columns
      await updateColumn('music-moods', 'moodIds', 'moodId');
      await updateColumn('music-instruments', 'instrumentIds', 'instrumentId');
      await updateColumn('music-keys', 'keyIds', 'keyId');
      await updateColumn('music-types', 'typeIds', 'typeId');
      await updateColumn('music-categories', 'categoryIds', 'categoryId');
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the added columns in case of rollback
    await queryInterface.removeColumn('musics', 'moodIds');
    await queryInterface.removeColumn('musics', 'instrumentIds');
    await queryInterface.removeColumn('musics', 'keyIds');
    await queryInterface.removeColumn('musics', 'typeIds');
    await queryInterface.removeColumn('musics', 'categoryIds');
  },
};
