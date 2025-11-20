
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('BusinessSubCategoriesModel', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        BusinessCategorieId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
       BusinessCategorieName: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false, // or false if required
            minlength: [3, 'Name Must be at least 3 characters long'],
            maxlength: [200, 'Name Must be at most 200 characters long'],
        },
    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'businessSubCategories', // Optional: useful for clarity and pluralization control
    });

    return Model;
};
