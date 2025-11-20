const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const businessSubCategoriesController = require('../controllers/businessSubCategories.contoller');

// This route is used to add a new weather category
// It requires the user to be authenticated as an admin

router.post('/add',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('BusinessCategorieId').notEmpty().withMessage('Business Categorie Id is required'),
],authMiddleware.authAdmin, businessSubCategoriesController.add);

router.put('/update/:id',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('BusinessCategorieId').notEmpty().withMessage('Business Categorie Id is required'),
],authMiddleware.authAdmin, businessSubCategoriesController.update);


router.get('/list', businessSubCategoriesController.get);

router.get('/list-according-to-business-id/:BusinessCategorieId', businessSubCategoriesController.getListBussinessId);


router.put('/delete/:id',authMiddleware.authAdmin, businessSubCategoriesController.delete);

router.get('/search_by_name', businessSubCategoriesController.search);

module.exports = router;