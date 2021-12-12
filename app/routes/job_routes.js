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

// ============================================= // 
//  THESE ROUTES ARE STUBBED--NEED TO CALL DATA  //
// ============================================= // 

// GET index all jobs
router.get('/jobs', (req, res, next) => {
    res.json({message: 'Show all jobs'})
})

// GET show all jobs for a particular user

// GET a single job

// POST create a job

// PUT/PATCH (?) a job

// DELETE a job

module.exports = router