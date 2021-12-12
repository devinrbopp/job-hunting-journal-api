const mongoose = require('mongoose')

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
    tasks: {
        type: Array
    },
    applied: {
        type: Boolean,
        default: false
    },
    jobDescription: {
        type: String
    },
    owner: {
        // user id
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Job', jobSchema)
