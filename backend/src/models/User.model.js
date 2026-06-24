const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
    },
    lastName:{
        type: String,
    },
    email:{
        type: String,
    },
    collegeName:{
        type: String,
    },
    branch:{
        type: String,
    },
    currentYear:{
        type: String,
    },
    gYear:{
        type: String,
    },
    password:{
        type: String,
    },
    roadmap:{
        type: Array,
    },
})

module.exports = mongoose.model('user' , userSchema);