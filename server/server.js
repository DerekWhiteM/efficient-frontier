require('dotenv').config()

const getStocks = require('./getStocks')
const wakeUpDyno = require('./wakeUpDyno')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = process.env.PORT || 5000
const DYNO_URL = 'https://efficient-portfolio.herokuapp.com/'
const uri = process.env.ATLAS_URI
const connection = mongoose.connection
const assetsRouter = require('./routes/assets')
const portfolioRouter = require('./routes/portfolio')
const accountRouter = require('./routes/account')

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/assets', assetsRouter)
app.use('/portfolio', portfolioRouter)
app.use('/account', accountRouter)
app.use(express.static(path.join(__dirname, '../client/build')))

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build'))
})

app.listen(port, () => {
    getStocks()
    wakeUpDyno(DYNO_URL)
    console.log(`Server is running on port: ${port}`)
})