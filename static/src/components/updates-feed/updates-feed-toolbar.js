import PropTypes from 'prop-types'
import React from 'react'

import { viewModes } from '../../reducers/ui/updates-feed'

const UpdatesFeedToolbarItem = ({ active, id, title, onSelect }) => {
  return (
    <li className='nav-item'>
      <a className={`nav-link ${active ? ' active' : ''}`} href='#' onClick={e => {
        e.preventDefault()
        onSelect(id)
      }}>
        {title}
      </a>
    </li>
  )
}

UpdatesFeedToolbarItem.displayName = 'UpdatesFeedToolbarItem'
UpdatesFeedToolbarItem.propTypes = {
  active: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

const UpdatesFeedToolbar = ({ viewMode, onSelectOption }) => (
  <ul className='nav nav-pills list-group-item-secondary'>
    <UpdatesFeedToolbarItem
      id={viewModes.LIST} title='List' active={viewMode === viewModes.LIST}
      onSelect={onSelectOption}
    />
    <UpdatesFeedToolbarItem
      id={viewModes.LIST_N_MAP} title='List & Map' active={viewMode === viewModes.LIST_N_MAP}
      onSelect={onSelectOption}
    />
    <UpdatesFeedToolbarItem
      id={viewModes.MAP} title='Map' active={viewMode === viewModes.MAP}
      onSelect={onSelectOption}
    />
  </ul>
)

UpdatesFeedToolbar.displayName = 'UpdatesFeedToolbar'
UpdatesFeedToolbar.propTypes = {
  viewMode: PropTypes.string.isRequired,
  onSelectOption: PropTypes.func.isRequired
}

export default UpdatesFeedToolbar
