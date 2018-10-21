import React from 'react'
import { Link } from 'react-router-dom'

const Container = ({ children }) => (
  <div>
    <ul>
      <li>
        <Link to='/add-new-item'>Add New</Link>
      </li>
      <li>
        <Link to='/stream'>Stream</Link>
      </li>
    </ul>
    {children}
  </div>
)

Container.displayName = 'Container'

export default Container
