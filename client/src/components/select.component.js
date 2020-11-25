import React from 'react'
import axios from 'axios'
import { getFromStorage } from '../storage.js'

const Select = props => {

    const selectAsset = () => { 
      const selected = document.getElementById("assets").selectedIndex
      const assetsCopy = [...props.assets]
      assetsCopy.push(props.otherAssets[selected])
      props.setAssets(assetsCopy)
      props.otherAssets.splice(selected, 1)
      axios.post('http://localhost:5000/account/assets', { assets: assetsCopy, userId: getFromStorage('user') })
    }
  
    const AssetOptions = () => {
      let content = []
      for (let i = 0; i < props.otherAssets.length; i++) {
        content.push(<option key={i}>{props.otherAssets[i].assetClass}</option>)
      }
      return <select id="assets">{content}</select>
    }
  
    return (
      <div>
        <button style={{marginRight: '5px'}} onClick={() => { selectAsset() }}>Add</button>
        <AssetOptions/>
      </div>
    )
  
}

export default Select