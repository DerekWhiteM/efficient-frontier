const router = require('express').Router()
var Finance = require( 'financejs' )
var finance = new Finance()
var ss = require('simple-statistics')

router.route('/').post((req, res) => {

  
  const stocks = req.body.assets


  // ----- Define Response Array ----- \\
  var data = []

  // ----- Calculate Individual Asset Total Returns ----- \\
  let returns = []
  for (let i = 0; i < stocks.length; i++) {
    let begValue = stocks[i].prices[0]
    let endValue = stocks[i].prices[stocks.length]
    let periods = stocks[i].prices.length - 1
    let growthRate = finance.CAGR( begValue, endValue, periods )
    returns.push(growthRate)
  }



  // ----- Convert Prices To Log Returns ----- \\
  let logReturns = []
  let avgLogReturns = []
  const average = arr => arr.reduce((sume, el) => sume + el, 0) / arr.length;
  for (let i = 0; i < stocks.length; i++) {
    let r = []
    for (let j = 0; j < stocks[i].prices.length - 1; j++) {
      let begValue = stocks[i].prices[j]
      let endValue = stocks[i].prices[j+1]
      r.push(Math.log(endValue/begValue))
    }
    logReturns.push(r)
    avgLogReturns.push(average(r) * 12)
  }



  // ----- Calculate Individual Asset Standard Deviation ----- \\
  let stdDevs = []
  for (let i = 0; i < stocks.length; i++) {
    stdDevs.push(ss.standardDeviation(logReturns[i]))
  }



  // ----- Calculate Correlation For Each Pair ----- \\
  let pairs = []
  for (let i = 0; i < stocks.length - 1; i++) {
    for (let j = i + 1; j < stocks.length; j++) {
      const pair = {
        first: i,
        second: j,
        correlation: ss.sampleCovariance(logReturns[i], logReturns[j]) //Correlation.calc(logReturns[i], logReturns[j])
      }
      pairs.push(pair)
    }
  }


  
  // ----- Create Random Portfolios ----- \\
  for (let i = 0; i < 1000; i++) {


    
    // ----- Define Portfolio Object ----- \\
    const dataPoints = {
      x: 0,
      y: 0,
      holdings: [],
      names: []
    }



    // ----- Assign Random Holdings ----- \\
    let weights = []
    let sum = 0
    for (let j = 0; j < stocks.length; j++) {
      weights[j] = Math.round(Math.random() * 100)
      sum += weights[j]
      dataPoints.names.push(stocks[j].ticker)
    }
    for (let j = 0; j < weights.length; j++) {
      dataPoints.holdings[j] = weights[j] / sum
    }



    // ----- Portfolio Expected Return ----- \\
    let average = (array) => array.reduce((a, b) => a + b) / array.length
    for (let i = 0; i < returns.length; i++) {
      dataPoints.y += dataPoints.holdings[i] * average(logReturns[i]) * 12
    }



    // ----- Portfolio Standard Deviation ----- \\
    let portfolioSD = 0
    for (let j = 0; j < dataPoints.holdings.length; j++) {
      portfolioSD += ( 
        (dataPoints.holdings[j] ** 2)*(stdDevs[j] ** 2) 
      )
    }
    for (let j = 0; j < pairs.length; j++) {
      let weightA = dataPoints.holdings[pairs[j].first]
      let weightB = dataPoints.holdings[pairs[j].second]
      let sdA = stdDevs[pairs[j].first]
      let sdB = stdDevs[pairs[j].second]
      let correlation = pairs[j].correlation
      portfolioSD += (
        (2 * weightA * weightB * sdA * sdB * correlation)
      )
    }
    portfolioSD = Math.sqrt(portfolioSD) * 12
    dataPoints.x = portfolioSD

  

    // ----- Add Portfolio To Response Array ----- \\
    data.push(dataPoints)
  }



  // ----- Send Array Of Portfolios In Response ----- \\
  res.json(data)
})

module.exports = router