import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getFromStorage } from '../storage.js'
import Select from '../components/select.component'
import Dataset from '../components/dataset.component'
import host from '../host'

const Asset = props => {
  return (
    <tr>
      <td>{props.asset.assetClass}</td>
      <td>{props.asset.name}</td>
      <td>{props.asset.ticker}</td>
      <td>
        <a href="/#" onClick={() => { props.deleteAsset(props.asset._id) }}>delete</a>
      </td>
    </tr>
  )
}

const AssetsList = () => {

  const [assets,           setAssets] = useState([])
  const [otherAssets, setOtherAssets] = useState([])
  const [isLoading,     setIsLoading] = useState(true)
  
  useEffect(() => {
    axios.get(host + '/account/info?userId=' + getFromStorage('user'))
    .then(res => {
      let userAssets = res.data.assets
      axios.post(host + '/assets/get', userAssets)
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
    axios.post(host + '/account/assets', { assets: newAssets, userId: getFromStorage('user') })
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
        <table className="table">
          <thead>
            <tr>
              <th>Asset Class</th>
              <th>Name</th>
              <th>Ticker</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { assetList() }
          </tbody>
        </table>
        <Select otherAssets={otherAssets} assets={assets} setAssets={setAssets}/>
        <Dataset assets={assets}/>
      </div>
    )
  }

}

export default AssetsList