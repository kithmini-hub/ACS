import React, { useState } from 'react';
import properties from '../properties.json'; 
import '../App.css'; 
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 

function SearchPage() {
  const [type, setType] = useState('Any');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [minBed, setMinBed] = useState(0);
  const [maxBed, setMaxBed] = useState(10);
  const [postcode, setPostcode] = useState('');
  const [favorites, setFavorites] = useState([]);
  
  // Changed to null to support the DatePicker widget properly
  const [startDate, setStartDate] = useState(null); 
  const [endDate, setEndDate] = useState(null);

  const addToFavorites = (e, property) => {
    e.preventDefault();
    if (!favorites.find(fav => fav.id === property.id)) {
      setFavorites([...favorites, property]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

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

        <div style={{ marginTop: '15px', borderTop: '1px solid #ccc', paddingTop: '10px', display: 'flex', gap: '15px', justifyContent: 'center', alignItems: 'center' }}>
          <label>Added After: </label>
          <DatePicker 
            selected={startDate} 
            onChange={(date) => setStartDate(date)} 
            placeholderText="Select start date"
            isClearable 
            className="react-widget-styled"
          />
          <label style={{ marginLeft: '10px' }}> Added Before: </label>
          <DatePicker 
            selected={endDate} 
            onChange={(date) => setEndDate(date)} 
            placeholderText="Select end date"
            isClearable 
            className="react-widget-styled"
          />
        </div>
      </div>

      {/* Results and Favorites Wrapper */}
      <div style={{ display: 'flex', gap: '20px', padding: '20px', alignItems: 'flex-start' }}>
        
        {/* COLUMN 1: Search Results */}
        <div style={{ flex: '3' }}>
          <h2>Search Results</h2>
          <div className="results-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {properties
              .filter(p => type === 'Any' || p.type === type)
              .filter(p => p.price >= minPrice && p.price <= maxPrice)
              .filter(p => p.bedrooms >= minBed && p.bedrooms <= maxBed)
              .filter(p => p.location.startsWith(postcode))
              .filter(p => {
                if (!startDate && !endDate) return true;
                const propertyDate = new Date(`${p.added.month} ${p.added.day}, ${p.added.year}`);
                const isAfter = !startDate || propertyDate >= startDate;
                const isBefore = !endDate || propertyDate <= endDate;
                return isAfter && isBefore;
              })
              .map(p => (
                <div key={p.id} className="house-card" draggable 
                  onDragStart={(e) => e.dataTransfer.setData("id", p.id)}
                  style={{ border: '1px solid #ccc', margin: '10px', padding: '15px', borderRadius: '8px', width: '300px', textAlign: 'left', backgroundColor: 'white', cursor: 'pointer' }}>
                  
                  <Link to={`/property/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3>{p.type} - {p.location}</h3>
                    <img src={`/images/${p.picture}`} alt={p.type} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '5px', marginBottom: '10px' }} />
                    <p><strong>Price:</strong> £{p.price}</p>
                    <p><strong>Bedrooms:</strong> {p.bedrooms}</p>
                    <p style={{ fontSize: '0.9rem', color: '#555' }}>{p.description.substring(0, 100)}...</p>
                    <button style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', width: '100%', cursor: 'pointer' }}>View Details</button>
                  </Link>

                  <button 
                    onClick={(e) => addToFavorites(e, p)}
                    style={{ width: '100%', marginTop: '5px', backgroundColor: '#ffc107', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
                  >
                    Add to Favorites
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* COLUMN 2: Favorites Sidebar */}
        <div 
          onDragOver={(e) => e.preventDefault()} 
          onDrop={(e) => {
            const id = e.dataTransfer.getData("id");
            const property = properties.find(p => p.id === id);
            if (property) addToFavorites(e, property);
          }}
          style={{ flex: '1', background: '#f9f9f9', padding: '15px', borderRadius: '10px', border: '2px dashed #ccc', minHeight: '400px' }}
        >
          <h2>Favorites</h2>
          
          {favorites.length > 0 && (
            <button onClick={() => setFavorites([])} style={{marginBottom: '10px', cursor: 'pointer', background: '#ff4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px'}}>
              Clear All
            </button>
          )}

          {favorites.length === 0 ? <p>Your list is empty. Drag properties here!</p> : favorites.map(fav => (
            <div key={fav.id} style={{ background: 'white', padding: '10px', marginBottom: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textAlign: 'left' }}>
              <h4 style={{ margin: '0' }}>{fav.type}</h4>
              <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>{fav.location}</p>
              <button 
                onClick={() => removeFromFavorites(fav.id)} 
                style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', padding: '0', fontSize: '0.8rem' }}
              >
                [ Remove ]
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;