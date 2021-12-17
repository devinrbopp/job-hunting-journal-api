// this boilerplate is pulled from example_routes.js
const express = require('express')
const passport = require('passport')

const Task = require('../models/task')
const Job = require('../models/job')

// customer error messages
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

// sends 401 error
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const job = require('../models/job')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate router
const router = express.Router()

// ===================== //
//  ROUTES WILL GO HERE  //
// ===================== //

// get all tasks for the current user
router.get('/tasks', requireToken, (req, res, next) => {
    Task.find({owner: req.user._id})
        // .populate('jobId', ['company', 'jobTitle'])
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(next)
})

// post create
router.post('/tasks', requireToken, (req,res,next) => {
    Task.create(req.body)
        .then(createdTask => {
            res.status(201).json({ task: createdTask.toObject() })
        })
        .catch(next)
})

router.patch('/tasks/:taskId', requireToken, removeBlanks, (req, res, next) => {
    Task.findById(req.params.taskId)
        .then(handle404)
        .then(task => {
            requireOwnership(req, task)
            return task
        })
        .then(task => {
            task.set(req.body)
            return task.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

router.delete('/tasks/delete-all/:jobId', requireToken, (req, res, next) => {
    // console.log('THIS IS JUST REQ.PARAMS',req.params)
    // console.log('THIS IS REQ.PARAMS.JOBID',req.params.jobId)
    // Task.remove({jobId:req.params.jobId})
    Task.find({jobId:req.params.jobId})
        .then(handle404)
        .then(tasks => {
            console.log('this is tasks before you require ownership:', tasks)
            // requireOwnership(req, tasks)
            return tasks
        })
        .then(tasks => {
            console.log('this is tasks before you remove them', tasks)
            tasks.forEach( task => {
                task.remove()
            })
            return 'deleted'
            // tasks.deleteMany()
        })
        .then(() => {
            res.sendStatus(204)
        })
        .catch(next)
})

router.delete('/tasks/:taskId', requireToken, (req, res, next) => {
    Task.findById(req.params.taskId)
        .then(handle404)
        .then(task => {
            requireOwnership(req, task)
            return task
        })
        .then(task => {
            task.deleteOne()
        })
        .then(() => {
            res.sendStatus(204)
        })
        .catch(next)
})


module.exports = router