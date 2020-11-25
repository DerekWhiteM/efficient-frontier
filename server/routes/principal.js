const router = require('express').Router()
let Principal = require('../models/principal.model')

// Add principal
router.route('/add').post((req, res) => {
    const user_id = String(req.body.user_id)
    const value = Number(req.body.value)
  
    const newPrincipal = new Principal({
      user_id, value
    })
  
    newPrincipal.save()
    .then(() => res.json('Principal added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

// Fetch principal
router.route('/').get((req, res) => {
    Principal.findOne({
      user_id: req.query.user_id
    })
    .then(principal => {
      res.json(principal)
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

// Update principal
router.route('/update').post((req, res) => {
    Principal.findOne({
      user_id: req.body.user_id
    })
    .then(principal => {
      principal.value = Number(req.body.value)
      principal.save()
        .then(() => res.json('Principal updated!'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

// Delete principal
router.route('/delete').delete((req, res) => {
  Principal.deleteOne({
    user_id: req.body.user_id
  })
  .then(() => {
    res.json('Principal deleted')
    console.log('Principal deleted')
  })
})

module.exports = router