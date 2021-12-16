const mongoose = require('mongoose') 

const taskSchema = require('./task')

const User = require('./user')

const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    zipCode: {
        // zips are strings to allow for leading zeroes and to control length
        type: String,
        minlength: 5,
        maxlength: 5
    },
    applied: {
        type: Boolean,
        default: false
    },
    jobDescription: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Job', jobSchema)
