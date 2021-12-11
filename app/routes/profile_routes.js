// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
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


// GET index route displays all profiles
router.get('/profiles', (req, res, next) => {
    Profile.find()
        .then((profiles) => {
            res.status(200).json(profiles)
        })
        // .then((profiles) => res.status(200).json({ profiles: profiles }))
        .catch(next)
})

// POST create a profile
router.post('/profiles', (req, res, next) => {
    Profile.create(req.body)
        .then(createdProfile => {
            res.status(201).json({ profile: createdProfile.toObject() })
        })
        .catch(next)
})

module.exports = router