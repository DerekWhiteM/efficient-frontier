const mongoose = require('mongoose')

const Schema = mongoose.Schema

const incomeSchema = new Schema({
    user_id: { type: String, required: true, trim: true },
    age1: { type: Number, required: true, trim: true },
    age2: { type: Number, required: true, trim: true },
    income: { type: Number, required: true, trim: true },
    savings: { type: Number, required: true, trim: true },
    tolerance: { type: Number, required: true, trim: true }
});

const Income = mongoose.model('Income', incomeSchema)

module.exports = Income