import './landing.scss'

import React from 'react'
import { Link } from 'react-router-dom'

import packageJSON from '../../../package'

import logoUrl from './hell-mandala-512x512.png'

const Landing = () => (
  <div className='landing jumbotron'>
    <h1 className='display-4'>Fire Marshal! <small className='text-muted'>v{packageJSON.version}</small></h1>
    <p className='lead'>Where there&#39;s smoke there&#39;s fire</p>
    <img src={logoUrl} width={256} height={256} alt='' />
    <hr className='my-4' />
    <p>
      Crowdsourcing tool for citizens to contribute to early detection, verification, tracking, visualization, and
      notification of wildfires.
    </p>
    <div className='btn-group'>
      <Link className='btn btn-primary btn-lg btn-danger' to='/add-new-item' role='button'>Report Fire</Link>
      <Link className='btn btn-primary btn-lg btn-info' to='/feed'>Feed</Link>
      <a className='btn btn-primary btn-lg' href='https://github.com/fire-marshal/fire-marshal/' role='button'>Learn
        more</a>
    </div>
    <p>
      <a href='https://github.com/fire-marshal/fire-marshal'>Source Code</a>
    </p>
  </div>
)

Landing.displayName = 'Landing'

export default Landing
