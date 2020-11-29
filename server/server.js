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

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

const assetsRouter = require('./routes/assets')
const incomeRouter = require('./routes/income')
const portfolioRouter = require('./routes/portfolio')
const principalRouter = require('./routes/principal')
const accountRouter = require('./routes/account')

app.use('/assets', assetsRouter)
app.use('/income', incomeRouter)
app.use('/portfolio', portfolioRouter)
app.use('/principal', principalRouter)
app.use('/account', accountRouter)

app.use(express.static(path.join(__dirname, '../client/build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build'))
})

app.listen(port, () => {
    getStocks()
    wakeUpDyno(DYNO_URL)
    console.log(`Server is running on port: ${port}`)
})