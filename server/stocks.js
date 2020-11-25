// ----- Retrieve Assets from Mongo DB ----- \\

let Asset = require('./models/asset.model')
const stocks = []

Asset.find({})
    .then( assets => { for ( let i = 0; i < assets.length; i++ ) { stocks.push(assets[i]) } } )
    .catch( err => { console.log(err) } )

module.exports = stocks

//