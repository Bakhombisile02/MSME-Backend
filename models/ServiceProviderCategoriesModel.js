
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('ServiceProviderCategoriesModel', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false, // or false if required
            minlength: [3, 'Name Must be at least 3 characters long'],
            maxlength: [200, 'Name Must be at most 200 characters long'],
        },
        description: {
            type: DataTypes.STRING(600),
            allowNull: false, // or false if required
            minlength: [3, 'Description Must be at least 3 characters long'],
            maxlength: [600, 'Description Must be at most 200 characters long'],
        },
        icon_url: {
            type: DataTypes.STRING(600),
            allowNull: false,
        },
    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'serviceProviderCategoriess', // Optional: useful for clarity and pluralization control
    });

    return Model;
};
