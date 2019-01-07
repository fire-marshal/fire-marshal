import PropTypes from 'prop-types'
import React from 'react'

import { viewModes, isMap } from '../../reducers/ui/updates-feed'

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

const UpdatesFeedToolbar = ({
  follow, hasListAndMapOption, viewMode, isAutomaticMapFitting,
  onAutoMapFittingChange, onFollow, onSelectOption
}) => (
  <nav className='navbar navbar-expand navbar-light bg-light'>
    <div className='collapse navbar-collapse'>
      <ul className='navbar-nav nav-pills'>
        <UpdatesFeedToolbarItem
          id={viewModes.LIST} title='List' active={viewMode === viewModes.LIST}
          onSelect={onSelectOption}
        />
        {hasListAndMapOption && (
          <UpdatesFeedToolbarItem
            id={viewModes.LIST_N_MAP} title='List & Map' active={viewMode === viewModes.LIST_N_MAP}
            onSelect={onSelectOption}
          />
        )}
        <UpdatesFeedToolbarItem
          id={viewModes.MAP} title='Map' active={viewMode === viewModes.MAP}
          onSelect={onSelectOption}
        />
      </ul>
    </div>
    <form className='form-inline ml-2 my-2'>
      {isMap(viewMode) && (
        <div className='mb-1 mr-sm-1'>
          <label
            className='form-check-label'
            onClick={evt => evt.stopPropagation()}
          >
            <input
              checked={isAutomaticMapFitting}
              type='checkbox'
              onChange={evt => onAutoMapFittingChange(evt.target.checked)}
            />&nbsp;
            Fit
          </label>
        </div>
      )}
      <div className='mb-1 mr-sm-1'>
        <label
          className='form-check-label'
          onClick={evt => evt.stopPropagation()}
        >
          <input
            checked={follow}
            type='checkbox'
            onChange={evt => onFollow(evt.target.checked)}
          />&nbsp;
          Follow
        </label>
      </div>
    </form>
  </nav>
)

UpdatesFeedToolbar.displayName = 'UpdatesFeedToolbar'
UpdatesFeedToolbar.propTypes = {
  follow: PropTypes.bool.isRequired,
  hasListAndMapOption: PropTypes.bool.isRequired,
  isAutomaticMapFitting: PropTypes.bool.isRequired,
  viewMode: PropTypes.string.isRequired,

  onAutoMapFittingChange: PropTypes.func.isRequired,
  onFollow: PropTypes.func.isRequired,
  onSelectOption: PropTypes.func.isRequired
}

export default UpdatesFeedToolbar
