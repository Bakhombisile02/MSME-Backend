const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const FAQsController = require('../controllers/faqs.contoller');

// This is used to add FAQs to the database
// It requires the user to be authenticated as an admin

router.post('/add',[
    body('question').isLength({min: 3}).withMessage('question must be at least 3 characters long'),
    body('answer').isLength({min: 3}).withMessage('answer must be at least 3 characters long'),
],authMiddleware.authAdmin, FAQsController.addFAQs);

router.put('/update/:id',[
    body('question').isLength({min: 3}).withMessage('question must be at least 3 characters long'),
    body('answer').isLength({min: 3}).withMessage('answer must be at least 3 characters long'),
] ,authMiddleware.authAdmin, FAQsController.updateFAQs);

// This is used in Mobile app to get the list of FAQs
router.get('/list', FAQsController.getFAQs);

router.put('/delete/:id',authMiddleware.authAdmin, FAQsController.deleteFAQs);

module.exports = router;
