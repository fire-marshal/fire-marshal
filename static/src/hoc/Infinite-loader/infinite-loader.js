/**
 * Infinity Loader (Render-props)
 *
 * based on https://gist.github.com/superandrew213/22aca60ff7740eadc481b5d9a4eebdca
 */
import { PropTypes } from 'prop-types'
import { bind } from 'decko'
import React from 'react'

class InfiniteLoader extends React.Component {
  static displayName = 'InfiniteLoader';

  static propTypes = {
    itemCount: PropTypes.number.isRequired,
    children: PropTypes.func.isRequired,
    onTopReached: PropTypes.func,
    onEndReached: PropTypes.func
  }

  constructor (props) {
    super(props)
    this._lastPositions = null
  }

  render () {
    return this.props.children({
      onItemsRendered: this._onItemsRendered
    })
  }

  @bind
  _onItemsRendered (positionsData) {
    const { itemCount, onTopReached, onEndReached } = this.props
    const positions = this._getPositions(positionsData)

    const { visibleRowStartIndex, visibleRowStopIndex } = positions
    const scrollDirection = this._getScrollDirection(positions)
    // is needed in case of grid
    const columnCount = this._getColumnCount(positions)
    const lastRowIndex = Math.round(itemCount / columnCount) - 1

    // Reached top
    if (
      onTopReached &&
      visibleRowStartIndex === 0 &&
      scrollDirection === 'BACKWARD' &&
      this._didVisibleRowStartIndexChange(positions)
    ) {
      onTopReached()
    }

    // Reached bottom
    if (
      onEndReached &&
      visibleRowStopIndex === lastRowIndex &&
      scrollDirection === 'FORWARD' &&
      this._didVisibleRowStopIndexChange(positions)
    ) {
      onEndReached()
    }

    // Store last positions
    this._lastPositions = positions
  }

  // Support FixedSizeList & FixedSizeGrid
  @bind
  _getPositions (positionsData) {
    return {
      visibleColumnStopIndex: positionsData.visibleColumnStopIndex,
      visibleRowStartIndex: positionsData.visibleStartIndex !== null ? (
        positionsData.visibleStartIndex
      ) : (
        positionsData.visibleRowStartIndex
      ),
      visibleRowStopIndex: positionsData.visibleStopIndex !== null ? (
        positionsData.visibleStopIndex
      ) : (
        positionsData.visibleRowStopIndex
      )
    }
  }

  @bind
  _getColumnCount (positions) {
    return positions.visibleColumnStopIndex ? positions.visibleColumnStopIndex + 1 : 1
  }

  @bind
  _getScrollDirection (positions) {
    const {
      visibleRowStartIndex,
      visibleRowStopIndex
    } = positions

    if (this._lastPositions == null) {
      return
    }

    if (
      this._lastPositions.visibleRowStartIndex > visibleRowStartIndex ||
      this._lastPositions.visibleRowStopIndex > visibleRowStopIndex
    ) {
      return 'BACKWARD'
    }

    if (
      this._lastPositions.visibleRowStartIndex < visibleRowStartIndex ||
      this._lastPositions.visibleRowStopIndex < visibleRowStopIndex
    ) {
      return 'FORWARD'
    }
  }

  @bind
  _didVisibleRowStartIndexChange (positions) {
    return (
      this._lastPositions !== null &&
      this._lastPositions.visibleRowStartIndex !== positions.visibleRowStartIndex
    )
  }

  @bind
  _didVisibleRowStopIndexChange (positions) {
    return (
      this._lastPositions !== null &&
      this._lastPositions.visibleRowStopIndex !== positions.visibleRowStopIndex
    )
  }
}

export default InfiniteLoader
