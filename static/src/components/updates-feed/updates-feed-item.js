import './updates-feed-item.scss'

import PropTypes from 'prop-types'
import React, { useRef } from 'react'

import { useResizeComponent } from '../../hooks/use-resize-component'

const UpdatesFeedItemImage = ({ img, title }) => {
  if (img && img.medium) {
    return <img className='card-img-top' src={img.medium} alt={title} height={480} width={640}/>
  } else {
    // placeholder in case we don't have image
    // TODO: letter when we don't have image
    // it would be cool just show small piece of map here
    return null
  }
}

UpdatesFeedItemImage.propTypes = {
  img: PropTypes.object,
  title: PropTypes.string
}

const UpdatesFeedItem = ({ isSelected, item, onMouseOver, onResize }) => {
  const cardRef = useRef()

  // TODO: actually we don't need to track resize of each item, we could pick only one
  useResizeComponent(cardRef, onResize)

  return (
    <div
      className={`card alert-card ${isSelected ? 'highlighted' : ''}`}
      ref={cardRef}
      onMouseOver={() => onMouseOver(item)}
    >
      <UpdatesFeedItemImage img={item.img}/>
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
}

UpdatesFeedItem.displayName = 'UpdatesFeedItem'
UpdatesFeedItem.propTypes = {
  isSelected: PropTypes.bool,
  item: PropTypes.object.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired
}

export default UpdatesFeedItem
