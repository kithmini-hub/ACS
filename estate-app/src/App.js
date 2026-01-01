import React, { useState } from 'react';
import properties from './properties.json';
import './App.css';

function App() {
  const [type, setType] = useState('Any');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  // NEW: Bedroom and Postcode states
  const [minBed, setMinBed] = useState(0);
  const [maxBed, setMaxBed] = useState(10);
  const [postcode, setPostcode] = useState('');

  return (
    <div className="App">
      <h1>Estate Agent Search</h1>
      
      <div className="search-container" style={{background: '#eee', padding: '20px', borderRadius: '10px'}}>
        {/* Row 1: Type and Price */}
        <div style={{marginBottom: '10px'}}>
          <label>Type: </label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Any">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>

          <label> Min Price: </label>
          <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
          
          <label> Max Price: </label>
          <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </div>

        {/* Row 2: NEW Bedrooms and Postcode */}
        <div>
          <label>Min Beds: </label>
          <input type="number" value={minBed} onChange={(e) => setMinBed(e.target.value)} />

          <label> Max Beds: </label>
          <input type="number" value={maxBed} onChange={(e) => setMaxBed(e.target.value)} />

          <label> Postcode (e.g. NW1): </label>
          <input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value.toUpperCase())} />
        </div>
      </div>

      <div className="results-list">
        {properties
          .filter(p => type === 'Any' || p.type === type)
          .filter(p => p.price >= minPrice && p.price <= maxPrice)
          // NEW: Filter logic for Beds and Postcode
          .filter(p => p.bedrooms >= minBed && p.bedrooms <= maxBed)
          .filter(p => p.location.startsWith(postcode))
          .map(p => (
            <div key={p.id} className="house-card" style={{border: '1px solid black', margin: '10px', padding: '10px'}}>
              <h3>{p.type} - {p.location}</h3>
              <p>Price: £{p.price} | Bedrooms: {p.bedrooms}</p>
              <p>{p.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;