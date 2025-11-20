const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const downloadsController = require('../controllers/downloads.contoller');

// This route is used to add a new weather category
// It requires the user to be authenticated as an admin

router.post('/add',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('description').isLength({min: 3}).withMessage('description must be at least 3 characters long'),
    body('url').notEmpty().withMessage('url is required'),
],authMiddleware.authAdmin, downloadsController.add);

router.put('/update/:id',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('description').isLength({min: 3}).withMessage('description must be at least 3 characters long'),
    body('url').notEmpty().withMessage('url is required'),
],authMiddleware.authAdmin, downloadsController.update);

router.get('/list', downloadsController.get);
router.put('/delete/:id',authMiddleware.authAdmin, downloadsController.delete);

module.exports = router;