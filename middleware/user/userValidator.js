// External dependencies
const {check, validationResult} = require('express-validator');
const createError = require('http-errors');

// Internal dependencies
const User = require('../../model/people');

// Validator
const addUserValidator = [
    check('name')
        .isLength({min: 1})
        .withMessage('Name is required!')
        .trim(),
    
    check('email')
        .isEmail()
        .withMessage('Invalid email id.')
        .trim()
        .custom(async (value) => {
            try{
                const user = await User.findOne({email: value});
                if(user){
                    throw createError('Email already is use!');
                }
            }catch(err){
                throw createError(err.message);
            }
        }),
    
    check('phone')
        .isMobilePhone()
        .withMessage('Phone number is required!')
        .custom(async (value) => {
            try{
                const user = await User.findOne({phone: value});
                if(user){
                    throw createError('Phone number already is use!');
                }
            }catch(err){
                throw createError(err.message);
            }
        }),
        
    check('password')
        .isStrongPassword()
        .withMessage('Password must be at least 8 characters long & should contiain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol'),
    
];

// handle validator error
const addUserValidatorHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedError = errors.mapped();
    if(Object.keys(mappedError).length === 0){
        next();
    }else{
        res.status(500).json({ errors: mappedError});
    }
}

module.exports = {
    addUserValidator,
    addUserValidatorHandler
};