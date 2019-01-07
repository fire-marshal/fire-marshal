import './map-container.scss'

import FireImage from './markers/fire-marker.png'
import SelectedFireImage from './markers/fire-marker-selected.png'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'

import { useResizeComponent } from '../../hooks/use-resize-component'

const fireIcon = L.icon({
  iconAnchor: [16, 37],
  iconSize: [32, 37],
  iconUrl: FireImage
})

const selectedFireIcon = L.icon({
  iconAnchor: [16, 37],
  iconSize: [32, 37],
  iconUrl: SelectedFireImage
})

/**
 * catch event when user is moving map
 *
 * @param map
 * @param onUserMove
 * @returns {*[]}
 */
const useUserIsMoving = ({ map, onUserMove }) => {
  const [isUserMoving, userIsMoving] = useState(false)
  const [isComputerMoving, computerIsMoving] = useState(false)

  useEffect(() => {
    if (!map) {
      return
    }

    function handleMoveStart () {
      if (!isComputerMoving && !isUserMoving) {
        userIsMoving(true)
        onUserMove && onUserMove()
      }
    }

    function handleMoveEnd () {
      if (isComputerMoving) {
        computerIsMoving(false)
      }
    }

    map.on('movestart', handleMoveStart)
    map.on('moveend', handleMoveEnd)

    return () => {
      map.off('movestart', handleMoveStart)
      map.off('moveend', handleMoveEnd)
    }
    // FIXME: isn't optimal solution
    // because handle bind to specific state value
    // we should re-subsribe each new state value (isComputerMoving and isUserMoving)
  }, [isComputerMoving, isUserMoving, map])

  return [isUserMoving, userIsMoving, isComputerMoving, computerIsMoving]
}

const FeedMap = ({
  isAutomaticMapFitting, itemsBounce, listItems, selectedItem,
  onSelect, onUnSelect, onUserMove
}) => {
  const mapRef = useRef()

  const [map, setMap] = useState()
  const [markersLayer, setMarkersLayer] = useState()
  const [selectionLayer, setSelectionLayer] = useState()

  const [isUserMoving, userIsMoving, , computerIsMoving] = useUserIsMoving({ map, onUserMove })

  useEffect(() => {
    userIsMoving(!isAutomaticMapFitting)
    // if (isAutomaticMapFitting) {
    // }
  }, [isAutomaticMapFitting])

  useResizeComponent(mapRef, () => {
    // panning will not occur
    map && map.invalidateSize({ pan: false })
  }, [map])

  // map updater
  useEffect(() => {
    console.log('create map!')

    computerIsMoving(true)

    const map = L.map(mapRef.current).setView([51.505, -0.09], 4)
    setMap(map)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    let layer = L.featureGroup().addTo(map)
    setMarkersLayer(layer)

    layer = L.featureGroup().addTo(map)
    setSelectionLayer(layer)

    map.on('click', onUnSelect)

    return () => {
      console.log('TODO: we may need to clean map')
    }
  }, [mapRef])

  // evidences layer updater
  useEffect(() => {
    if (!markersLayer) {
      console.log('markers layer is not ready yet')
      return
    }

    if (!listItems || listItems.length === 0) {
      console.log('empty items list')
      // maybe we need to remove items we had before
      return
    }

    listItems.forEach(item => {
      markersLayer.addLayer(
        L.marker(item.location.center, { icon: fireIcon })
          .on('click', () => onSelect(item.id))
      )
    })

    if (itemsBounce && !isUserMoving) {
      computerIsMoving(true)
      map.fitBounds(itemsBounce)
    }

    return () => {
      markersLayer.clearLayers()
    }
  }, [listItems, markersLayer])

  // selection layer updater
  useEffect(() => {
    if (selectionLayer && selectedItem && selectedItem.location) {
      selectionLayer.addLayer(
        L.marker(selectedItem.location.center, { icon: selectedFireIcon })
      )
    }

    return () => {
      selectionLayer && selectionLayer.clearLayers()
    }
  }, [selectedItem, selectionLayer])

  return (
    <div ref={mapRef} className='map-container'/>
  )
}

FeedMap.displayName = 'FeedMap'

FeedMap.propTypes = {
  isAutomaticMapFitting: PropTypes.bool,
  itemsBounce: PropTypes.arrayOf(PropTypes.array),
  listItems: PropTypes.array,
  selectedItem: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  onUnSelect: PropTypes.func.isRequired,
  onUserMove: PropTypes.func.isRequired
}

export default FeedMap
