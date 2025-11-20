const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const MSMEBusinessController = require('../controllers/msmeBusiness.contoller');

// This route is used to add a new weather category
// It requires the user to be authenticated as an admin

// Done 
router.post('/add',[
    body('name_of_organization').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
], MSMEBusinessController.add);


router.post('/login',[
    body('email_address').isEmail().withMessage('Please enter a valid email'),
    body('password'),
], MSMEBusinessController.loginUser);

// check if email exists
router.get('/check-email-exists/:email_address', MSMEBusinessController.checkEmailExists);


router.put('/update/:id',[
    body('name_of_organization').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
],authMiddleware.authUser, MSMEBusinessController.update);

// Done 
router.get('/list', MSMEBusinessController.get);

router.get('/list-web/:is_verified', MSMEBusinessController.getWeb);

// Old API for getting MSME list according to category ID
router.get('/list-according-category-id/:business_category_id', MSMEBusinessController.getListAccordingToCategoryId);

// New API for getting MSME list according to category ID with pagination
router.get('/list-according-category-id-v2/:business_category_id', MSMEBusinessController.getListAccordingToCategoryIdV2);


router.get('/msme-details/:id', MSMEBusinessController.getMSMEDetails);

// Verify MSME Business
router.put('/verify-msme/:id',[
],authMiddleware.authAdmin, MSMEBusinessController.verifyMSME);


router.get('/search-by-name/:name_of_organization',[
], MSMEBusinessController.searchByName);

router.get('/search-by-region/:region',[
], MSMEBusinessController.searchByRegion);

router.get('/filters',[
], MSMEBusinessController.filtersAPI);


router.put('/delete/:id',authMiddleware.authAdmin, MSMEBusinessController.delete);


// This API is used to send an OTP to the user's email address for password reset
router.put('/forget-password-send-otp/:email_address',[
], MSMEBusinessController.forgetPasswordSendEmail);

// This API is used to verify the OTP sent to the user's email address for password reset
router.put('/forget-password-otp-verify/:email_address/:otp',[
], MSMEBusinessController.forgetPasswordVerifyOTP);

// This API is used to reset the user's password after verifying the OTP
router.put('/forget-password/:email_address/:password',[
], MSMEBusinessController.forgetPassword);


module.exports = router;