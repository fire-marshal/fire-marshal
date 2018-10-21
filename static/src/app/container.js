import React from 'react'

const Container = ({ children }) => (
  <div>
    <ul>
      <li>
        <a href='/add-new-item'>Add New</a>
      </li>
      <li>
        <a href='/stream'>Stream</a>
      </li>
    </ul>
    {children}
  </div>
)

Container.displayName = 'Container'

export default Container
