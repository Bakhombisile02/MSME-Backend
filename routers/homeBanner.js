const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const homeBannerController = require('../controllers/homeBanner.contoller');

// This route is used to add a new weather category
// It requires the user to be authenticated as an admin

router.post('/add',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('description'),
    body('image_url').notEmpty().withMessage('url is required'),
    body('url'),
],authMiddleware.authAdmin, homeBannerController.add);

router.put('/update/:id',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('description'),
    body('image_url').notEmpty().withMessage('url is required'),
    body('url'),
],authMiddleware.authAdmin, homeBannerController.update);


router.get('/list', homeBannerController.get);
router.put('/delete/:id',authMiddleware.authAdmin, homeBannerController.delete);


module.exports = router;