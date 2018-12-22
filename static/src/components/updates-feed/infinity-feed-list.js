import { bind, debounce } from 'decko'
import PropTypes from 'prop-types'
import React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'

import config from '../../config'

import { InfinityList } from '../infinity-list'

import UpdatesFeedItem from './updates-feed-item'

const ITEM_SIZE = 622

export class InfinityFeedList extends React.PureComponent {
  static dialogName = 'InfinityFeedList';

  static propTypes = {
    list: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,

    loadItemsAfter: PropTypes.func.isRequired,
    subscribeUpdatesFeed: PropTypes.func.isRequired
  }

  @bind
  @debounce(config.evidences.debounceDelay)
  _loadBefore () {
    const { location } = this.props.user
    const { startDateISO } = this.props.list
    this.props.loadItemsAfter({ ...location, startDateISO })
    this.props.subscribeUpdatesFeed({ location, startDateISO })
  }

  @bind
  _itemKey (index) {
    const { list } = this.props
    const item = list.items[index]
    return (item && item.id) ? item.id : index
  }

  @bind
  _renderItem ({ index, style }) {
    const { list } = this.props
    const item = list.items[index]
    return (
      <div style={style}>
        <UpdatesFeedItem item={item}/>
      </div>
    )
  }

  @bind
  _renderFallback ({ index, style }) {
    return (
      <div key={index} style={style} className='loader'>Loading ...</div>
    )
  }

  render () {
    const {
      list
    } = this.props

    if (list.invalid) {
      this._loadBefore()
    }

    const itemCount = list.items ? list.items.length : 0
    const hasMore = list.hasMore && !list.invalid
    /* FIXME just temporal solution */

    return (
      <AutoSizer>
        {({ height, width }) => (
          <InfinityList
            height={height}
            itemCount={itemCount}
            itemKey={this._itemKey}
            itemSize={ITEM_SIZE}
            loadMore={this._loadBefore}
            hasMoreItems={hasMore}
            fallback={this._renderFallback}
            width={width}
          >
            {this._renderItem}
          </InfinityList>
        )}
      </AutoSizer>
    )
  }
}
