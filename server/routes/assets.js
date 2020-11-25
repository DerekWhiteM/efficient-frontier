const router = require('express').Router()
let Asset = require('../models/asset.model')

// Create

router.route('/add').post((req, res) => {
  const assetClass  = req.body.assetClass
  const name        = req.body.name
  const ticker      = req.body.ticker
  const prices      = req.body.prices

  const newAsset = new Asset({
    assetClass,
    name,
    ticker,
    prices
  })

  newAsset.save()
  .then(() => res.json('Asset added!'))
  .catch(err => res.status(400).json('Error: ' + err))
})

// Read

router.route('/').get((req, res) => {
  Asset.find({})
  .then(assets => res.json(assets))
  .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/get/:id').get((req, res) => {
  Asset.findById(req.params.id)
    .then(asset => res.json(asset))
    .catch(err => res.status(400).json('Error: ' + err))
})



router.route('/get').post((req, res) => {
  let userAssets = req.body
  let query = []
  let response = {
    assets: [],
    otherAssets: []
  }
  userAssets.map(e => {
    let userAsset = {
      ticker: e
    }
    query.push(userAsset)
  })
  
  Asset.find({})
  .then(allAssets => {

    let removed = []

    for (let i = 0; i < allAssets.length; i++) {
      removed.push(allAssets[i])
      for (let j = 0; j < userAssets.length; j++) {
        if (allAssets[i].ticker == userAssets[j]) { 
          response.assets.push(allAssets[i])
          removed.pop()
        }
      }
    }
    response.otherAssets = removed
    res.send(response)
  })
  .catch(err => res.status(400).json('Error: ' + err))

})



// Update

router.route('/update/:id').post((req, res) => {
  Asset.findById(req.params.id)
    .then(asset => {
      asset.name        = String(req.body.name)
      asset.ticker      = Number(req.body.ticker)
      asset.prices      = Array(req.body.risk)

      asset.save()
        .then(() => res.json('Asset updated!'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
});

// Delete

router.route('/:id').delete((req, res) => {
  Asset.findByIdAndDelete(req.params.id)
    .then(() => res.json('Asset deleted.'))
    .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router