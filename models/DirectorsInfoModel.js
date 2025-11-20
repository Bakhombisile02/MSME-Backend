
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('DirectorsInfoModel', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false, // or false if required
            minlength: [3, 'name must be at least 3 characters long'],
        },
        age: {
            type: DataTypes.STRING(20),
            allowNull: false, // or false if required
        },
        gender: {
            type: DataTypes.STRING(20),
            allowNull: false, // or false if required
        },
        qualification: {
            type: DataTypes.STRING(200),
            allowNull: false, // or false if required
        },
        nationality: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        business_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'directorsInfos', // Optional: useful for clarity and pluralization control
    });

    return Model;
};
