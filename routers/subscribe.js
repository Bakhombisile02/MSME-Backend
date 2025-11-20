const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const subscribeController = require('../controllers/subscribe.contoller');

// This route is used to add a new weather category
// It requires the user to be authenticated as an admin

router.post('/add',[
    body('email').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
], subscribeController.add);

router.get('/list',authMiddleware.authAdmin, subscribeController.get);

module.exports = router;