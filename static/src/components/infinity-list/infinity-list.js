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
    itemKey: PropTypes.func.isRequired,
    itemSize: PropTypes.number.isRequired,
    itemData: PropTypes.array,
    loadMore: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  }

  constructor (props) {
    super(props)
    this._list = React.createRef()
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

  scrollToItem (idx) {
    this._list.current.scrollToItem(idx, 'center')
  }

  render () {
    const { hasMoreItems, loadMore, height, itemKey, itemSize, itemData, width } = this.props
    const itemCount = hasMoreItems ? this.props.itemCount + 1 : this.props.itemCount

    // I need to pass custom field (`customFields`) to an list to force re-render
    // in case of changes in list of selection
    return (
      <InfiniteLoader
        itemCount={itemCount}
        onEndReached={loadMore}
      >
        {({ onItemsRendered }) => (
          <List
            ref={this._list}
            height={height}
            itemCount={itemCount}
            itemKey={itemKey}
            itemData={itemData}
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
