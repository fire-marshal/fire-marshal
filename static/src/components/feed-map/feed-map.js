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
  isAutomaticMapFitting, itemsBounce, listItems, selectedItem, selectionSource,
  onSelect, onUnSelect, onUserMove
}) => {
  const mapRef = useRef()

  const [map, setMap] = useState()
  const [markersLayer, setMarkersLayer] = useState()
  const [markerById, setMarkerById] = useState({})

  const [isUserMoving, userIsMoving, , computerIsMoving] = useUserIsMoving({ map, onUserMove })

  useEffect(() => {
    userIsMoving(!isAutomaticMapFitting)

    if (itemsBounce && isAutomaticMapFitting && map) {
      computerIsMoving(true)
      map.fitBounds(itemsBounce)
    }
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

    const markerById = listItems.map(item => {
      const { id } = item
      const marker = L.marker(item.location.center, { icon: fireIcon })
        .on('click', () => onSelect(id))
      markersLayer.addLayer(marker)
      return { marker, id }
    })
      .reduce((acc, { marker, id }) => {
        acc[id] = marker
        return acc
      }, {})

    setMarkerById(markerById)

    if (itemsBounce && !isUserMoving) {
      computerIsMoving(true)
      map.fitBounds(itemsBounce)
    }

    return () => {
      markersLayer.clearLayers()
    }
  }, [listItems, markersLayer])

  // selection style updater
  useEffect(() => {
    let lastSelectedMarker = null
    if (selectedItem && selectedItem.location && markerById) {
      const selectedMarker = markerById[selectedItem.id]

      if (selectedMarker) {
        lastSelectedMarker = selectedMarker
        selectedMarker.setZIndexOffset(1000)
        selectedMarker.setIcon(selectedFireIcon)
      }

      if (selectionSource !== 'map') {
        if (!map.getBounds().contains(selectedItem.location.center)) {
          computerIsMoving(true)
          map && map.flyTo(selectedItem.location.center)
        }
      }
    }

    return () => {
      // revert unselected marker style
      if (lastSelectedMarker) {
        lastSelectedMarker.setZIndexOffset(0)
        lastSelectedMarker.setIcon(fireIcon)
      }
    }
  }, [selectedItem, markerById])

  return (
    <div ref={mapRef} className='map-container' />
  )
}

FeedMap.displayName = 'FeedMap'

FeedMap.propTypes = {
  isAutomaticMapFitting: PropTypes.bool,
  itemsBounce: PropTypes.arrayOf(PropTypes.array),
  listItems: PropTypes.array,
  selectedItem: PropTypes.object,
  selectionSource: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onUnSelect: PropTypes.func.isRequired,
  onUserMove: PropTypes.func.isRequired
}

export default FeedMap
