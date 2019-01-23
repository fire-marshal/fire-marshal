import './updates-feed.scss'

import PropTypes from 'prop-types'
import React, { Fragment, memo, useEffect } from 'react'

import { FeedMap } from '../../containers/feed-map'
import { UpdatesFeedList } from '../../containers/updates-feed-list'
import { useInnerSizeToCSSVars } from '../../hooks/use-inner-size-to-css-vars'
import { useMediaQuery } from '../../hooks/use-media-query'
import { isList, isMap } from '../../reducers/ui/updates-feed'

import UpdatesFeedToolbar from './updates-feed-toolbar'

const UpdatesFeed = ({
  listStartDateISO, isAutomaticMapFitting, isRealtime, onDemandCount, user, viewMode,

  onAutoMapFittingChange, enableRealtime, loadItemsAfter, moveOnDemandIdsToTheFeed,
  setViewMode, subscribeUpdatesFeed, unsubscribeUpdatesFeed
}) => {
  useEffect(() => {
    // FIXME: just temporal solution to send update each 5 seconds and check load
    const interval = setInterval(() => {
      const { location } = user
      subscribeUpdatesFeed({ location, startDateISO: listStartDateISO })
    }, 5 * 1000)
    return () => {
      clearInterval(interval)
      unsubscribeUpdatesFeed()
    }
  }, [])

  useInnerSizeToCSSVars()

  const small = !!useMediaQuery('(max-width: 800px)')

  const leftColumnClass = (isList(viewMode) && isMap(viewMode)) ? 'left-column' : 'full-width'

  return (
    <Fragment>
      {!small && (
        <UpdatesFeedToolbar
          follow={isRealtime}
          hasListAndMapOption={!small}
          isAutomaticMapFitting={isAutomaticMapFitting}
          viewMode={viewMode}
          onAutoMapFittingChange={onAutoMapFittingChange}
          onFollow={enableRealtime}
          onSelectOption={setViewMode}
        />
      )}
      <div className='container-for-list-and-map'>
        {
          small ? (
            <>
              {
                isList(viewMode) ? (
                  <div className='feed-list-container'>
                    <UpdatesFeedList />
                  </div>
                ) : (
                  <FeedMap />
                )
              }
            </>
          ) : (
            <>
              {
                isList(viewMode) && <div className={`feed-list-container ${leftColumnClass}`}>
                  <UpdatesFeedList />
                </div>
              }
              {
                isMap(viewMode) && <FeedMap />
              }
            </>
          )
        }
      </div>
      {small && (
        <UpdatesFeedToolbar
          follow={isRealtime}
          hasListAndMapOption={!small}
          isAutomaticMapFitting={isAutomaticMapFitting}
          viewMode={viewMode}
          onAutoMapFittingChange={onAutoMapFittingChange}
          onFollow={enableRealtime}
          onSelectOption={setViewMode}
        />
      )}
    </Fragment>
  )
}

UpdatesFeed.displayName = 'UpdatesFeed'

UpdatesFeed.propTypes = {
  listStartDateISO: PropTypes.object.isRequired,
  isAutomaticMapFitting: PropTypes.bool,
  isRealtime: PropTypes.bool.isRequired,
  onDemandCount: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  viewMode: PropTypes.string.isRequired,

  loadItemsAfter: PropTypes.func.isRequired,
  enableRealtime: PropTypes.func.isRequired,
  onAutoMapFittingChange: PropTypes.func.isRequired,
  moveOnDemandIdsToTheFeed: PropTypes.func.isRequired,
  setViewMode: PropTypes.func.isRequired,
  subscribeUpdatesFeed: PropTypes.func.isRequired,
  unsubscribeUpdatesFeed: PropTypes.func.isRequired
}

export default memo(UpdatesFeed)
