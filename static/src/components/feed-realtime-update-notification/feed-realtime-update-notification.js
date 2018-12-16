import './feed-realtime-update-notification.scss'

import PropTypes from 'prop-types'
import React, { useState } from 'react'

import { useVisibleOnScrollUp } from '../../hooks'

const FeedRealtimeUpdateNotification = ({ follow, map, onFollow, onMap }) => {
  const [visible, setVisibility] = useState(true)
  useVisibleOnScrollUp({ setVisibility })

  return (
    <section
      className='feed-realtime-update-notification alert alert-secondary'
      role='alert'
      style={{ top: visible ? 56 : 0 }}
      onClick={() => setVisibility(false)}
    >
      <div>
        <label onClick={evt => evt.stopPropagation()}>
          <input
            checked={follow}
            type='checkbox'
            onChange={evt => onFollow(evt.target.checked)}
          />&nbsp;
          Follow Updates
        </label>
        <label onClick={evt => evt.stopPropagation()}>
          <input
            checked={map}
            type='checkbox'
            onChange={evt => onMap(evt.target.checked)}
          />&nbsp;
          Show Map
        </label>
      </div>
    </section>
  )
}

FeedRealtimeUpdateNotification.displayName = 'FeedRealtimeUpdateNotification'
FeedRealtimeUpdateNotification.propTypes = {
  follow: PropTypes.bool.isRequired,
  map: PropTypes.bool.isRequired,
  onFollow: PropTypes.func.isRequired,
  onMap: PropTypes.func.isRequired
}

export default FeedRealtimeUpdateNotification
