import React, { useState } from 'react';
import properties from '../properties.json'; // The ".." means look outside the pages folder
import '../App.css'; // Updated path to find your CSS
import { Link } from 'react-router-dom';

function SearchPage() {
  const [type, setType] = useState('Any');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [minBed, setMinBed] = useState(0);
  const [maxBed, setMaxBed] = useState(10);
  const [postcode, setPostcode] = useState('');

  return (
    <div className="App">
      <h1>Estate Agent Search</h1>
      
      {/* Search Controls */}
      <div className="search-container" style={{background: '#eee', padding: '20px', borderRadius: '10px', marginBottom: '20px'}}>
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

        <div>
          <label>Min Beds: </label>
          <input type="number" value={minBed} onChange={(e) => setMinBed(e.target.value)} />

          <label> Max Beds: </label>
          <input type="number" value={maxBed} onChange={(e) => setMaxBed(e.target.value)} />

          <label> Postcode: </label>
          <input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value.toUpperCase())} />
        </div>
      </div>

      {/* Results Display */}
      <div className="results-list" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {properties
          .filter(p => type === 'Any' || p.type === type)
          .filter(p => p.price >= minPrice && p.price <= maxPrice)
          .filter(p => p.bedrooms >= minBed && p.bedrooms <= maxBed)
          .filter(p => p.location.startsWith(postcode))
          .map(p => (
            <div key={p.id} className="house-card" style={{border: '1px solid #ccc', margin: '10px', padding: '15px', borderRadius: '8px', width: '300px', textAlign: 'left', backgroundColor: 'white'}}>
              <h3>{p.type} - {p.location}</h3>
              
              {/* Image Gallery Item */}
              <img 
                src={`/images/${p.picture}`} 
                alt={p.type} 
                style={{width: '100%', height: '180px', objectFit: 'cover', borderRadius: '5px', marginBottom: '10px'}} 
              />
              
              <p><strong>Price:</strong> £{p.price}</p>
              <p><strong>Bedrooms:</strong> {p.bedrooms}</p>
              <p style={{fontSize: '0.9rem', color: '#555'}}>{p.description}</p>
              
              {/* Link to Property Page */}
              <Link to={`/property/${p.id}`}>
                <button style={{
                  backgroundColor: '#007bff', 
                  color: 'white', 
                  border: 'none', 
                  padding: '10px', 
                  borderRadius: '5px', 
                  cursor: 'pointer',
                  width: '100%',
                  marginTop: '10px'
                }}>
                  View Details
                </button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchPage;