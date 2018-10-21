import React from 'react'

const MainStreamItem = ({ item }) => (
  <div>
    <h3>{item.title}</h3>
    <div>
      <img src={item.img.src} alt={item.title} />
    </div>
    <div>{item.when.exactlyAt.toString()}</div>
    <div>tags: {item.tags}</div>
    <div>power: {item.power}</div>
    <div>@{item.author}</div>
  </div>
)

MainStreamItem.displayName = 'MainStreamItem'

export default MainStreamItem
