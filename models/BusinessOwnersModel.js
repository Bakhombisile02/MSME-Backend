module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('BusinessOwnersModel', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        business_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'MSMEBusiness',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        gender: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                isIn: [['Male', 'Female']]
            }
        }
    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'business_owners',
        indexes: [
            {
                fields: ['business_id']
            }
        ]
    });

    return Model;
};
