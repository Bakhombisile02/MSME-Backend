
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('FeedbackModel', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        feedbackType: {
            type: DataTypes.STRING(100),
            allowNull: false, // or false if required
            minlength: [3, 'name must be at least 3 characters long'],
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false, // or false if required
            minlength: [3, 'name must be at least 3 characters long'],
        },
        mobile: {
            type: DataTypes.STRING(100),
            allowNull: false, // or false if required
            minlength: [3, 'name must be at least 3 characters long'],
        },
        email: {
            type: DataTypes.STRING(200),
            allowNull: false, // or false if required
            minlength: [3, 'name must be at least 3 characters long'],
        },

        message: {
            type: DataTypes.TEXT('long'),
            allowNull: false, // or false if required
            minlength: [3, 'description must be at least 3 characters long'],
        },
       
    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'feedbasks', // Optional: useful for clarity and pluralization control
    });

    return Model;
};
