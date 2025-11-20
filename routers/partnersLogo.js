const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const partnersLogoController = require('../controllers/partnersLogo.contoller');

// This route is used to add a new weather category
// It requires the user to be authenticated as an admin

router.post('/add',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('icon_url').notEmpty().withMessage('url is required'),
],authMiddleware.authAdmin, partnersLogoController.add);

router.put('/update/:id',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('icon_url').notEmpty().withMessage('url is required'),
],authMiddleware.authAdmin, partnersLogoController.update);


router.get('/list', partnersLogoController.get);
router.put('/delete/:id',authMiddleware.authAdmin, partnersLogoController.delete);


module.exports = router;