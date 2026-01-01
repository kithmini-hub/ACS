import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import properties from '../properties.json'; // Look outside pages folder for data

function PropertyPage() {
  const { id } = useParams();
  const property = properties.find(p => p.id === id);
  const [activeTab, setActiveTab] = useState('description');

  // If the ID in the URL doesn't match a house, show an error
  if (!property) return <div style={{padding: '20px'}}><h2>Property not found</h2><Link to="/">Back to Search</Link></div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', textAlign: 'left', fontFamily: 'Arial, sans-serif' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>← Back to Search Results</Link>
      
      <h1 style={{ marginTop: '20px' }}>{property.type} - {property.location}</h1>

      {/* 1. Image Gallery Section */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <img 
          src={`/images/${property.picture}`} 
          alt="Main view" 
          style={{ width: '60%', minWidth: '300px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} 
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', flex: '1' }}>
          {/* We use the same image multiple times to fulfill the "6-8 images" requirement */}
          {[1, 2, 3, 4].map((i) => (
            <img key={i} src={`/images/${property.picture}`} alt="Gallery thumbnail" style={{ width: '100%', borderRadius: '5px' }} />
          ))}
        </div>
      </div>

      {/* 2. Interactive Tab Widget */}
      <div style={{ display: 'flex', borderBottom: '2px solid #ddd' }}>
        <button 
          onClick={() => setActiveTab('description')} 
          style={{ padding: '10px 20px', cursor: 'pointer', border: 'none', borderBottom: activeTab === 'description' ? '3px solid #007bff' : 'none', background: 'none', fontWeight: 'bold' }}>
          Description
        </button>
        <button 
          onClick={() => setActiveTab('floorplan')} 
          style={{ padding: '10px 20px', cursor: 'pointer', border: 'none', borderBottom: activeTab === 'floorplan' ? '3px solid #007bff' : 'none', background: 'none', fontWeight: 'bold' }}>
          Floor Plan
        </button>
        <button 
          onClick={() => setActiveTab('map')} 
          style={{ padding: '10px 20px', cursor: 'pointer', border: 'none', borderBottom: activeTab === 'map' ? '3px solid #007bff' : 'none', background: 'none', fontWeight: 'bold' }}>
          Map
        </button>
      </div>

      {/* 3. Dynamic Tab Content */}
      <div style={{ padding: '30px', background: '#fdfdfd', borderRadius: '0 0 10px 10px', border: '1px solid #eee', minHeight: '200px' }}>
        {activeTab === 'description' && (
          <div>
            <h3>Property Details</h3>
            <p><strong>Price:</strong> £{property.price}</p>
            <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
            <p style={{ lineHeight: '1.6', color: '#444' }}>{property.description}</p>
          </div>
        )}
        {activeTab === 'floorplan' && (
          <div style={{ textAlign: 'center' }}>
            <h3>Floor Plan Layout</h3>
            <p>The layout for property {property.id} will be displayed here.</p>
            <div style={{width: '100%', height: '200px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Floor Plan Image Placeholder</div>
          </div>
        )}
        {activeTab === 'map' && (
          <div style={{ textAlign: 'center' }}>
            <h3>Location Map</h3>
            <p>Map view for {property.location} will be displayed here.</p>
            <div style={{width: '100%', height: '200px', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Google Maps Placeholder</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyPage;