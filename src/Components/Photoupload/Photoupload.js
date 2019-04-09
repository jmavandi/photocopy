import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import SelectFile from './SelectFile';

const moment = require('moment');

class Photoupload extends Component{
  constructor(props) {
    super(props);
    this.state ={
      title: '',
      category: '',
      priceMin: '',
      priceMax: '',
      imageURL: '',
      uploading: false,
      images: []
    }
    this.doHandleChange = this.doHandleChange.bind(this);
    this.createItem = this.createItem.bind(this);
    this.onAddImage = this.onAddImage.bind(this);
    this.removeImage = this.removeImage.bind(this);
  }
    doHandleChange(event) {
      event.preventDefault();
      const newState = this.state;
      newState[event.target.id] = event.target.value;
      this.setState(newState);
    }
    
    onAddImage = e => {
      const files = Array.from(e.target.files)
      this.setState({ uploading: true })
  
      const formData = new FormData()
  
      files.forEach((file, i) => {
        formData.append(i, file)
      })
  
      fetch(`${process.env.REACT_APP_API_URL}/image-upload`, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(images => {
        this.setState({ 
          uploading: false,
          imageURL: images[0].secure_url,
          // for adding more than one image, would use if statement here
          images
        })
      })
    }
  
    removeImage = id => {
      this.setState({
        images: this.state.images.filter(image => image.public_id !== id)
      })
    }

    createItem = async (event) => {
      event.preventDefault();
        const newItem = {
        title: this.state.title,
        date: moment().format(),
        category: this.state.category,
        price_min: this.state.priceMin,
        price_max: this.state.priceMax,
        url: this.state.imageURL
      }

      // need this route to work, add data to mongodb
      try {
        const sendItemResponse = await fetch(`${process.env.REACT_APP_API_URL}/photos/`,
        {
            method: "POST",
            body: JSON.stringify(newItem),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if(!sendItemResponse.ok) {
          throw Error(sendItemResponse.statusText)
      }

      } catch (err) {
        console.log('is ther errr here', err);
      }
      
    }

    render () {
      console.log('this.state: ', this.state);
      return (
        <div className="addItemForm">
        <h3>Upload an Image</h3>
          Title
        <br />
        <input className="title" id="title" onChange={this.doHandleChange} type="text" />
          Category
        <br />
       <input className="item-category" id="category" onChange={this.doHandleChange} />
          Minimum Price
        <br />
        <input className="min-price" id="priceMin" onChange={this.doHandleChange} type="number" />
        Maximum Price
        <br />
        <input className="max-price" id="priceMax" onChange={this.doHandleChange} type="number" />
        <div>
          <SelectFile onAddImage={this.onAddImage} removeImage={this.removeImage} uploading={this.state.uploading} images={this.state.images} />
        </div>
        <br />
        <div>
          <button className="upload-photo-button" onClick={this.createItem}>Add Item</button>
        </div>
      </div>
      )
  }
}

export default withRouter(Photoupload);