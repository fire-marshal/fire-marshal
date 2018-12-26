import './map-container.scss'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import React, { useState, useEffect, useRef } from 'react'

import { useResizeComponent } from '../../hooks/use-resize-component'

const MapContainer = () => {
  const mapRef = useRef()

  const [map, setMap] = useState()

  useResizeComponent(mapRef, () => {
    // panning will not occur
    map && map.invalidateSize({ pan: false })
  }, [map])

  // TODO: should call map.invalidateSize() on resize
  useEffect(() => {
    console.log('create map!')
    const map = L.map(mapRef.current).setView([51.505, -0.09], 4)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)
    setMap(map)
  }, [mapRef])

  return (
    <div ref={mapRef} className='map-container' />
  )
}

MapContainer.displayName = 'MapContainer'

export default MapContainer
