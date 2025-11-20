'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Add new columns to MSMEBusiness table
      await queryInterface.addColumn('MSMEBusiness', 'ownership_type', {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'Individual'
      }, { transaction });

      await queryInterface.addColumn('MSMEBusiness', 'inkhundla', {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: 'Unknown'
      }, { transaction });

      await queryInterface.addColumn('MSMEBusiness', 'rural_urban_classification', {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'Unknown'
      }, { transaction });

      await queryInterface.addColumn('MSMEBusiness', 'telephone_number', {
        type: Sequelize.STRING(30),
        allowNull: true
      }, { transaction });

      await queryInterface.addColumn('MSMEBusiness', 'owner_gender_summary', {
        type: Sequelize.STRING(20),
        allowNull: true
      }, { transaction });

      // Add nationality to directorsInfos table
      await queryInterface.addColumn('directorsInfos', 'nationality', {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'Swazi'
      }, { transaction });

      // Create business_owners table
      await queryInterface.createTable('business_owners', {
        id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        business_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: 'MSMEBusiness',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        gender: {
          type: Sequelize.STRING(20),
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true
        }
      }, { transaction });

      // Add index on business_id
      await queryInterface.addIndex('business_owners', ['business_id'], {
        name: 'idx_business_owners_business_id',
        transaction
      });

      await transaction.commit();
      console.log('Migration completed successfully');
    } catch (error) {
      await transaction.rollback();
      console.error('Migration failed:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Drop business_owners table
      await queryInterface.dropTable('business_owners', { transaction });

      // Remove columns from MSMEBusiness
      await queryInterface.removeColumn('MSMEBusiness', 'ownership_type', { transaction });
      await queryInterface.removeColumn('MSMEBusiness', 'inkhundla', { transaction });
      await queryInterface.removeColumn('MSMEBusiness', 'rural_urban_classification', { transaction });
      await queryInterface.removeColumn('MSMEBusiness', 'telephone_number', { transaction });
      await queryInterface.removeColumn('MSMEBusiness', 'owner_gender_summary', { transaction });

      // Remove nationality from directorsInfos
      await queryInterface.removeColumn('directorsInfos', 'nationality', { transaction });

      await transaction.commit();
      console.log('Rollback completed successfully');
    } catch (error) {
      await transaction.rollback();
      console.error('Rollback failed:', error);
      throw error;
    }
  }
};
