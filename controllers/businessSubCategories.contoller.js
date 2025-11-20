const BaseRepo = require('../services/BaseRepository');
const { BusinessSubCategoriesModel } = require('../models');
const {validationResult} = require('express-validator');


module.exports.add = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }
    const payload = req.body;

    const isNameExist = await BusinessSubCategoriesModel.findOne({ where: {name: payload.name } });
    if (isNameExist) {
        return res.status(400).json({ error: 'Sub Category name already exist' });
    }
    try {
    const data = await BaseRepo.baseCreate(BusinessSubCategoriesModel, payload);
    if(!data){
        return res.status(400).json({error: 'Error creating Business Sub Categories'});
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
    const data = await BaseRepo.baseList(BusinessSubCategoriesModel, params);
    if(!data){
        return res.status(400).json({error: 'Error fetching Business Sub Categories'});
    }
    res.status(201).json(data);
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}



module.exports.getListBussinessId = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const businessCategoryId = req.params.BusinessCategorieId;

    const params = {
      searchParams: {BusinessCategorieId: businessCategoryId},
      limit: limit,
      offset: offset,
      page: page,
      order:[["id","DESC"]],
  }
  try {
    const data = await BaseRepo.baseList(BusinessSubCategoriesModel, params);
    if(!data){
        return res.status(400).json({error: 'Error fetching Business Sub Categories according to Business Category'});
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

    const isNameExist = await BusinessSubCategoriesModel.findOne({ where: {name: payload.name } });
    if (isNameExist) {
        return res.status(400).json({ error: 'Sub Category name already exist' });
    }

    try {
    const data = await BaseRepo.baseUpdate(BusinessSubCategoriesModel, {id}, payload);
    if(!data){
        return res.status(400).json({error: 'Error updating Business Sub Categories'});
    }
    res.status(201).json({
        message: 'Business Sub Categories updated successfully',
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
    const data = await BaseRepo.baseDelete(BusinessSubCategoriesModel, {id});
    if(!data){
        return res.status(400).json({error: 'Error deleting Business Sub Categories'});
    }
    res.status(201).json({
        message: 'Business Sub Categories deleted successfully',
        data: data
    });
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}

module.exports.search = async (req, res, next) => {

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
        const data = await BaseRepo.getSearchData(BusinessSubCategoriesModel,name,"name");
        if (!data) {
            return res.status(400).json({ error: 'Error fetching Business sub Categories' });
        }
        res.status(201).json(data);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}