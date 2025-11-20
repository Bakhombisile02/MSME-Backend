const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const teamController = require('../controllers/team.contoller');

// This route is used to add a new weather category
// It requires the user to be authenticated as an admin

router.post('/add',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('possition').isLength({min: 3}).withMessage('possition must be at least 3 characters long'),
    body('url').notEmpty().withMessage('url is required'),
],authMiddleware.authAdmin, teamController.add);

router.put('/update/:id',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('possition').isLength({min: 3}).withMessage('possition must be at least 3 characters long'),
    body('url').notEmpty().withMessage('url is required'),
],authMiddleware.authAdmin, teamController.update);


router.get('/list', teamController.get);
router.put('/delete/:id',authMiddleware.authAdmin, teamController.delete);


module.exports = router;