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
        .populate('jobId', ['company', 'jobTitle'])
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(next)
})

// post create
router.post('/tasks', requireToken, (req,res,next) => {
    Task.create(req.body)
        .then(createdTask => {
            res.status(201).json(createdTask.toObject())
        })
        .catch(next)
})

// get all tasks for a specific job

// GET all tasks for current user
// router.get('/tasks', requireToken, (req, res, next) => {
//     Job.find({owner: req.user._id})
//         .then(jobs => {
//             let tasks = []
//             jobs.forEach(job => {
//                 job.tasks.forEach(task => {
//                     tasks = [...tasks, task]
//                 })
//             })
//             return tasks.map(task => task.toObject())
//         })
//         .then(tasks => {
//             res.status(200).json(tasks)
//         })
// })

// // POST new task
// router.post('/tasks/:jobId', requireToken, removeBlanks, (req, res, next) => {
//     Job.findById(req.params.jobId)
//         .then(handle404)
//         .then(job => {
//             requireOwnership(req, job)
//             return job
//         })
//         .then(job => {
//             job.tasks.push(req.body)
//             return job.save()
//         })
//         .then(job => {
//             res.status(201).json(job.toObject())
//         })
//         .catch(next)
// })
// //  Patch a task
// /* router.patch('/tasks/:jobId/:taskId', requireToken, removeBlanks, (req, res, next) => {
//     Job.findById(req.params.jobId)
//         .then(handle404)
//         .then(job => {
//             requireOwnership(req, job)
//             return job
//         })
//         .then(job => {
//             return job.tasks.findById(req.params.taskId)
//         })
//         .then(task =>{
//             task.updateOne(req.body)
//         })
//         .then(() => res.sendStatus(204))
//         .catch(next)
//     }) */

//     //  Patch a task
// router.patch('/tasks/:jobId/:taskId', requireToken, removeBlanks, (req, res, next) => {
//     Job.findById(req.params.jobId)
//         .then(handle404)
//         .then(job => {
//             requireOwnership(req, job)
//             return job
//         })
//         .then(job => {
//             const task = job.tasks.id(req.params.taskId)
//             task.set(req.body)
//             return job.save()
//         })
//         .then(() => res.sendStatus(204))
//         .catch(next)
// })

// // DELETE a task
// router.delete('/tasks/:jobId/:taskId', requireToken, (req, res, next) => {
//     Job.findById(req.params.jobId)
//         .then(handle404)
//         .then(job => {
//             job.tasks.pull(req.params.taskId)
//             return job.save()
//         })
//         .then(() => {
//             res.sendStatus(204)
//         })
//         .catch(next)
// })

module.exports = router