'use client';
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function ChangeMapView({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 13);
  }, [position]);
  return null;
}

export default function Maps({ position, activeLocation }) {
  const markerRef = useRef(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [activeLocation]);

  return (
    <div className="h-[500px] w-full">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=GSJerKPExUsvQv3unvD8"
        />
        <ChangeMapView position={position} />
        {activeLocation && (
          <Marker position={activeLocation.position} ref={markerRef}>
            <Popup>
              <strong>{activeLocation.name}</strong>
              <p>{activeLocation.description}</p>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
