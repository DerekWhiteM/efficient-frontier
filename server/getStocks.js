// ----- Get stock prices and save to MongoDB ----- \\

let Asset = require('./models/asset.model')
const fetch = require('node-fetch')

const getPrices = () => {
    Asset.find({})
    .then( assets => { 
        for ( let i = 0; i < assets.length; i++ ) { 
            let ticker = assets[i].ticker
            let url = `https://yahoo-finance-low-latency.p.rapidapi.com/v8/finance/spark?symbols=${ticker}&interval=1mo&range=5y`
            fetch(url, {
                headers: {
                    'x-rapidapi-key': '167deac947mshe187dd44a1f25dfp1786eejsndd55ff6025e5',
                    'x-rapidapi-host': 'yahoo-finance-low-latency.p.rapidapi.com'
                }
            })
            .then(res => res.json())
            .then(res => {
                if (res.ok) {
                    assets[i].prices = res[ticker].close
                    assets[i].save()
                } else {
                    console.log(res.statusText)
                }
            })
            .catch(err => {
                console.log(err)
            })
        } 
    })
}

const getStocks = () => {
    let numDays = 30
    let interval = numDays * 86400000
    getPrices()
    setInterval(getPrices, interval)
}

module.exports = getStocks