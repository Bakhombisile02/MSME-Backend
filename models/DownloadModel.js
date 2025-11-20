
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('DownloadModel', {
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
            allowNull: false,
            minlength: [3, 'Name Must be at least 3 characters long'],
            maxlength: [600, 'Name Must be at most 600 characters long'],
        },
        url: {
            type: DataTypes.STRING(600),
            allowNull: false,
        },
    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'downloads', // Optional: useful for clarity and pluralization control
    });

    return Model;
};
