import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BikeCard from './BikeCard';

const BikeList = () => {
  const [bikes, setBikes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/bikes');
        setBikes(data);
      } catch (err) {
        setError('Could not connect to the backend server. Is it running?');
      }
    };
    fetchBikes();
  }, []); // Keeps it fetching strictly once

  return (
    <div style={{ padding: '20px', minHeight: '400px' }}>
      <h2 style={{ borderBottom: '2px solid #34495e', paddingBottom: '10px', color: '#2c3e50', textAlign: 'center' }}>
        Available Showroom Fleet
      </h2>
      
      {error && <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>{error}</p>}
      
      {/* Fixed layout grid container that prevents moving components */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        alignItems: 'center',
        gap: '20px',
        marginTop: '30px',
        width: '100%'
      }}>
        {bikes.length === 0 && !error ? (
          <div style={{ padding: '40px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px dashed #ccc', textAlign: 'center', width: '100%', maxWidth: '500px' }}>
            <p style={{ color: '#2c3e50', margin: '0 0 10px 0', fontWeight: 'bold' }}>
              🏪 Showroom Currently Empty
            </p>
            <p style={{ color: '#7f8c8d', margin: '0', fontSize: '0.9em' }}>
              Use Thunder Client to POST a bike to your backend API!
            </p>
          </div>
        ) : (
          bikes.map(bike => (
            <BikeCard key={bike._id} bike={bike} />
          ))
        )}
      </div>
    </div>
  );
};

export default BikeList;