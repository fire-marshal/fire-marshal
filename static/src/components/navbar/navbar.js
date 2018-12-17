import './navbar.scss'

import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => (
  <nav className='navbar navbar-expand-lg navbar-dark bg-primary top-navbar'>
    <Link className='navbar-brand' to='/'>FM</Link>
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
        <li className='nav-item btn-danger'>
          <Link to='/add-new-item' className='nav-item nav-link'>Fire!</Link>
        </li>
        <li className='nav-item'>
          <Link to='/feed' className='nav-item nav-link'>Watch</Link>
        </li>
        <li className='nav-item'>
          <Link to='/map' className='nav-item nav-link'>Map</Link>
        </li>
      </ul>
    </div>
  </nav>
)

Navbar.displayName = 'Navbar'

export default Navbar
