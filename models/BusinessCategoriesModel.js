
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('BusinessCategoriesModel', {
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
        icon_url: {
            type: DataTypes.STRING(600),
            allowNull: false,
        },
    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'businessCategories', // Optional: useful for clarity and pluralization control
    });

    Model.associate = (models) => {
    Model.hasMany(models.MSMEBusinessModel, {
      foreignKey: 'business_category_id',
      sourceKey: 'id',
      as: 'msmes'
    });
  };

    return Model;
};
