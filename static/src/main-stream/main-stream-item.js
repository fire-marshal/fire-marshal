import './main-stream-item.scss'

import React from 'react'

const MainStreamItemImage = ({ img, title }) => {
  if (img && img.medium) {
    return <img className='card-img-top' src={img.medium} alt={title} />
  } else {
    // placeholder in case we don't have image
    // TODO: letter when we don't have image
    // it would be cool just show small piece of map here
    return null
  }
}

const MainStreamItem = ({ item }) => (
  <div className='card alert-card'>
    <MainStreamItemImage img={item.img} />
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
