import './updates-feed-item.scss'

import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'
import createDetectElementResize from '../../vendor/detect-element-resize'

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

function getElSize (el) {
  const height = el.offsetHeight || 0
  const width = el.offsetWidth || 0

  const style = window.getComputedStyle(el) || {}
  const paddingLeft = parseInt(style.paddingLeft, 10) || 0
  const paddingRight = parseInt(style.paddingRight, 10) || 0
  const paddingTop = parseInt(style.paddingTop, 10) || 0
  const paddingBottom = parseInt(style.paddingBottom, 10) || 0

  const newHeight = height - paddingTop - paddingBottom
  const newWidth = width - paddingLeft - paddingRight

  // TODO: shouldn't it be newHeight?
  return { height: newHeight, width: newWidth }
}

const UpdatesFeedItem = ({ item, onResize }) => {
  const cardRef = useRef()

  useEffect(() => {
    let previousWidth = null
    let previousHeight = null

    const onResizeCard = () => {
      const newSize = getElSize(cardRef.current)
      const { width, height } = newSize
      if (width !== previousWidth || height !== previousHeight) {
        onResize(newSize)
        previousWidth = width
        previousHeight = height
      }
    }

    const _detectElementResize = createDetectElementResize()
    _detectElementResize.addResizeListener(
      cardRef.current,
      onResizeCard
    )

    return () => {
      _detectElementResize.removeResizeListener(
        cardRef.current,
        onResizeCard
      )
    }
  }, [cardRef])

  return (
    <div
      className='card alert-card'
      ref={cardRef}
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
  item: PropTypes.object.isRequired,
  onResize: PropTypes.func.isRequired
}

export default UpdatesFeedItem
