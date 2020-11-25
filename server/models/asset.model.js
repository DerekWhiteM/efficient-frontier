const mongoose = require('mongoose')
const { Schema } = mongoose

const assetSchema = new Schema({
    assetClass: { type: String },
    name:       { type: String },
    ticker:     { type: String },
    prices:     [Number]
})

const Asset = mongoose.model('Asset', assetSchema)

module.exports = Asset