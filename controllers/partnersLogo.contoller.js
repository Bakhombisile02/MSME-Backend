const BaseRepo = require('../services/BaseRepository');
const { PartnersLogoModel } = require('../models');
const {validationResult} = require('express-validator');


module.exports.add = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;

    try {
    const PartnersLogo = await BaseRepo.baseCreate(PartnersLogoModel, payload);
    if(!PartnersLogo){
        return res.status(400).json({error: 'Error creating Partners Logo'});
    }
    res.status(201).json(PartnersLogo);
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
    const PartnersLogo = await BaseRepo.baseList(PartnersLogoModel, params);
    if(!PartnersLogo){
        return res.status(400).json({error: 'Error fetching Partners Logo'});
    }
    res.status(201).json(PartnersLogo);
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
    const PartnersLogo = await BaseRepo.baseUpdate(PartnersLogoModel, {id}, payload);
    if(!PartnersLogo){
        return res.status(400).json({error: 'Error updating Partners Logo'});
    }
    res.status(201).json({
        message: 'Partners Logo updated successfully',
        data: PartnersLogo
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
    const PartnersLogo = await BaseRepo.baseDelete(PartnersLogoModel, {id});
    if(!PartnersLogo){
        return res.status(400).json({error: 'Error deleting Partners Logo'});
    }
    res.status(201).json({
        message: 'Partners Logo deleted successfully',
        data: PartnersLogo
    });
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}