const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const adminController = require('../controllers/admin.controller');


router.post('/ragister',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters long'),
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
], adminController.ragisterAdmin);


router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password'),
], adminController.loginAdmin);


// router.get('/profile',authMiddleware.authAdmin, adminController.getProfile);

router.get('/logout',authMiddleware.authAdmin, adminController.logout);

module.exports = router;