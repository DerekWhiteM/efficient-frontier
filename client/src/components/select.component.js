import React from 'react'
import axios from 'axios'
import { getFromStorage } from '../storage.js'
import host from '../host'

const Select = props => {

    const selectAsset = () => { 
      const selected = document.getElementById("assets").selectedIndex
      const assetsCopy = [...props.assets]
      if (props.otherAssets[selected]) { 
        assetsCopy.push(props.otherAssets[selected])
        props.setAssets(assetsCopy)
        props.otherAssets.splice(selected, 1)
        axios.post(host + '/account/assets', { assets: assetsCopy, userId: getFromStorage('user') }) 
      }
    }
  
    const AssetOptions = () => {
      let content = []
      for (let i = 0; i < props.otherAssets.length; i++) {
        content.push(<option key={i}>{props.otherAssets[i].assetClass}</option>)
      }
      return <select id="assets">{content}</select>
    }
  
    return (
      <div style={{width: '100%', textAlign: 'right'}}>
        <AssetOptions/>
        <button style={{marginTop: '-20px', marginBottom: '20px', marginLeft: '4.5%', marginRight: '10.5%'}} onClick={() => { selectAsset() }}>Add</button>
      </div>
    )
  
}

export default Select