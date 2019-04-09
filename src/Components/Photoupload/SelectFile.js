import React, { Component } from 'react'

import Spinner from './Spinner'
import Images from './Images'
import Buttons from './Buttons'



export default class SelectFile extends Component {
  
  
  render() {
    const { uploading, images, onAddImage, removeImage} = this.props

    console.log(this.props);
    const content = () => {
      switch(true) {
        case uploading:
          return <Spinner />
        case images.length > 0:
          return <Images images={images} removeImage={removeImage} />
        default:
          return <Buttons onChange={onAddImage} />
      }
    }

    return (
      <div>
        <div className='buttons'>
          {content()}
        </div>
      </div>
    )
  }
}