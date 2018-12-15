import './feed-realtime-update-notification.scss'

import React from 'react'

import { useVisibleOnScrollUp } from '../../hooks'

const FeedRealtimeUpdateNotification = () => {
  const visible = useVisibleOnScrollUp()

  return (
    <section
      className='feed-realtime-update-notification alert alert-secondary'
      role='alert'
      style={{ top: visible ? 56 : 0 }}
    >
      <div>Follow Updates <input type='checkbox'/></div>
    </section>
  )
}

FeedRealtimeUpdateNotification.displayName = 'FeedRealtimeUpdateNotification'

export default FeedRealtimeUpdateNotification
