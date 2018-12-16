import './map-container.scss'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import React, { useEffect, useRef } from 'react'

const MapContainer = () => {
  const mapRef = useRef()
  useEffect(() => {
    console.log('create map!')
    const map = L.map(mapRef.current).setView([51.505, -0.09], 13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)
  }, [mapRef])

  return (
    <div ref={mapRef} className='map-container' />
  )
}

MapContainer.displayName = 'MapContainer'

export default MapContainer
