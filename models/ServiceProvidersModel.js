
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('ServiceProvidersModel', {
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
        email: {
            type: DataTypes.STRING(200),
            allowNull: false, // or false if required
            minlength: [3, 'Email Must be at least 3 characters long'],
            maxlength: [200, 'Email Must be at most 200 characters long'],
        },
        mobile: {
            type: DataTypes.STRING(50),
            allowNull: false, // or false if required
            minlength: [6, 'Mobile Must be at least 3 characters long'],
            maxlength: [50, 'Mobile Must be at most 200 characters long'],
        },
        address: {
            type: DataTypes.STRING(400),
            allowNull: false, // or false if required
            minlength: [3, 'Address Must be at least 3 characters long'],
            maxlength: [400, 'Address Must be at most 200 characters long'],
        },
        business_name: {
            type: DataTypes.STRING(400),
            allowNull: false, // or false if required
            minlength: [3, 'Business Must be at least 3 characters long'],
            maxlength: [400, 'Business Must be at most 200 characters long'],
        },
        business_description: {
            type: DataTypes.STRING(800),
            allowNull: false, // or false if required
            minlength: [3, 'Business Description Must be at least 3 characters long'],
            maxlength: [800, 'Business Description Must be at most 200 characters long'],
        },
        url: {
            type: DataTypes.STRING(600),
            allowNull: false,
        },
        categorie_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        categorie_name: {
            type: DataTypes.STRING(200),
            allowNull: false, // or false if required
            minlength: [3, 'Categorie Name Must be at least 3 characters long'],
            maxlength: [200, 'Categorie Name Must be at most 200 characters long'],
        },
    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'serviceProviders', // Optional: useful for clarity and pluralization control
    });

    return Model;
};
