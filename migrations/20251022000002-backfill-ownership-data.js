'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Migrate existing ownerType to business_owners table
      // Only migrate records where ownerType is set and valid
      await queryInterface.sequelize.query(`
        INSERT INTO business_owners (business_id, gender, createdAt, updatedAt)
        SELECT id, ownerType, createdAt, updatedAt
        FROM MSMEBusiness
        WHERE ownerType IS NOT NULL 
          AND ownerType != '' 
          AND ownerType IN ('Male', 'Female')
      `, { transaction });

      // Set owner_gender_summary based on migrated ownerType
      await queryInterface.sequelize.query(`
        UPDATE MSMEBusiness 
        SET owner_gender_summary = ownerType
        WHERE ownerType IN ('Male', 'Female')
      `, { transaction });

      // Set ownership_type to 'Individual' for records with ownerType
      // (default value already handles new records)
      await queryInterface.sequelize.query(`
        UPDATE MSMEBusiness 
        SET ownership_type = 'Individual'
        WHERE ownerType IS NOT NULL AND ownerType != ''
      `, { transaction });

      await transaction.commit();
      console.log('Backfill migration completed successfully');
    } catch (error) {
      await transaction.rollback();
      console.error('Backfill migration failed:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Clear backfilled data from business_owners
      await queryInterface.sequelize.query(`
        DELETE FROM business_owners
        WHERE business_id IN (
          SELECT id FROM MSMEBusiness 
          WHERE ownerType IS NOT NULL AND ownerType != ''
        )
      `, { transaction });

      // Clear owner_gender_summary
      await queryInterface.sequelize.query(`
        UPDATE MSMEBusiness 
        SET owner_gender_summary = NULL
      `, { transaction });

      await transaction.commit();
      console.log('Backfill rollback completed successfully');
    } catch (error) {
      await transaction.rollback();
      console.error('Backfill rollback failed:', error);
      throw error;
    }
  }
};
