'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const Maps = dynamic(() => import('./Maps'), { ssr: false });

export default function SearchMapWrapper() {

  return (
    <div>
      <Maps />
    </div>
  );
}
