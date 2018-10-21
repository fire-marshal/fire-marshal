import './main-stream-item.scss'

import React from 'react'

const MainStreamItem = ({ item }) => (
  <div className='card alert-card'>
    <img className='card-img-top' src={item.img.src} alt={item.title} />
    <div className='card-body'>
      <h5 className='card-title'>{item.title}</h5>
      <div className='card-text'>
        <div>{item.when.exactlyAt.toString()}</div>
        <div>tags: {item.tags}</div>
        <div>power: {item.power}</div>
        <div>@{item.author}</div>
      </div>
    </div>
  </div>
)

MainStreamItem.displayName = 'MainStreamItem'

export default MainStreamItem
