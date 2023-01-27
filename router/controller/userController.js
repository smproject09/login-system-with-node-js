// Internal dependencies
const Users = require('../../model/people');

// Get all user
function getUser(req, res, next){
    Users.find((err, data) => {
        if(err){
            next(err);
        }else{
            res.render('users',{users: data});
        }
    });
}

// Remove user
async function removeUser(req, res, next){
    try{
        await Users.deleteOne({_id: req.params.id});
        res.status(200).json({message: 'User deleted successful'});
    }catch(err){
        res.status(500).json({errors: {common: {msg: 'Could not delete the user!'}}});
    }
}

// Update user role
async function updateUser(req, res, next){
    try{
        let userRole = req.body.userRole == 'Admin' ? "User" : "Admin";
        await Users.updateOne({_id: req.body.id},{
            $set: {role: userRole}
        });
        res.status(200).json({message: 'Change role successful'});
    }catch(err){
        res.status(500).json({errors: {common: {msg: 'Role could not change!'}}});
    }
}

module.exports = {
    getUser,
    removeUser,
    updateUser
};