// this boilerplate is pulled from example_routes.js
const express = require('express')
const passport = require('passport')

// pull profile database model
const Job = require('../models/job')

// customer error messages
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

// sends 401 error
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate router
const router = express.Router()

// GET index all jobs
// won't be called by the client, only for testing
router.get('/jobs', (req, res, next) => {
    Job.find()
        .then(jobs => {
            res.status(200).json(jobs)
        })
        .catch(next)
})

// GET show all jobs for currently logged in user
router.get('/jobs/user', requireToken, (req, res, next) => {
    Job.find({owner: req.user._id})
        .then(jobs => {
            res.status(200).json(jobs)
        })
        .catch(next)
})

// POST create a job
router.post('/jobs', (req, res, next) => {
    Job.create(req.body)
        .then(createdJob => {
            res.status(201).json(createdJob.toObject())
        })
        .catch(next)
})

// GET a single job
router.get('/jobs/:jobId', requireToken, (req, res, next) => {
    // needs to include requireOwnership(?)
    Job.findOne({_id: req.params.jobId})
        .then(handle404)
        .then(job => {
            requireOwnership(req, job)
            return job
        })
        .then(job => {
            res.status(400).json(job)
        })
        .catch(next)
})

// PATCH a job

router.patch('/jobs/:jobId', requireToken, removeBlanks, (req, res, next) => {
    Job.findById(req.params.jobId)
        .then(handle404)
        .then(job => {
            requireOwnership(req, job)
            return job
        })
        .then(job => {
            return job.updateOne(req.body)
        })
        .then(() => res.sendStatus(204))
        .catch(next)
    })
    
// DELETE a job

router.delete('/jobs/:jobId', requireToken, (req, res, next) => {
    Job.findById(req.params.jobId)
        .then(handle404)
        .then(job => {
            requireOwnership(req, job)
            return job
        })
        .then(job => {
            job.deleteOne()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})


module.exports = router