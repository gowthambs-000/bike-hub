import React from 'react';
import BikeList from './components/BikeList';

function App() {
  return (
    <div style={{ fontFamily: 'Segoe UI, Geneva, Verdana, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ backgroundColor: '#2c3e50', color: 'white', padding: '20px', borderRadius: '0 0 10px 10px' }}>
        <h1 style={{ margin: '0' }}>🚲 Elite Bike Rental Hub</h1>
      </header>
      <main>
        <BikeList />
      </main>
    </div>
  );
}

export default App;