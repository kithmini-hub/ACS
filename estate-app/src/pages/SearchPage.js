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
  //add fave state
  const [favorites, setFavorites] = useState([]);
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
      </div>

      {/* Results Display */}
      {/* NEW ADD: This "wrapper" div creates the two columns */}
      <div style={{ display: 'flex', gap: '20px', padding: '20px', alignItems: 'flex-start' }}>
        
        {/* COLUMN 1: Your Results */}
        <div style={{ flex: '3' }}>
          <h2>Search Results</h2>
          <div className="results-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* FILTERING LOGIC: We take the properties array and chain multiple .filter() methods */}
            {properties
              .filter(p => type === 'Any' || p.type === type)
              .filter(p => p.price >= minPrice && p.price <= maxPrice)
              .filter(p => p.bedrooms >= minBed && p.bedrooms <= maxBed)
              .filter(p => p.location.startsWith(postcode))
              .map(p => (
                <Link to={`/property/${p.id}`} key={p.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {/* DRAGGABLE: enablin drag and store the property ID in the dataTransfer object */}
                  <div className="house-card" draggable 
                  onDragStart={(e) => e.dataTransfer.setData("id", p.id)}
                  style={{ border: '1px solid #ccc', margin: '10px', padding: '15px', borderRadius: '8px', width: '300px', textAlign: 'left', backgroundColor: 'white', cursor: 'pointer' }}>
                    <h3>{p.type} - {p.location}</h3>
                    <img src={`/images/${p.picture}`} alt={p.type} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '5px', marginBottom: '10px' }} />
                    <p><strong>Price:</strong> £{p.price}</p>
                    <p><strong>Bedrooms:</strong> {p.bedrooms}</p>
                    <p style={{ fontSize: '0.9rem', color: '#555' }}>{p.description.substring(0, 100)}...</p>
                    
                    <button style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', width: '100%' }}>View Details</button>
                    
                    <button 
                      onClick={(e) => addToFavorites(e, p)}
                      style={{ width: '100%', marginTop: '5px', backgroundColor: '#ffc107', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
                    >
                       Add to Favorites
                    </button>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        {/* COLUMN 2: The Favorites Sidebar */}
        <div 
          onDragOver={(e) => e.preventDefault()} //preventDefault to allow a "drop" to happen
          onDrop={(e) => {
            const id = e.dataTransfer.getData("id"); // Retrieve the ID we "packed" during onDragStart
            const property = properties.find(p => p.id === id); // Find the full house object using that ID
            if (property) addToFavorites(e, property); // Add it to the favorites state
          }}
          style={{ flex: '1', background: '#f9f9f9', padding: '15px', borderRadius: '10px', border: '2px dashed #ccc', minHeight: '400px' }}
        >
          <h2> Favorites</h2>
          
          {/* Add "Clear All" bButtonj */}
          {favorites.length > 0 && (
            <button onClick={() => setFavorites([])} style={{marginBottom: '10px', cursor: 'pointer'}}>
              Clear All
            </button>
          )}

          {/* If the array is empty, show text. Otherwise, .map() through favorites to display them */}
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

      </div> {/* Closes the flex wrapper */}
    </div>
  );
}

export default SearchPage;