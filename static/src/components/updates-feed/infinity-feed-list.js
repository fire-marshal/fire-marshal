import { bind, debounce } from 'decko'
import PropTypes from 'prop-types'
import React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'

import config from '../../config'

import { InfinityList } from '../infinity-list'

import UpdatesFeedItem from './updates-feed-item'

export class InfinityFeedList extends React.Component {
  static dialogName = 'InfinityFeedList';

  static propTypes = {
    list: PropTypes.object.isRequired,
    selectedId: PropTypes.string,
    selectionSource: PropTypes.string,
    user: PropTypes.object.isRequired,

    onSelect: PropTypes.func.isRequired,
    loadItemsAfter: PropTypes.func.isRequired,
    subscribeUpdatesFeed: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this._infinityList = React.createRef()
    this._itemWidth = null
    this._itemHeight = null
    this.state = {
      // height of item of infinity list, it could change when we change width of list
      // for example by showing map or scale browser
      itemHeight: 650
    }
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
  _onItemResize (size) {
    const { height, width } = size
    if (this._itemWidth !== width) {
      this._itemWidth = width
      this._onItemChangeWidth(width)
    }

    if (this._itemHeight !== height) {
      this._itemHeight = height
      this._onItemChangeHeight(height)
    }
  }

  @bind
  @debounce(200)
  _onItemChangeHeight (itemHeight) {
    this.setState({ itemHeight })
  }

  @bind
  @debounce(200)
  _onItemChangeWidth (width) {
  }

  @bind
  _onItemOver (item) {
    this.props.onSelect(item.id)
  }

  @bind
  _renderItem ({ index, style }) {
    const { list } = this.props
    const item = list.items[index]
    return (
      <div style={style}>
        <UpdatesFeedItem
          isSelected={item.id === this.props.selectedId}
          item={item}
          onMouseOver={this._onItemOver}
          onResize={this._onItemResize}
        />
      </div>
    )
  }

  @bind
  _renderFallback ({ index, style }) {
    return (
      <div key={index} style={style} className='loader'>Loading ...</div>
    )
  }

  _scrollToItem (id) {
    const idx = this.props.list.items.findIndex(i => i.id === id)
    this._infinityList.current.scrollToItem(idx, 'center')
  }

  componentDidUpdate (prevProps) {
    const { selectedId, selectionSource } = this.props
    if (selectedId !== prevProps.selectedId && selectionSource !== 'list') {
      this._scrollToItem(selectedId)
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.list !== this.props.list ||
      nextProps.user !== this.props.user ||
      nextState.itemHeight !== this.state.itemHeight
  }

  render () {
    const {
      list
    } = this.props

    const {
      itemHeight
    } = this.state

    if (list.invalid) {
      this._loadBefore()
    }

    if (Number.isNaN(itemHeight) || itemHeight <= 0) {
      throw new Error('incorrect infinityFeedListItemHeight value', itemHeight)
    }

    const itemCount = list.items ? list.items.length : 0
    const hasMore = list.hasMore && !list.invalid
    /* FIXME just temporal solution */

    return (
      <AutoSizer>
        {({ height, width }) => (
          <InfinityList
            ref={this._infinityList}
            height={height}
            itemCount={itemCount}
            itemKey={this._itemKey}
            itemSize={itemHeight}
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
