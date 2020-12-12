const router = require('express').Router()
let User = require('../models/user.model')
let UserSession = require('../models/user-session.model')
const deleteUserData = require('../deleteUserData.js')


// Get User Info
router.route('/info').get((req, res) => {
    const userId = req.query.userId
    User.findById(userId)
    .then(userInfo => {
        res.send(userInfo)
    })
})


// Register Account
router.route('/register').post((req, res) => { 
    const newUser = new User()

    newUser.username = req.body.username
    newUser.password = newUser.generateHash(req.body.password)

    User.find({
        username: req.body.username
    }, (err, users) => {
        if (users[0]) {
            // username already exists
        } else {
            newUser.save((err, user) => {
                if (err) {
                    console.log('Error on register')
                } else {
                    const newUserSession = new UserSession()
                    newUserSession.userId = user._id
                    newUserSession.save()
                    .then(doc => res.json({
                        success: true,
                        user: newUserSession.userId,
                        token: doc._id
                    }))
                }
            })
        }
    })
})

// Guest Account
router.route('/guest').get((req, res) => {
    const newUser = new User()
    newUser.isGuest = true

    newUser.save((err, user) => {
        if (err) {
            // error
        } else {
            const newUserSession = new UserSession()
            newUserSession.userId = user._id
            newUserSession.save()
            .then(doc => res.json({
                message: 'guest signed in',
                user: newUserSession.userId,
                token: doc._id
            }))         
        }
    })
})

// Delete Account
router.route('/delete').delete((req, res) => {
    User.deleteOne({
        _id: req.body.user_id
    }, () => {
        deleteUserData(req.body.user_id).then(() => {
            return res.send({
                success: true,
                message: "User deleted"
            })
        })
    })
})

// Sign In
router.route('/signin').post((req, res) => { 

    const username = req.body.username
    const password = req.body.password
    
    User.find({
        username: username
    }, (err, users) => {

        if (err) {
            // error
            return
        }

        const user = users[0]
        if (user && user.validPassword(password)) {
            const newUserSession = new UserSession()

            newUserSession.userId = user._id
            newUserSession.save()
                .then(doc => res.json({
                    success: true,
                    user: newUserSession.userId,
                    token: doc._id
                }))
                .catch(err => res.status(400).json('Error: ' + err))
        } else {
            res.json({ success: false })
            return
        }

    })
})

// Verify Request
router.route('/verify').get((req, res) => {
    const token = req.query.token
    UserSession.findOne({
        _id: token
    }, (err, session) => {    
        if (err) {
            console.log(err)
        }
        if (!session) {
            // not logged in
        } else {
            return res.send({
                message: 'Good',
                success: true,
            })
        }
    })
})

// Log Out
router.route('/logout').delete((req, res) => {
    const token = req.body.token

    UserSession.deleteOne({
        _id: token
    })
    .then(() => {
        return res.json({
            message: 'done'
        })
    })
})

// Update Assets
router.route('/assets').post((req, res) => {
    const userId = req.body.userId
    let assets = req.body.assets

    for (let i = 0; i < assets.length; i++) {
        assets[i] = assets[i].ticker
    }

    User.findOneAndUpdate({ _id: userId }, { assets: assets })
        .then(() => { return res.end() })
})

module.exports = router;