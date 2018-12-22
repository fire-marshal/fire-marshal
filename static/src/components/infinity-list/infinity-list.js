import { PropTypes } from 'prop-types'
import { bind } from 'decko'
import { FixedSizeList as List } from 'react-window'
import React from 'react'

import { InfiniteLoader } from '../../hoc/Infinite-loader'

class InfinityList extends React.PureComponent {
  static displayName = 'InfinityList';

  static propTypes = {
    children: PropTypes.func.isRequired,
    hasMoreItems: PropTypes.bool,
    fallback: PropTypes.func.isRequired,
    itemCount: PropTypes.number.isRequired,
    loadMore: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    itemKey: PropTypes.func.isRequired,
    itemSize: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  }

  @bind
  _isItemLoaded ({ index }) {
    const { hasMoreItems, itemCount } = this.props
    return !hasMoreItems || index < itemCount
  }

  @bind
  _renderItem (args) {
    const { fallback, children } = this.props
    if (this._isItemLoaded(args)) {
      return children(args)
    } else {
      return fallback(args)
    }
  }

  render () {
    const { hasMoreItems, loadMore, height, itemKey, itemSize, width } = this.props
    const itemCount = hasMoreItems ? this.props.itemCount + 1 : this.props.itemCount

    return (
      <InfiniteLoader
        itemCount={itemCount}
        onEndReached={loadMore}
      >
        {({ onItemsRendered }) => (
          <List
            height={height}
            itemCount={itemCount}
            itemKey={itemKey}
            itemSize={itemSize}
            width={width}
            onItemsRendered={onItemsRendered}
          >
            {this._renderItem}
          </List>
        )}
      </InfiniteLoader>
    )
  }
}

export default InfinityList
