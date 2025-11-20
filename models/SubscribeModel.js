
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('SubscribeModel', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING(300),
            allowNull: false, // or false if required
            minlength: [3, 'Name Must be at least 3 characters long'],
            maxlength: [300, 'Name Must be at most 300 characters long'],
        },
    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'subscribes', // Optional: useful for clarity and pluralization control
    });

    return Model;
};
