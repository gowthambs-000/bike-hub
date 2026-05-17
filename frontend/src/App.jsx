import React from 'react';
import BikeList from './components/BikeList';

function App() {
  return (
    <div style={{ 
      backgroundColor: '#0f172a', 
      minHeight: '100vh', 
      color: '#f8fafc',
      fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      margin: '0',
      padding: '0'
    }}>
      {/* Premium Header */}
      <header style={{ 
        backgroundColor: '#1e293b', 
        borderBottom: '1px solid #334155', 
        padding: '25px 20px',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{ 
          margin: '0', 
          fontSize: '2.2rem', 
          fontWeight: '800', 
          letterSpacing: '1px',
          color: '#38bdf8' 
        }}>
          BIKE RENT HUB
        </h1>
        <p style={{ margin: '5px 0 0 0', color: '#94a3b8', fontSize: '0.95rem' }}>
          Exotic & Premium Superbike Showroom
        </p>
      </header>

      {/* Main Content Showcase */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        <BikeList />
      </main>
    </div>
  );
}

export default App;