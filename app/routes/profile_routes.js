// this boilerplate is pulled from example_routes.js
const express = require('express')
const passport = require('passport')

// pull profile database model
const Profile = require('../models/profile')

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


// GET - index route displays all profile document
router.get('/profiles', (req, res, next) => {
    Profile.find()
        .then((profiles) => {
            res.status(200).json(profiles)
        })
        // .then((profiles) => res.status(200).json({ profiles: profiles }))
        .catch(next)
})

// POST - create a profile document
router.post('/profiles', (req, res, next) => {
    Profile.create(req.body)
        .then(createdProfile => {
            res.status(201).json({ profile: createdProfile.toObject() })
        })
        .catch(next)
})

// ============================================================= //
//  ROUTES BELOW NEED TO BE ADDED OR HAVE ONLY BEEN STUBBED OUT  //
// ============================================================= //

// GET - show a single profile document
router.get('/profiles/:id', (req, res, next) => {
    res.json({message: 'Show a single profile document'})
})


// PUT/PATCH - update a profile document
// I don't know if this should be put or patch yet--if you figure it out go for it! - Devin
router.patch('/profiles/:id', (req, res, next) => {
    res.json({message: 'Update a profile document'})
})

// DELETE - show a single profile document
router.delete('/profiles/:id', (req, res, next) => {
    res.json({message: 'Delete a profile document'})
})

module.exports = router