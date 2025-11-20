const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const businessCategoriesController = require('../controllers/businessCategories.contoller');

// This route is used to add a new weather category
// It requires the user to be authenticated as an admin

router.post('/add',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('icon_url').notEmpty().withMessage('url is required'),
],authMiddleware.authAdmin, businessCategoriesController.addWeatherCategories);

router.put('/update/:id',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('icon_url').notEmpty().withMessage('url is required'),
],authMiddleware.authAdmin, businessCategoriesController.updateWeatherCategories);


router.get('/list', businessCategoriesController.getWeatherCategories);
router.put('/delete/:id',authMiddleware.authAdmin, businessCategoriesController.deleteWeatherCategories);

router.get('/search_by_name', businessCategoriesController.searchBusinessCategories);


module.exports = router;