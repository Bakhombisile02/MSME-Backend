const BaseRepo = require('../services/BaseRepository');
const { BusinessCategoriesModel } = require('../models');
const {validationResult} = require('express-validator');
const { Op } = require('sequelize');


module.exports.addWeatherCategories = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;

    const isNameExist = await BusinessCategoriesModel.findOne({ where: {name: payload.name } });
    if (isNameExist) {
        return res.status(400).json({ error: 'Category name already exist' });
    }
    try {
    const BusinessCategories = await BaseRepo.baseCreate(BusinessCategoriesModel, payload);
    if(!BusinessCategories){
        return res.status(400).json({error: 'Error creating Business Categories'});
    }
    res.status(201).json(BusinessCategories);
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}


module.exports.getWeatherCategories = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const params = {
      searchParams: {},
      limit: limit,
      offset: offset,
      page: page,
      order:[["id","DESC"]],
  }
  try {
    const BusinessCategories = await BaseRepo.baseList(BusinessCategoriesModel, params);
    if(!BusinessCategories){
        return res.status(400).json({error: 'Error fetching Business Categories'});
    }
    res.status(201).json(BusinessCategories);
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}


module.exports.updateWeatherCategories = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;
    const id = req.params.id;

    // FIX: Exclude the current record from duplicate name check
    const isNameExist = await BusinessCategoriesModel.findOne({ 
        where: {
            name: payload.name,
            id: { [Op.ne]: id }  // Not equal to current ID
        } 
    });
    if (isNameExist) {
        return res.status(400).json({ error: 'Category name already exist' });
    }

    try {
    const BusinessCategories = await BaseRepo.baseUpdate(BusinessCategoriesModel, {id}, payload);
    if(!BusinessCategories){
        return res.status(400).json({error: 'Error updating Business Categories'});
    }
    res.status(201).json({
        message: 'Business Categories updated successfully',
        data: BusinessCategories
    });
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}


module.exports.deleteWeatherCategories = async (req, res, next) => {

    const id = req.params.id;

    try {
    const BusinessCategories = await BaseRepo.baseDelete(BusinessCategoriesModel, {id});
    if(!BusinessCategories){
        return res.status(400).json({error: 'Error deleting Business Categories'});
    }
    res.status(201).json({
        message: 'Business Categories deleted successfully',
        data: BusinessCategories
    });
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}


module.exports.searchBusinessCategories = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const name = req.query.name || null;

    const params = {
        searchParams: {},
        limit: limit,
        offset: offset,
        page: page,
        order: [["id", "DESC"]],
    }

    console.log(name);

    try {
        const WeatherDataRequest = await BaseRepo.getSearchData(BusinessCategoriesModel,name,"name");
        if (!WeatherDataRequest) {
            return res.status(400).json({ error: 'Error fetching Business Categories' });
        }
        res.status(201).json(WeatherDataRequest);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
