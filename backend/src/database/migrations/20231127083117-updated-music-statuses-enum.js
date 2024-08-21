'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // First, add 'unpublished' to the enum
      await queryInterface.sequelize.query(
        'ALTER TYPE "enum_musics_status" ADD VALUE \'unpublished\';',
        { transaction },
      );

      // Then, change the column to use the new enum
      await queryInterface.changeColumn(
        'musics',
        'status',
        {
          type: Sequelize.ENUM(
            'pending',
            'approved',
            'rejected',
            'published',
            'unpublished',
            'blocked',
          ),
          allowNull: false,
          defaultValue: 'pending',
        },
        { transaction },
      );
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Change the column back to the old enum without 'unpublished'
      await queryInterface.changeColumn(
        'musics',
        'status',
        {
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
        { transaction },
      );

      // Remove 'unpublished' from the enum
      await queryInterface.sequelize.query(
        "DELETE FROM pg_enum WHERE enumlabel = 'unpublished' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_musics_status');",
        { transaction },
      );
    });
  },
};
