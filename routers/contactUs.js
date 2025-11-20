const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const ContactUsController = require('../controllers/contactus.controller');

// This is used to add FAQs to the database
// It requires the user to be authenticated as an admin

router.post('/add',[
    body('name').isLength({min: 3}).withMessage('name must be at least 3 characters long'),
    body('mobile').isLength({min: 3}).withMessage('Mobile must be at least 8 characters long'),
    body('email').isLength({min: 3}).withMessage('Email must be at least 3 characters long'),
    body('subject').isLength({min: 3}).withMessage('Subject must be at least 3 characters long'),
    body('message').isLength({min: 3}).withMessage('Discription must be at least 3 characters long'),
], ContactUsController.add);

// router.put('/update/:id',[
//     body('name').isLength({min: 3}).withMessage('name must be at least 3 characters long'),
//     body('description').isLength({min: 3}).withMessage('description must be at least 3 characters long'),
//     body('url').isLength({min: 3}).withMessage('url must be at least 3 characters long'),
// ] ,authMiddleware.authAdmin, FeedbackController.update);

// This is used in Mobile app to get the list of FAQs
router.get('/list', ContactUsController.get);

// router.put('/delete/:id',authMiddleware.authAdmin, FeedbackController.delete);

module.exports = router;
