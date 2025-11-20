const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('MSMEBusinessModel', {
        id:{
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name_of_organization: {
            type: DataTypes.STRING(70),
            allowNull: false, // or false if required
            minlength: [3, 'name must be at least 30 characters long'],
        },
        brief_company_description: {
            type: DataTypes.TEXT,
            allowNull: true, // or false if required
        },

        business_category_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },

        business_category_name: {
            type: DataTypes.STRING(200),
            allowNull: false, // or false if required
            minlength: [3, 'name must be at least 3 characters long'],
        },

        business_sub_category_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },

        business_sub_category_name: {
            type: DataTypes.STRING(200),
            allowNull: true, // or false if required
            minlength: [3, 'name must be at least 3 characters long'],
        },

        service_offered: {
            type: DataTypes.STRING(600),
            allowNull: true, // or false if required
        },

        product_offered: {
            type: DataTypes.STRING(600),
            allowNull: true, // or false if required
        },

        business_type: {
            type: DataTypes.STRING(50),
            allowNull: true, // or false if required
        },

        ownerType: {
            type: DataTypes.STRING(50),
            allowNull: true, // or false if required
        },

        disability_owned: {
            type: DataTypes.STRING(20),
            allowNull: true, // or false if required
        },
        turnover: {
            type: DataTypes.STRING(200),
            allowNull: true, // or false if required
        },
        establishment_year: {
            type: DataTypes.STRING(20),
            allowNull: true, // or false if required
        },
        employees: {
            type: DataTypes.STRING(20),
            allowNull: true, // or false if required
        },
        contact_number: {
            type: DataTypes.STRING(50),
            allowNull: true, // or false if required
        },
        email_address: {
            type: DataTypes.STRING(200),
            allowNull: true, // or false if required
        },
        street_address: {
            type: DataTypes.STRING(300),
            allowNull: true, // or false if required
        },
        town: {
            type: DataTypes.STRING(100),
            allowNull: true, // or false if required
        },
        region: {
            type: DataTypes.STRING(200),
            allowNull: true, // or false if required
        },
        primary_contact_name: {
            type: DataTypes.STRING(200),
            allowNull: true, // or false if required
        },
        primary_contact_number: {
            type: DataTypes.STRING(30),
            allowNull: true, // or false if required
        },
        primary_contact_email: {
            type: DataTypes.STRING(200),
            allowNull: true, // or false if required
        },
        business_profile_url: {
            type: DataTypes.STRING(600),
            allowNull: true, // or false if required
        },
        business_image_url: {
            type: DataTypes.STRING(600),
            allowNull: true, // or false if required
        },

        incorporation_image_url: {
            type: DataTypes.STRING(600),
            allowNull: true, // or false if required
        },

        password: {
            type: DataTypes.STRING(400),
            allowNull: true, // or false if required
            minlength: [5, 'Password Must be at least 5 characters long'],
        },
        is_verified: {
            type: DataTypes.STRING(20),
            allowNull: false, // or false if required
        },

        is_verified_comments: {
            type: DataTypes.STRING(800),
            allowNull: true, // or false if required
        },

        otp: {
            type: DataTypes.STRING(20),
            allowNull: true, // or false if required
        },
        otp_expiry: {
            type: DataTypes.DATE,
            allowNull: true, // or false if required
        },

        lat: {
            type: DataTypes.STRING(100),
            allowNull: true, // or false if required
        },
        longe: {
            type: DataTypes.STRING(100),
            allowNull: true, // or false if required
        },
        ownership_type: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        inkhundla: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        rural_urban_classification: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        telephone_number: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        owner_gender_summary: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },

    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'MSMEBusiness', // Optional: useful for clarity and pluralization control
    });


    Model.prototype.generateAuthToken = function () {
        return jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    };


    Model.prototype.comparePassword = async function (password) {
        return bcrypt.compare(password, this.password);
    };

    Model.hashPassword = async function (password) {
        return await bcrypt.hash(password, 10);
    };


    return Model;
};
