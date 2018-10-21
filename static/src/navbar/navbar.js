import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => (
  <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
    <a className='navbar-brand' href='/'>
      Fire Marshal
    </a>
    <button
      className='navbar-toggler'
      type='button'
      data-toggle='collapse'
      data-target='#navbarNav'
      aria-controls='navbarNav'
      aria-expanded='false'
      aria-label='Toggle navigation'>
      <span className='navbar-toggler-icon' />
    </button>
    <div className='collapse navbar-collapse' id='navbarNav'>
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <Link to='/add-new-item' className='nav-item nav-link'>Add New</Link>
        </li>
        <li className='nav-item'>
          <Link to='/stream' className='nav-item nav-link'>Stream</Link>
        </li>
      </ul>
    </div>
  </nav>
)

Navbar.displayName = 'Navbar'

export default Navbar
