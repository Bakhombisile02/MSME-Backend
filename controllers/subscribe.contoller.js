const BaseRepo = require('../services/BaseRepository');
const { SubscribeModel } = require('../models');
const {validationResult} = require('express-validator');


module.exports.add = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;

    try {
    const data = await BaseRepo.baseCreate(SubscribeModel, payload);
    if(!data){
        return res.status(400).json({error: 'Error creating Subscribe'});
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
    const data = await BaseRepo.baseList(SubscribeModel, params);
    if(!data){
        return res.status(400).json({error: 'Error fetching Subscribes'});
    }
    res.status(201).json(data);
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}
