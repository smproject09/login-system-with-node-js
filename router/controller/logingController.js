// External dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

// Ineternal depedencies
const Users = require('../../model/people');

function getLoging(req, res, next){
    res.render('index');
}

async function login(req, res, next){
    try{
        const user = await Users.findOne({
            $or: [{email: req.body.username}, {phone: req.body.username}]
        });

        if(user && user._id){
            const isValidPassword = await bcrypt.compare(
                req.body.password, user.password
            );

            if(isValidPassword){
                const userObject = {
                    username: user.name,
                    phone: user.phone,
                    email: user.email,
                    role: user.role,
                };

                // Generate token
                const token = jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY
                });

                // Set cookie
                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.JWT_EXPIRY,
                    httpOnly: true,
                    signed: true
                });

                // Set loggedIn user details
                res.locals.loggedInUser = userObject;

                res.render('dashboard');

            }else{
                throw createError('Login failed! Please try again.');
            }
        }else{
            throw createError('Login failed! Please try again.');
        }
    }catch(err){
        res.render('index', {
            data: req.body.username,
            errors: { common: { msg: err.message}}
        });
    }
}

// Logout
function logout(req, res){
    res.clearCookie(process.env.COOKIE_NAME);
    res.send('Logged out.');
}

module.exports = {
    getLoging,
    login,
    logout
};