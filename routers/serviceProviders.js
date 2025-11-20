const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const serviceProvidersController = require('../controllers/serviceProviders.contoller');

// This route is used to add a new weather category
// It requires the user to be authenticated as an admin


router.post('/add',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('mobile').isLength({min: 6}).withMessage('Mobile must be at least 6 characters long'),
    body('address').isLength({min: 3}).withMessage('Address must be at least 3 characters long'),
    body('business_name').isLength({min: 3}).withMessage('Business Name must be at least 3 characters long'),
    body('business_description').isLength({min: 3}).withMessage('Business Description must be at least 3 characters long'),
    body('url').notEmpty().withMessage('url is required'),
    body('categorie_id').notEmpty().withMessage('Category ID is required'),
    body('categorie_name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
],authMiddleware.authAdmin, serviceProvidersController.add);

router.put('/update/:id',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('mobile').isLength({min: 6}).withMessage('Mobile must be at least 6 characters long'),
    body('address').isLength({min: 3}).withMessage('Address must be at least 3 characters long'),
    body('business_name').isLength({min: 3}).withMessage('Business Name must be at least 3 characters long'),    body('business_description').isLength({min: 3}).withMessage('Business Description must be at least 3 characters long'),
    body('url').notEmpty().withMessage('url is required'),
    body('categorie_id').notEmpty().withMessage('Category ID is required'),
    body('categorie_name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
],authMiddleware.authAdmin, serviceProvidersController.update);

router.get('/list', serviceProvidersController.get);
router.get('/list/:categorie_id', serviceProvidersController.getById);
router.put('/delete/:id',authMiddleware.authAdmin, serviceProvidersController.delete);

router.get('/search_by_name', serviceProvidersController.searchServiceProvider);


module.exports = router;