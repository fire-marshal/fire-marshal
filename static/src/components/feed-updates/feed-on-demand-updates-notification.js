import './feed-on-demand-updates-notification.scss'

import PropTypes from 'prop-types'
import React from 'react'

const FeedOnDemandUpdatesNotification = ({ count }) => (
  <section className='feed-on-demand-updates-notification alert alert-primary' role='alert'>
    <div>We have {count} new updates</div>
  </section>
)

FeedOnDemandUpdatesNotification.displayName = 'FeedOnDemandUpdatesNotification'
FeedOnDemandUpdatesNotification.propTypes = {
  count: PropTypes.number.isRequired
}

export default FeedOnDemandUpdatesNotification
