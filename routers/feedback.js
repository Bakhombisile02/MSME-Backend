const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const FeedbackController = require('../controllers/feedback.controller');

// This is used to add FAQs to the database
// It requires the user to be authenticated as an admin

router.post('/add',[
    body('feedbackType').isLength({min: 3}).withMessage('feedback Type must be at least 3 characters long'),
    body('name').isLength({min: 3}).withMessage('name must be at least 3 characters long'),
    body('mobile').isLength({min: 3}).withMessage('Mobile must be at least 8 characters long'),
    body('email').isLength({min: 3}).withMessage('Email must be at least 3 characters long'),
    body('message').isLength({min: 3}).withMessage('Discription must be at least 3 characters long'),
], FeedbackController.add);

// router.put('/update/:id',[
//     body('name').isLength({min: 3}).withMessage('name must be at least 3 characters long'),
//     body('description').isLength({min: 3}).withMessage('description must be at least 3 characters long'),
//     body('url').isLength({min: 3}).withMessage('url must be at least 3 characters long'),
// ] ,authMiddleware.authAdmin, FeedbackController.update);

// This is used in Mobile app to get the list of FAQs
router.get('/list', authMiddleware.authAdmin, FeedbackController.get);

// router.put('/delete/:id',authMiddleware.authAdmin, FeedbackController.delete);

module.exports = router;
