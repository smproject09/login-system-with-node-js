// External exports
const mongoose = require('mongoose');

const peopleSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['Admin','User'],
        default: 'User'
    }
});

const People = mongoose.model('People', peopleSchema);

module.exports = People;