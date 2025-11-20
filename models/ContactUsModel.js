
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('ContactUsModel', {
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

        subject: {
            type: DataTypes.STRING(200),
            allowNull: false, // or false if required
            minlength: [3, 'Subject must be at least 3 characters long'],
        },
        message: {
            type: DataTypes.STRING(750),
            allowNull: false, // or false if required
            minlength: [3, 'description must be at least 3 characters long'],
        },
       
    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'contact_us', // Optional: useful for clarity and pluralization control
    });

    return Model;
};
