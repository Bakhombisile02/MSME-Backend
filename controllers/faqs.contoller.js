const BaseRepo = require('../services/BaseRepository');
const { FAQModel } = require('../models');
const {validationResult} = require('express-validator');


module.exports.addFAQs = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;

    try {
    const Faqs = await BaseRepo.baseCreate(FAQModel, payload);
    if(!Faqs){
        return res.status(400).json({error: 'Error creating FAQs'});
    }
    res.status(201).json(Faqs);
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}


module.exports.getFAQs = async (req, res, next) => {

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
    const Faqs = await BaseRepo.baseList(FAQModel, params);
    if(!Faqs){
        return res.status(400).json({error: 'Error fetching FAQs'});
    }
    res.status(201).json(Faqs);
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}



module.exports.updateFAQs = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;
    const id = req.params.id;

    try{
    const Faqs = await BaseRepo.baseUpdate(FAQModel, {id}, payload);
    if(!Faqs){
        return res.status(400).json({error: 'Error updating FAQs'});
    }
    res.status(201).json({
        message: 'FAQs updated successfully',
        data: Faqs
    });
}
    catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
    }
}


module.exports.deleteFAQs = async (req, res, next) => {

    const id = req.params.id;

    try{
    const Faqs = await BaseRepo.baseDelete(FAQModel, {id});
    if(!Faqs){
        return res.status(400).json({error: 'Error deleting FAQs'});
    }
    res.status(201).json({
        message: 'FAQs deleted successfully',
        data: Faqs
    });
}
    catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
    }
}