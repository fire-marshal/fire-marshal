import './feed-realtime-update-notification.scss'

import PropTypes from 'prop-types'
import React, { useState } from 'react'

import { useVisibleOnScrollUp } from '../../hooks'

const FeedRealtimeUpdateNotification = ({ doFollow }) => {
  const [visible, setVisibility] = useState(true)
  useVisibleOnScrollUp({ setVisibility })

  function handleFollowUpdatesClick (evt) {
    doFollow(evt.target.checked)
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
        <label>Follow Updates <input type='checkbox'
                                     onClick={handleFollowUpdatesClick}/>
        </label>
      </div>
    </section>
  )
}

FeedRealtimeUpdateNotification.displayName = 'FeedRealtimeUpdateNotification'
FeedRealtimeUpdateNotification.propTypes = {
  doFollow: PropTypes.func.isRequired
}

export default FeedRealtimeUpdateNotification
