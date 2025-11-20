const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AdminModel, MSMEBusinessModel} = require('../models');



module.exports.authUser = async (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({error: 'Unauthorized 1'});
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await MSMEBusinessModel.findByPk(decodedToken.id);
        if(!user){
            return res.status(401).json({error: 'Unauthorized 3'});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({error: 'Unauthorized 4'});
    }
}

module.exports.authAdmin = async (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const Admin = await AdminModel.findByPk(decodedToken.id);
        if(!Admin){
            return res.status(401).json({ error: 'Unauthorized: Admin not found' });
        }
        req.Admin = Admin;
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
}