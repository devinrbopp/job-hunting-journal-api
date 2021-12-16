const mongoose = require('mongoose')

const Job = require('./job')
const User = require('./user')

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        maxlength: 20,
        minlength: 2,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    notes: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Task', taskSchema)