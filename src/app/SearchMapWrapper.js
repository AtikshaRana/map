'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import SearchBox from './SearchBox';

// 👇 Dynamically import the map with SSR disabled
const Maps = dynamic(() => import('./Maps'), { ssr: false });

export default function SearchMapWrapper() {
  const [position, setPosition] = useState([29.7604, -95.3698]); // Houston
  const [activeLocation, setActiveLocation] = useState(null);

  return (
    <div>
      <SearchBox setPosition={setPosition} setActiveLocation={setActiveLocation} />
      <Maps position={position} activeLocation={activeLocation} />
    </div>
  );
}
