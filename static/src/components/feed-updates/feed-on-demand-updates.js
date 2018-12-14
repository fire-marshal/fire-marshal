import PropTypes from 'prop-types'
import React from 'react'

const FeedOnDemandUpdates = ({ count }) => (
  <section>
    <div>We have {count} new updates</div>
  </section>
)

FeedOnDemandUpdates.displayName = 'FeedUpdates'
FeedOnDemandUpdates.propTypes = {
  count: PropTypes.number.isRequired
}

export default FeedOnDemandUpdates
