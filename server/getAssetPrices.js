// ----- Get asset prices and save to DB ----- \\

require('dotenv').config()

const Asset = require('./models/asset.model')
const fetch = require('node-fetch')

const getPrices = () => {
    Asset.find({})
        .then( assets => { 
            for ( let i = 0; i < assets.length; i++ ) { 
                let ticker = assets[i].ticker
                let url = `https://yahoo-finance-low-latency.p.rapidapi.com/v8/finance/spark?symbols=${ticker}&interval=1mo&range=5y`
                let headers = {
                    'x-rapidapi-key': process.env.RAPID_API_KEY,
                    'x-rapidapi-host': 'yahoo-finance-low-latency.p.rapidapi.com'
                }
                fetch(url, { headers: headers })
                    .then(res => res.json())
                    .then(res => {
                        if (res[ticker]) {
                            assets[i].prices = res[ticker].close
                            assets[i].save()
                        }
                    })
                    .catch(err => {console.log(err)})
            } 
        })
}

const getPricesPeriodically = () => {
    let numDays = 1
    let interval = numDays * 86400000
    getPrices()
    setInterval(getPrices, interval)
}

module.exports = getPricesPeriodically