// External dependencies
const bcrypt = require('bcrypt');

// Internal dependencies
const User = require('../../model/people');

// Get register page
function getRegister(req, res, next){
    res.render('register');
}

// Add user
async function addUser(req, res, next) {
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    newUser = new User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword
    });

    // Save the user
    try{
        const result = await newUser.save();
        res.status(200).json({
            message: "User was added successfully."
        })
    }catch(err){
        res.status(500).json({
            errors: {
                common: { msg: "Unknown error occured!"}
            }
        })
    }

}

module.exports = {
    getRegister,
    addUser
};