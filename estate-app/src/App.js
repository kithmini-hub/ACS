import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage'; 

function App() {
  return (
    <Router>
      {/* THE NAVIGATION BAR */}
      <nav style={{ 
        background: 'white', 
        padding: '10px 50px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid #e2e8f0'
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/logo192.png" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2c3e50' }}>
              Estate<span style={{color: '#61dafb'}}>React</span>
            </span>
          </Link>

        <div style={{ display: 'flex', gap: '30px' }}>
          <Link to="/" style={{ color: '#1e293b', textDecoration: 'none', fontWeight: '500' }}>Buy</Link>
          <Link to="/search" style={{ color: '#1e293b', textDecoration: 'none', fontWeight: '500' }}>Search</Link>
        </div>
      </nav>
      {/* THE ROUTES that tells React WHICH page to show based on the URL */}
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/search" element={<SearchPage />} />
        {/*thi is the dynamic route for the individual house details */}
        <Route path="/property/:id" element={<PropertyPage />} />
      </Routes>
    </Router>
  );
}

export default App;