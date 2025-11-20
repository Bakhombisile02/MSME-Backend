const BaseRepo = require('../services/BaseRepository');
const { ServiceProviderCategoriesModel } = require('../models');
const {validationResult} = require('express-validator');


module.exports.add = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;

    try {
    const data = await BaseRepo.baseCreate(ServiceProviderCategoriesModel, payload);
    if(!data){
        return res.status(400).json({error: 'Error creating Service Provider Categories'});
    }
    res.status(201).json(data);
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}


module.exports.get = async (req, res, next) => {

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
    const data = await BaseRepo.baseList(ServiceProviderCategoriesModel, params);
    if(!data){
        return res.status(400).json({error: 'Error fetching Service Provider Categories'});
    }
    res.status(201).json(data);
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}


module.exports.update = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;
    const id = req.params.id;

    try {
    const data = await BaseRepo.baseUpdate(ServiceProviderCategoriesModel, {id}, payload);
    if(!data){
        return res.status(400).json({error: 'Error updating Service Provider Categories'});
    }
    res.status(201).json({
        message: 'Service Provider Categories updated successfully',
        data: data
    });
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}


module.exports.delete = async (req, res, next) => {

    const id = req.params.id;

    try {
    const data = await BaseRepo.baseDelete(ServiceProviderCategoriesModel, {id});
    if(!data){
        return res.status(400).json({error: 'Error deleting Service Provider Categories'});
    }
    res.status(201).json({
        message: 'Service Provider Categories deleted successfully',
        data: data
    });
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}




module.exports.searchServiceProviderCategories = async (req, res, next) => {

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
        const WeatherDataRequest = await BaseRepo.getSearchData(ServiceProviderCategoriesModel,name,"name");
        if (!WeatherDataRequest) {
            return res.status(400).json({ error: 'Error fetching Weather Data Request' });
        }
        res.status(201).json(WeatherDataRequest);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}