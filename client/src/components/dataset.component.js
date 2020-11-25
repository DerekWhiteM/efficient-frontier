import React, { useState, useEffect } from 'react'
import Chart from 'chart.js'

const Dataset = (props) => {

    const [feasibleSet, setFeasibleSet] = useState([])
    const [myChart, setMyChart] = useState()

    const data = {
      labels: ['Scatter'],
      datasets: [
        {
          label: 'My First dataset',
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 1,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 1,
          pointRadius: 1,
          pointHitRadius: 10,
          data: feasibleSet
        }
      ]
    }
    
    const options = {
      tooltips: {
        position: 'nearest',
        callbacks: {
          afterTitle: (tooltipItem) => {
              let holdings = [...feasibleSet[tooltipItem[0].index].holdings]
              for (let i = 0; i < holdings.length; i++) {
                let assetClass = props.assets[i].assetClass
                let multiplier = 100
                holdings[i] = assetClass + ': ' + (Math.round((holdings[i]*multiplier) * multiplier) / multiplier) + '%'
              }
              return holdings
          },
          label: () => {}
        }
      }
    }
    var params = {
      type: 'scatter',
      data: data,
      options: options
    }

    useEffect(() => {
      fetch('http://localhost:5000/portfolio', {
        method: 'post',
        body: JSON.stringify({
          assets: props.assets
        }),
        headers: { "Content-type": "application/json" }
      })
        .then(res => res.json())
        .then(res => setFeasibleSet(res))
    }, [props.assets])

    useEffect(() => {
      if (myChart) {myChart.destroy()}
      let ctx = document.getElementById('myChart')     
      setMyChart(new Chart(ctx, params))
    }, [feasibleSet])

    return (
      <div id="canvas" className="container">
          <canvas id='myChart' width="400" height="200"></canvas>
      </div>
    )

}

export default Dataset