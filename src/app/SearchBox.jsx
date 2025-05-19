import React, { useState } from 'react';
import { locations } from './locations';

function SearchBox({ setPosition, setActiveLocation }) {
  const [query, setQuery] = useState('');

  const filtered = locations.filter((loc) =>
    loc.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleClick = (location) => {
    setPosition(location.position);
    setActiveLocation(location);
  };

  return (
    <div className="mb-4 max-w-3xl mx-auto h-[500px] overflow-y-auto ">
      <input
        type="text"
        placeholder="Search life science hubs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-300 p-2 w-full rounded"
      />

      {filtered.length > 0 && (
        <ul className="mt-2 bg-white shadow rounded">
          {filtered.map((loc, idx) => (
            <li
              key={idx}
              onClick={() => handleClick(loc)}
              className="p-3 border-b cursor-pointer hover:bg-gray-100"
            >
              <strong className='text-gray-600'>{loc.name}</strong>
              <p className="text-sm text-gray-600">{loc.description.slice(0, 80)}...</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;
