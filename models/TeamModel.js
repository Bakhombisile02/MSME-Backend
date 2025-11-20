
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('TeamModel', {
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
        possition: {
            type: DataTypes.STRING(400),
            allowNull: false,
            minlength: [3, 'Name Must be at least 3 characters long'],
            maxlength: [200, 'Name Must be at most 200 characters long'],
        },
        url: {
            type: DataTypes.STRING(600),
            allowNull: false,
        },
    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'teams', // Optional: useful for clarity and pluralization control
    });

    return Model;
};
