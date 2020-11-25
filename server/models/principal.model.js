const mongoose = require('mongoose')

const Schema = mongoose.Schema

const principalSchema = new Schema({
    user_id : { type: String, trim: true },
    value : { type: Number, required: true, trim: true },
});

const Principal = mongoose.model('Principal', principalSchema)

module.exports = Principal