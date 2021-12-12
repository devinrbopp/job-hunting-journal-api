// this boilerplate is pulled from example_routes.js
const express = require('express')
const passport = require('passport')

// pull job database model because all tasks are subdocs of jobs
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

// ===================== //
//  ROUTES WILL GO HERE  //
// ===================== //

// reference mongoose-relationships-server comment_routes.js for examples


module.exports = router