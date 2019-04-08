import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const moment = require('moment');

class Photoupload extends Component{
  constructor(props) {
    super(props);
    this.state ={
      title: '',
      category: '',
      priceMin: '',
      priceMax: '',
      image: '',
      selectedFile: null,
      fireRedirect: false,
    }
    this.doHandleChange = this.doHandleChange.bind(this);
    this.doFileUpload = this.doFileUpload.bind(this);
    this.createItem = this.createItem.bind(this);

    doHandleChange(event) {
      e.preventDefault();
      const newState = this.state;
      newState[event.target.id] = event.target.value;
      this.setState(newState);
    }

    doFileUpload(event) {
      const file = event.target.files[0];
      this.setState({ selectedFile:file});
    }
    createItem(e) {
      e.preventDefault();
      const newItem = {
        title = this.state.title,
        date = moment().format();
        category = this.state.category,
        price_min: this.state.priceMin,
        price_max: this.state.priceMax,
        image_url: this.state.image,
      }
      this.props.createItem(newItem);
      this.setState({fireRedirect: true});
    }

    render () {
      const { fireRedirect } = this.state;
      console.log('this.state: ', this.state);

      return (
        <div className="addItemForm">
        <h3>Upload an Image</h3>
          Title
        <br />
        <input className="item-name" id="itemName" onChange={this.doHandleChange} type="text" />
          Category
        <br />
       <input className="item-category" id="itemCategory" onChange={this.doHandleChange} />
          Minimum Price
        <br />
        <input className="min-price" id="minPrice" onChange={this.doHandleChange} type="number" />
        Maximum Price
        <br />
        <input className="max-price" id="maxPrice" onChange={this.doHandleChange} type="number" />
        <div>
          <br />
          <strong>Upload Photo</strong>
          <br />
            Choose an Image
          <br />
          <input className="item-upload" id="file" onChange={this.doFileUpload} type="file" />
        </div>
        <br />
        <div>
          <button className="upload-photo-button" onClick={this.createItem}>Add Item</button>
          {fireRedirect && (<Redirect to="/" />)}
        </div>
      </div>
      )
    }
  }
}

export default withRouter(Photoupload);