import './feed-realtime-update-notification.scss'

import React, { useEffect, useState } from 'react'

const useVisibleOnScrollUp = () => {
  const [visible, setVisibility] = useState(true)

  useEffect(() => {
    let previousScrollpos = window.pageYOffset
    // TODO: it would be better to use event listeners
    // scrollEl.addEventListener('mousewheel', this.mousewheelListener, this.props.useCapture);
    // scrollEl.addEventListener('scroll', this.scrollListener, this.props.useCapture);

    const previousOnScroll = window.onscroll
    window.onscroll = (...args) => {
      const currentScrollPos = window.pageYOffset
      if (previousScrollpos > currentScrollPos) {
        setVisibility(true)
      } else {
        setVisibility(false)
      }
      previousScrollpos = currentScrollPos
      previousOnScroll && previousOnScroll.apply(window, args)
    }
    return () => {
      window.onscroll = previousOnScroll
    }
  })

  return visible
}

const FeedRealtimeUpdateNotification = () => {
  const visible = useVisibleOnScrollUp()

  return (
    <section
      className='feed-realtime-update-notification alert alert-secondary'
      role='alert'
      style={{ top: visible ? 56 : 0 }}
    >
      <div>Follow Updates <input type='checkbox' /></div>
    </section>
  )
}

FeedRealtimeUpdateNotification.displayName = 'FeedRealtimeUpdateNotification'

export default FeedRealtimeUpdateNotification
