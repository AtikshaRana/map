'use client';
import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { locations } from './locations';
import SearchBox from './SearchBox';

// Fix Leaflet marker icon in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function FlyToLocation({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 14); // fly to location
    }
  }, [position, map]);

  return null;
}

export default function Maps() {
  const [position, setPosition] = useState([29.707, -95.390]); // default map center
  const [activeLocation, setActiveLocation] = useState(null);
  const markerRefs = useRef({}); // to store marker refs

  // Automatically open popup on selected location
  useEffect(() => {
    if (activeLocation) {
      const markerRef = markerRefs.current[activeLocation.name];
      if (markerRef && markerRef.openPopup) {
        markerRef.openPopup();
      }
    }
  }, [activeLocation]);

  return (
    <div>
      <SearchBox setPosition={setPosition} setActiveLocation={setActiveLocation} />

      <div className="h-[500px] w-full">
        <MapContainer center={position} zoom={11} scrollWheelZoom={true} className="h-full w-full z-0">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=GSJerKPExUsvQv3unvD8"
          />

          <FlyToLocation position={position} />

          {locations.map((location, index) => (
            <Marker
              key={index}
              position={location.position}
              ref={(ref) => {
                if (ref) {
                  markerRefs.current[location.name] = ref;
                }
              }}
            >
              <Popup>
                <h3 className="font-bold">{location.name}</h3>
                <p className="text-sm">{location.description}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
