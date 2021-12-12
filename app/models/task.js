const mongoose = require('mongoose')

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
    }
})

// subdocuments do not a require a model! only a schema
module.exports = taskSchema