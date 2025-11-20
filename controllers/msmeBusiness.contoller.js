const { Sequelize, QueryTypes } = require('sequelize');
const Op = Sequelize.Op;
const BaseRepo = require('../services/BaseRepository');
const { MSMEBusinessModel, DirectorsInfoModel, BusinessOwnersModel } = require('../models');
const { validationResult } = require('express-validator');
const sendEmail = require('../mailer/mailerFile');
const ownershipService = require('../services/ownershipService');


module.exports.add = async (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const { directorsInfo, ...msmeData } = req.body;

    // console.log("msmeData ==> ", msmeData);

    const isEmailExist = await MSMEBusinessModel.findOne({ where: { email_address: msmeData.email_address } });
    if (isEmailExist) {
        return res.status(400).json({ error: 'This email is already registered. Please use a different email address.' });
    }

    const hashedPassword = await MSMEBusinessModel.hashPassword(msmeData.password.toString());
    msmeData.password = hashedPassword;

    try {
        const msme = await BaseRepo.baseCreate(MSMEBusinessModel, msmeData);
        if (!msme) {
            return res.status(400).json({ error: 'Error creating MSME Business' });
        }

        // Handle ownership and business owners
        if (msmeData.owners && Array.isArray(msmeData.owners)) {
            const validation = ownershipService.validateOwnership(msmeData.ownership_type || msmeData.ownershipType, msmeData.owners);
            if (!validation.valid) {
                await msme.destroy();
                return res.status(400).json({ error: validation.error });
            }

            // Compute gender summary
            const genderSummary = ownershipService.computeGenderSummary(msmeData.owners);
            await msme.update({ owner_gender_summary: genderSummary });

            // Create business owner records
            const owners = msmeData.owners.map(owner => ({
                business_id: msme.id,
                gender: owner.gender
            }));

            await BaseRepo.baseBulkCreate(BusinessOwnersModel, owners);
        }

        const directors = directorsInfo.map(director => ({
            ...director,
            business_id: msme.id
        }));

        const directorsInfoValues = await BaseRepo.baseBulkCreate(DirectorsInfoModel, directors);
        if (!directorsInfoValues) {
            return res.status(400).json({ error: 'Error creating MSME Business' });
        }

        // Send email to the user
        sendEmail(msmeData, 1, msmeData.email_address);

        res.status(201).json(
            {
                message: "MSME and directors saved successfully",
                data: {
                    msme: msme,
                    directors: directorsInfoValues
                }
            });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports.get = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const params = {
        searchParams: { is_verified: 2 },
        limit: limit,
        offset: offset,
        page: page,
        order: [["id", "DESC"]],
    }
    try {
        const msmeInfo = await BaseRepo.baseList(MSMEBusinessModel, params);
        if (!msmeInfo) {
            return res.status(400).json({ error: 'Error fetching Business Categories' });
        }
        res.status(201).json(msmeInfo);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports.checkEmailExists = async (req, res, next) => {

    const email_address = req.params.email_address;

    try {
        const isEmailExist = await MSMEBusinessModel.findOne({ where: { email_address: email_address } });
        if (isEmailExist) {
            return res.status(400).json({ exists: true, message: 'Email already exists' });
        } else {
            return res.status(200).json({ exists: false, message: 'Email does not exist' });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports.getWeb = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const is_verified = req.params.is_verified;

    let params;
    if (is_verified === 0 || is_verified === "0" || is_verified === '0') {
        params = {
            searchParams: {},
            limit: limit,
            offset: offset,
            page: page,
            order: [["id", "DESC"]],
        }
    }
    else {
        params = {
            searchParams: { is_verified: is_verified },
            limit: limit,
            offset: offset,
            page: page,
            order: [["id", "DESC"]],
        }
    }
    try {
        const msmeInfo = await BaseRepo.baseList(MSMEBusinessModel, params);
        if (!msmeInfo) {
            return res.status(400).json({ error: 'Error fetching Business Categories' });
        }
        res.status(201).json(msmeInfo);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}




module.exports.getListAccordingToCategoryId = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const business_category_id = req.params.business_category_id;
    const is_verified = 2; // Default to 2 if not provided

    const params = {
        searchParams: {},
        limit: limit,
        offset: offset,
        page: page,
        order: [["id", "DESC"]],
    }

    try {
        const msmeInfo = await BaseRepo.baseList2(MSMEBusinessModel, params, business_category_id, is_verified);
        if (!msmeInfo) {
            return res.status(400).json({ error: 'Error fetching Business Categories' });
        }
        res.status(201).json(msmeInfo);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}




module.exports.getListAccordingToCategoryIdV2 = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const business_category_id = req.params.business_category_id;
    const is_verified = 2; // Default to 2 if not provided

    const params = {
        searchParams: {},
        limit: limit,
        offset: offset,
        page: page,
        order: [["id", "DESC"]],
    }

    try {
        const msmeInfo = await BaseRepo.baseList3(MSMEBusinessModel, params, business_category_id, is_verified);
        if (!msmeInfo) {
            return res.status(400).json({ error: 'Error fetching Business Categories' });
        }
        res.status(201).json(msmeInfo);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}





module.exports.getMSMEDetails = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const id = req.params.id;

    try {
        const msmeDetails = await BaseRepo.baseFindById(MSMEBusinessModel, id, "id");
        if (!msmeDetails) {
            return res.status(400).json({ error: 'Error fetching MSME details' });
        }

        const directorsDetail = await BaseRepo.baseFindAllById(DirectorsInfoModel, msmeDetails.dataValues.id, "business_id");
        if (!directorsDetail) {
            return res.status(400).json({ error: 'Error fetching directors details' });
        }

        // Fetch business owners
        const businessOwners = await BaseRepo.baseFindAllById(BusinessOwnersModel, msmeDetails.dataValues.id, "business_id");
        
        res.status(201).json({ 
            msmeDetails, 
            directorsDetail,
            businessOwners: businessOwners || []
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}




module.exports.update = async (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { directorsInfo, owners, ...msmeData } = req.body;
    const id = req.params.id;

    try {
        console.log("Update request - ownership_type:", msmeData.ownership_type, "owners:", owners);
        
        // Handle ownership and business owners update
        if (msmeData.ownership_type && owners && Array.isArray(owners)) {
            const validation = ownershipService.validateOwnership(msmeData.ownership_type || msmeData.ownershipType, owners);
            if (!validation.valid) {
                console.log("Ownership validation failed:", validation.error);
                return res.status(400).json({ error: validation.error });
            }

            // Compute gender summary
            const genderSummary = ownershipService.computeGenderSummary(owners);
            msmeData.owner_gender_summary = genderSummary;

            // Delete existing owners and create new ones
            await BusinessOwnersModel.destroy({ where: { business_id: id } });
            
            const newOwners = owners.map(owner => ({
                business_id: id,
                gender: owner.gender
            }));

            await BaseRepo.baseBulkCreate(BusinessOwnersModel, newOwners);
        }

        const MSMEBusiness = await BaseRepo.baseUpdate(MSMEBusinessModel, { id }, msmeData);
        if (!MSMEBusiness) {
            return res.status(400).json({ error: 'Error updating MSME Business' });
        }

        res.status(201).json({
            message: 'MSME Business updated successfully',
            data: MSMEBusiness
        });
    }
    catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports.delete = async (req, res, next) => {

    const id = req.params.id;

    try {
        const BusinessCategories = await BaseRepo.baseDelete(MSMEBusinessModel, { id });
        if (!BusinessCategories) {
            return res.status(400).json({ error: 'Error deleting Business Categories' });
        }
        res.status(201).json({
            message: 'Business Categories deleted successfully',
            data: BusinessCategories
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports.verifyMSME = async (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const payload = req.body;
    const id = req.params.id;

    try {
        const Business = await BaseRepo.baseUpdate(MSMEBusinessModel, { id }, payload);
        if (!Business) {
            return res.status(400).json({ error: 'Error updating MSME Business' });
        }

        // Send email to the user
        sendEmail(payload, payload.is_verified, payload.email_address);

        res.status(201).json({
            message: 'MSME Business updated successfully',
            data: Business
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports.searchByName = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const name_of_organization = req.params.name_of_organization;

    // console.log("name_of_organization ==> ", name_of_organization);

    try {
        const msmeInfo = await BaseRepo.getSearchByLocation(MSMEBusinessModel, name_of_organization);
        if (!msmeInfo) {
            return res.status(400).json({ error: 'Error fetching Business Categories' });
        }
        res.status(201).json(msmeInfo);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports.searchByRegion = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const region = req.params.region;

    const params = {
        searchParams: { region: region },
        limit: limit,
        offset: offset,
        page: page,
        order: [["id", "DESC"]],
    }
    try {
        const msmeInfo = await BaseRepo.baseList(MSMEBusinessModel, params);
        if (!msmeInfo) {
            return res.status(400).json({ error: 'Error fetching MSME Business' });
        }
        res.status(201).json(msmeInfo);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports.filtersAPI = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const is_verified = '2';

    const {
        business_category_id,
        business_sub_category_id,
        region,
        inkhundla,
        town,
        rural_urban_classification,
        employees,
        establishment_year,
        owner_gender,
        ownership_type,
        ownerType,
        business_type,
        turnover,
        disability_owned,
        keyword,
        sort,
    } = req.query;

    // Build a single Sequelize where clause so we can combine equals and OR conditions
    const whereClause = { is_verified };

    if (business_category_id && business_category_id !== 'All') {
        whereClause.business_category_id = business_category_id;
    }
    if (business_sub_category_id && business_sub_category_id !== 'All') {
        whereClause.business_sub_category_id = business_sub_category_id;
    }
    if (region && region !== 'All') {
        whereClause.region = region;
    }
    if (inkhundla && inkhundla !== 'All') {
        whereClause.inkhundla = inkhundla;
    }
    if (town && town.trim() !== '') {
        whereClause.town = town.trim();
    }
    if (rural_urban_classification && ['Rural','Urban','Semi Urban'].includes(rural_urban_classification)) {
        whereClause.rural_urban_classification = rural_urban_classification;
    }
    if (employees && employees !== 'All') {
        whereClause.employees = employees;
    }
    if (establishment_year && establishment_year !== 'All') {
        whereClause.establishment_year = establishment_year;
    }
    if (turnover && turnover !== 'All') {
        whereClause.turnover = turnover;
    }
    if (ownerType && ownerType !== 'All') {
        whereClause.ownerType = ownerType;
    }
    if (ownership_type && ['Individual','Partnership'].includes(ownership_type)) {
        whereClause.ownership_type = ownership_type;
    }

    if (typeof disability_owned === 'string') {
        const v = disability_owned.trim().toLowerCase();
        if (v === 'yes' || v === 'no') {
            whereClause.disability_owned = v === 'yes' ? 'Yes' : 'No';
        } else if (disability_owned === 'Yes' || disability_owned === 'No') {
            whereClause.disability_owned = disability_owned;
        }
    }

    if (typeof business_type === 'string') {
        let bt = business_type.trim();
        const map = { yes: 'Registered', no: 'Unregistered' };
        const lower = bt.toLowerCase();
        if (map[lower]) bt = map[lower];
        if (bt === 'Registered' || bt === 'Unregistered') {
            whereClause.business_type = bt;
        }
    }

    if (owner_gender && ['Male','Female','Both'].includes(owner_gender)) {
        whereClause.owner_gender_summary = owner_gender;
    }

    // Enhanced keyword search - works like a basic search engine
    let keywordOr = {};
    if (keyword && keyword.trim() !== '') {
        const searchTerms = keyword.trim().toLowerCase().split(/\s+/); // Split by whitespace
        console.log('🔍 Search terms:', searchTerms);
        
        // Create search conditions for each term
        const termConditions = searchTerms.map(term => {
            const like = '%' + term + '%';
            return {
                [Op.or]: [
                    // Business identity
                    { name_of_organization: { [Op.like]: like } },
                    { business_category_name: { [Op.like]: like } },
                    { business_sub_category_name: { [Op.like]: like } },
                    { business_type: { [Op.like]: like } },
                    
                    // Business details
                    { brief_company_description: { [Op.like]: like } },
                    { product_offered: { [Op.like]: like } },
                    { service_offered: { [Op.like]: like } },
                    
                    // Location
                    { town: { [Op.like]: like } },
                    { region: { [Op.like]: like } },
                    { inkhundla: { [Op.like]: like } },
                    { street_address: { [Op.like]: like } },
                    
                    // Contact information
                    { contact_number: { [Op.like]: like } },
                    { email_address: { [Op.like]: like } },
                    { primary_contact_name: { [Op.like]: like } },
                    
                    // Business characteristics
                    { ownerType: { [Op.like]: like } },
                    { ownership_type: { [Op.like]: like } },
                    { rural_urban_classification: { [Op.like]: like } },
                ]
            };
        });
        
        // Use AND logic: all search terms must match (in any field)
        // This means "IT Services Mbabane" will find businesses that mention all three words
        if (termConditions.length > 0) {
            keywordOr = {
                [Op.and]: termConditions
            };
        }
        
        console.log('✓ Enhanced search conditions created for', searchTerms.length, 'term(s)');
    }

    // Sorting
    let order = [["id", "DESC"]];
    if (sort) {
        switch (sort) {
            case 'newest': order = [["id", "DESC"]]; break;
            case 'oldest': order = [["id", "ASC"]]; break;
            case 'name_asc': order = [["name_of_organization", "ASC"]]; break;
            case 'name_desc': order = [["name_of_organization", "DESC"]]; break;
            case 'relevance': 
                // When searching, sort by name to group similar results
                // In a full search engine, this would use ranking algorithms
                if (keyword && keyword.trim() !== '') {
                    order = [["name_of_organization", "ASC"]];
                } else {
                    order = [["id", "DESC"]];
                }
                break;
            default: break;
        }
    }

    const params = {
        where: { ...whereClause, ...keywordOr },
        limit,
        offset,
        page,
        order,
    };

    try {
        const msmeInfo = await BaseRepo.baseList(MSMEBusinessModel, params);
        if (!msmeInfo) {
            return res.status(400).json({ error: 'Error fetching MSME Business' });
        }
        res.status(201).json(msmeInfo);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports.loginUser = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const { email_address, password } = req.body;

    const user = await MSMEBusinessModel.findOne({ where: { email_address } });
    if (!user) {
        return res.status(400).json({ error: 'Invalid login credentials. Please check your email and password.' });
    }

    // console.log("user 1",user);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid login credentials. Please check your email and password.' });
    }
    const token = await user.generateAuthToken(); // ✅ instance method
    const userData = { ...user.toJSON(), user_type: "user" };
    res.status(200).json({ user: userData, token });

};



module.exports.forgetPasswordSendEmail = async (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    let payload;
    const email_address = req.params.email_address;

    const isEmailExist = await MSMEBusinessModel.findOne({ where: { email_address: email_address } });
    if (!isEmailExist) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp_expiry = new Date(Date.now() + 10 * 60000); // 10 minutes from now

    payload = { otp: otp, otp_expiry: otp_expiry };

    try {
        const Business = await BaseRepo.baseUpdate(MSMEBusinessModel, { email_address }, payload);
        if (!Business) {
            return res.status(400).json({ error: 'Error updating Your Password' });
        }

        // Send email to the user
        sendEmail(payload, 4, email_address);

        res.status(201).json({
            message: 'OTP sent successfully',
            data: Business
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports.forgetPasswordVerifyOTP = async (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    let payload;
    const email_address = req.params.email_address;
    const otp = req.params.otp;

    try {
        const record = await MSMEBusinessModel.findOne({ where: { email_address: email_address, otp: otp } });
        if (!record || record.otp_expiry < new Date()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
        res.status(201).json({
            message: 'OTP verified successfully',
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports.forgetPassword = async (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    let payload;
    const email_address = req.params.email_address;
    const password = req.params.password;

    console.log("email_address ==> ", email_address);
    console.log("password ==> ", password);

    const isEmailExist = await MSMEBusinessModel.findOne({ where: { email_address: email_address } });
    if (!isEmailExist) {
        return res.status(400).json({ error: 'Invalid email address' });
    }
    const hashedPassword = await MSMEBusinessModel.hashPassword(password.toString());

    payload = { password: hashedPassword, otp: null, otp_expiry: null };

    try {
        const Business = await BaseRepo.baseUpdate(MSMEBusinessModel, { email_address }, payload);
        if (!Business) {
            return res.status(400).json({ error: 'Error updating MSME Business' });
        }

        res.status(201).json({
            message: 'Reset password successfully',
            data: Business
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}