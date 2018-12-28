import './updates-feed.scss'

import PropTypes from 'prop-types'
import React, { Fragment, memo, useEffect } from 'react'

import { UpdatesFeedList } from '../../containers/updates-feed-list'
import { isList, isMap } from '../../reducers/ui/updates-feed'
import { useMediaQuery } from '../../hooks/use-media-query'

import { MapContainer } from '../map'

import UpdatesFeedToolbar from './updates-feed-toolbar'

const UpdatesFeed = ({
  list, isRealtime, onDemandCount, user, viewMode,

  enableRealtime, loadItemsAfter, moveOnDemandIdsToTheFeed,
  setViewMode, subscribeUpdatesFeed, unsubscribeUpdatesFeed
}) => {
  useEffect(() => {
    // FIXME: just temporal solution to send update each 5 seconds and check load
    const interval = setInterval(() => {
      const { location } = user
      const { startDateISO } = list
      subscribeUpdatesFeed({ location, startDateISO })
    }, 5 * 1000)
    return () => {
      clearInterval(interval)
      unsubscribeUpdatesFeed()
    }
  }, [])

  const small = useMediaQuery('(max-width: 800px)')

  const leftColumnClass = (isList(viewMode) && isMap(viewMode)) ? 'left-column' : 'full-width'

  return (
    <Fragment>
      <UpdatesFeedToolbar
        follow={isRealtime}
        hasListAndMapOption={!small}
        viewMode={viewMode}
        onFollow={enableRealtime}
        onSelectOption={setViewMode}
      />
      <div className='container-for-list-and-map'>
        {
          small ? (
            <>
              {
                isList(viewMode) ? (
                  <div className='feed-list-container'>
                    <UpdatesFeedList/>
                  </div>
                ) : (
                  <MapContainer/>
                )
              }
            </>
          ) : (
            <>
              {
                isList(viewMode) && <div className={`feed-list-container ${leftColumnClass}`}>
                  <UpdatesFeedList/>
                </div>
              }
              {
                isMap(viewMode) && <MapContainer/>
              }
            </>
          )
        }
      </div>
    </Fragment>
  )
}

UpdatesFeed.displayName = 'UpdatesFeed'

UpdatesFeed.propTypes = {
  list: PropTypes.object.isRequired,
  isRealtime: PropTypes.bool.isRequired,
  onDemandCount: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  viewMode: PropTypes.string.isRequired,

  loadItemsAfter: PropTypes.func.isRequired,
  enableRealtime: PropTypes.func.isRequired,
  moveOnDemandIdsToTheFeed: PropTypes.func.isRequired,
  setViewMode: PropTypes.func.isRequired,
  subscribeUpdatesFeed: PropTypes.func.isRequired,
  unsubscribeUpdatesFeed: PropTypes.func.isRequired
}

export default memo(UpdatesFeed)
