import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import properties from '../properties.json';

function PropertyPage() {
  const { id } = useParams();
  const property = properties.find(p => p.id === id);
  const [activeTab, setActiveTab] = useState('description');
  const [mainImage, setMainImage] = useState(null);

  if (!property) return <h2 style={{ textAlign: 'center' }}>Property not found</h2>;

  //array for simulate 6 gallery images
  const galleryImages = [1, 2, 3, 4, 5, 6]; 
  const currentMainImage = mainImage || `/images/${property.picture}`;

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1>{property.type} in {property.location}</h1>
      
      {/* IMAGE GALLARY */}
      <div className="gallery-section">
        <img 
          src={currentMainImage} 
          alt="Main" 
          style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '10px' }} 
        />
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px', overflowX: 'auto', padding: '10px 0' }}>
          {galleryImages.map(num => (
            <img 
              key={num} 
              src={`/images/${property.id}-${num}.jpg`} 
              alt={`Thumbnail ${num}`}
              onClick={() => setMainImage(`/images/${property.id}-${num}.jpg`)}
              style={{ width: '100px', height: '70px', objectFit: 'cover', cursor: 'pointer', borderRadius: '5px', border: '2px solid #ccc' }}
              // error handlingh 
              onError={(e) => { e.target.src = `/images/${property.picture}`; }} 
            />
          ))}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Price: £{property.price}</h2>
        <p><strong>Bedrooms:</strong> {property.bedrooms} | <strong>Tenure:</strong> {property.tenure}</p>
      </div>

      {/*TABS (Description, Floorplan, Map) */}
      <div style={{ marginTop: '40px' }}>
        <div style={{ display: 'flex', borderBottom: '2px solid #ddd' }}>
          {['description', 'floorplan', 'map'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px',
                cursor: 'pointer',
                background: activeTab === tab ? '#007bff' : 'none',
                color: activeTab === tab ? 'white' : 'black',
                border: 'none',
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px',
                textTransform: 'capitalize',
                fontWeight: 'bold'
              }}
            >
              {tab === 'map' ? 'Google Map' : tab}
            </button>
          ))}
        </div>

        <div style={{ padding: '20px', border: '1px solid #ddd', borderTop: 'none', minHeight: '300px' }}>
          {activeTab === 'description' && (
            <div>
              <h3>Property Description</h3>
              <p style={{ lineHeight: '1.6' }}>{property.description}</p>
            </div>
          )}

          {activeTab === 'floorplan' && (
            <div style={{ textAlign: 'center' }}>
              <h3>Floor Plan</h3>
              <img 
                src={`/images/floorplan-${property.id}.jpg`} 
                alt="Floor Plan" 
                style={{ maxWidth: '100%', maxHeight: '400px' }}
                onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Floorplan+Image+Missing"; }}
              />
            </div>
          )}

          {activeTab === 'map' && (
            <div style={{ width: '100%', height: '400px' }}>
              <h3>Location</h3>
              <iframe
                title="Google Map"
                width="100%"
                height="350"
                frameBorder="0"
                style={{ border: 0, borderRadius: '8px' }}
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY_HERE&q=${property.location}+London`}
                allowFullScreen
              ></iframe>
              <p><small>* Note: Map requires an API key, or use a static image for the demo.</small></p>
            </div>
          )}
        </div>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>← Back to Search</Link>
      </div>
    </div>
  );
}

export default PropertyPage;