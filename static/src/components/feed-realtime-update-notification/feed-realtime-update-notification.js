import './feed-realtime-update-notification.scss'

import PropTypes from 'prop-types'
import React, { useState } from 'react'

import { useVisibleOnScrollUp } from '../../hooks'

const FeedRealtimeUpdateNotification = ({ follow, onFollow }) => {
  const [visible, setVisibility] = useState(true)
  useVisibleOnScrollUp({ setVisibility })

  function handleFollowUpdatesClick (evt) {
    onFollow(evt.target.checked)
    evt.stopPropagation()
  }

  return (
    <section
      className='feed-realtime-update-notification alert alert-secondary'
      role='alert'
      style={{ top: visible ? 56 : 0 }}
      onClick={() => setVisibility(false)}
    >
      <div>
        <label>
          <input
            checked={follow}
            type='checkbox'
            onChange={handleFollowUpdatesClick}
          />&nbsp;
          Follow Updates
        </label>
      </div>
    </section>
  )
}

FeedRealtimeUpdateNotification.displayName = 'FeedRealtimeUpdateNotification'
FeedRealtimeUpdateNotification.propTypes = {
  follow: PropTypes.bool.isRequired,
  onFollow: PropTypes.func.isRequired
}

export default FeedRealtimeUpdateNotification
