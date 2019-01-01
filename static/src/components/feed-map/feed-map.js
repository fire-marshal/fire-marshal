import './map-container.scss'

import MarkerIcon from 'leaflet/dist/images/marker-icon.png'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'

import { useResizeComponent } from '../../hooks/use-resize-component'

// FIXME: remove once we will fix bug of frequent update
let previousListItems
let previousMarkersLayer

const FeedMap = ({ listItems }) => {
  const mapRef = useRef()

  const [map, setMap] = useState()
  const [markersLayer, setMarkersLayer] = useState()

  useResizeComponent(mapRef, () => {
    // panning will not occur
    map && map.invalidateSize({ pan: false })
  }, [map])

  // TODO: should call map.invalidateSize() on resize
  useEffect(() => {
    console.log('create map!')
    const map = L.map(mapRef.current).setView([51.505, -0.09], 4)
    setMap(map)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    let layer = L.featureGroup().addTo(map)
    setMarkersLayer(layer)
  }, [mapRef])

  useEffect(() => {
    console.log('put markets')
    if (!markersLayer) {
      console.log('markers layer is not ready yey')
      return
    }

    if (!listItems || listItems.length === 0) {
      console.log('empty items list')
      // maybe we need to remove items we had before
      return
    }

    console.log('previousListItems === listItems', previousListItems === listItems)
    previousListItems = listItems

    console.log('previousMarkersLayer === markersLayer', previousMarkersLayer === markersLayer)
    previousMarkersLayer = markersLayer

    let icon = L.icon({
      iconUrl: MarkerIcon
    })

    listItems.forEach(item => {
      markersLayer.addLayer(
        L.marker(item.location.center, { icon })
      )
    })

    return () => {
      console.log('clear layers')
      markersLayer.clearLayers()
    }
  }, [listItems, markersLayer])

  return (
    <div ref={mapRef} className='map-container' />
  )
}

FeedMap.displayName = 'FeedMap'

FeedMap.propTypes = {
  listItems: PropTypes.array
}

export default FeedMap
