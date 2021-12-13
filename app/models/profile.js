const mongoose = require('mongoose')

const User = require('./user')

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    skills: {
        type: Array
    },
    zipCode: {
        // zip code uses string to allow for leading zeroes and to control length
        type: String,
        required: true,
        minlength: 5,
        maxlength: 5
    },
    owner: {
        // this links the user Id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // not in use at this time
    interviewQuestions: {
        type: Object
    }
})

module.exports = mongoose.model('Profile', profileSchema)
