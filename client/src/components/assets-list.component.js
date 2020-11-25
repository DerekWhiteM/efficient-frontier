import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getFromStorage } from '../storage.js'
import Select from '../components/select.component'
import Dataset from '../components/dataset.component'

const Asset = props => {
  return (
    <tr>
      <td>{props.asset.assetClass}</td>
      <td>{props.asset.name}</td>
      <td>{props.asset.ticker}</td>
      <td>
        <button onClick={() => { props.deleteAsset(props.asset._id) }}>delete</button>
      </td>
    </tr>
  )
}

const AssetsList = () => {

  const [assets,           setAssets] = useState([])
  const [otherAssets, setOtherAssets] = useState([])
  const [isLoading,     setIsLoading] = useState(true)
  
  useEffect(() => {
    axios.get('http://localhost:5000/account/info?userId=' + getFromStorage('user'))
    .then(res => {
      let userAssets = res.data.assets
      axios.post('http://localhost:5000/assets/get', userAssets)
      .then(response => {
        setAssets(response.data.assets)
        setOtherAssets(response.data.otherAssets)
      })
      .then(() => setIsLoading(false))
      .catch(err => console.log(err))
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  const deleteAsset = (id) => {

    let newOtherAssets = [...otherAssets]
    for (let i = 0; i < assets.length; i++) {
      if (assets[i]._id === id) {
        newOtherAssets.push(assets[i])
        break
      }
    }
    setOtherAssets(newOtherAssets)
    const newAssets = assets.filter(el => el._id !== id)
    setAssets( newAssets )
    axios.post('http://localhost:5000/account/assets', { assets: newAssets, userId: getFromStorage('user') })
  }

  const assetList = () => {
    return assets.map(currentasset => {
      return <Asset asset={currentasset} deleteAsset={deleteAsset} key={currentasset._id}/>
    })
  }

  if (isLoading) {
    return (
      <div></div>
    )
  } else {
    return (
      <div className="container">
        <div style={{textAlign: 'right', marginBottom: '25px', marginRight: '8px'}}>
          <Select otherAssets={otherAssets} assets={assets} setAssets={setAssets}/>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Asset Class</th>
              <th>Name</th>
              <th>Ticker</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { assetList() }
          </tbody>
        </table>
        <Dataset assets={assets}/>
      </div>
    )
  }

}

export default AssetsList