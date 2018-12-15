import './feed-on-demand-updates-notification.scss'

import PropTypes from 'prop-types'
import React from 'react'

const FeedOnDemandUpdatesNotification = ({ count, onClick }) => (
  <section
    className='feed-on-demand-updates-notification alert alert-primary'
    role='alert'
    onClick={onClick}
  >
    <div>We have {count} new updates</div>
  </section>
)

FeedOnDemandUpdatesNotification.displayName = 'FeedOnDemandUpdatesNotification'
FeedOnDemandUpdatesNotification.propTypes = {
  count: PropTypes.number.isRequired,

  onClick: PropTypes.func.isRequired
}

export default FeedOnDemandUpdatesNotification
