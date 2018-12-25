import './feed-on-demand-updates-notification.scss'

import PropTypes from 'prop-types'
import React, { useState } from 'react'

import { useVisibleOnScrollUp } from '../../hooks'

const FeedOnDemandUpdatesNotification = ({ count, onClick }) => {
  const [visible, setVisibility] = useState(true)
  // FIXME: doesn't work yet because we should listen scroll of particular element
  useVisibleOnScrollUp({ setVisibility })

  if (count === 0 || !visible) {
    return null
  }

  return (
    <section
      className='feed-on-demand-updates-notification alert alert-primary'
      role='alert'
      onClick={onClick}
    >
      <div>We have {count} new updates</div>
    </section>
  )
}

FeedOnDemandUpdatesNotification.displayName = 'FeedOnDemandUpdatesNotification'
FeedOnDemandUpdatesNotification.propTypes = {
  count: PropTypes.number.isRequired,

  onClick: PropTypes.func.isRequired
}

export default FeedOnDemandUpdatesNotification
