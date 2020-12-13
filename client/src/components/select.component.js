import React from 'react'
import axios from 'axios'
import { getFromStorage } from '../storage.js'
import host from '../host'
import 'bootstrap/dist/css/bootstrap.min.css'

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
      return <select class="form-select" id="assets">{content}</select>
    }
  
    return (
      <div style={{textAlign: "center"}}>
        <AssetOptions/>
        <button style={{marginLeft: "10px", marginBottom: "10px"}} onClick={() => { selectAsset() }}>Add</button>
      </div>
    )
  
}

export default Select