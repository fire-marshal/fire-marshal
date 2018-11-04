import React from 'react'

import { NavBar } from '../navbar'

const Container = ({ children }) => (
  <div>
    <NavBar />
    {children}
  </div>
)

Container.displayName = 'Container'

export default Container
