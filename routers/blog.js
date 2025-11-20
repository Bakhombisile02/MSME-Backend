const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const blogController = require('../controllers/blog.contoller');

// This route is used to add a new weather category
// It requires the user to be authenticated as an admin

router.post('/add',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('description'),
],authMiddleware.authAdmin, blogController.add);

router.put('/update/:id',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('description'),

],authMiddleware.authAdmin, blogController.update);

router.get('/list', blogController.get);

router.get('/list/:id', blogController.getById);


router.put('/delete/:id',authMiddleware.authAdmin, blogController.delete);


module.exports = router;