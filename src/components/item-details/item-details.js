import React, { Component } from 'react';

import Spinner from '../spinner'

import './item-details.css';



const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  )
}

export { Record }



export default class ItemDetails extends Component {

  state = {
    item: null,
    image: null,
    loading: false
  }

  componentDidMount() {
    this.updatePerson()
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId ||
        this.props.getData !== prevProps.getData ||
        this.props.getImageUrl !== prevProps.getImageUrl) {
      this.updatePerson()
    }
  }

  updatePerson() {
    const { itemId, getData, getImageUrl } = this.props
    if (!itemId) {
      return
    }

    this.setState({
      loading: true
    })

    getData(itemId)
      .then((item) => {
        this.setState({
          item: item,
          image: getImageUrl(item),
          loading: false
        })
      })
  }

  render() {

    const { item, image, loading } = this.state

    if (loading) {
      return <Spinner />
    } else if (!item) {
      return <span>Select an item from a list</span>
    }

    const { name } = item

    return (
      <div className="person-details card">
        <img className="person-image"
          src={image} 
          alt="character"
        />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, { item })
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}