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
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ 
        fontSize: '1.5rem', 
        color: '#f1f5f9', 
        marginBottom: '30px', 
        borderLeft: '4px solid #38bdf8', 
        paddingLeft: '15px' 
      }}>
        Available Showroom Fleet
      </h2>
      
      {error && (
        <p style={{ color: '#ef4444', fontWeight: 'bold', textAlign: 'center', backgroundColor: '#451a03', padding: '15px', borderRadius: '8px' }}>
          {error}
        </p>
      )}
      
      {/* Responsive Grid Container */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '30px',
        justifyContent: 'center'
      }}>
        {bikes.length === 0 && !error ? (
          <div style={{ 
            gridColumn: '1 / -1', 
            padding: '5px0px', 
            backgroundColor: '#1e293b', 
            borderRadius: '12px', 
            border: '2px dashed #475569', 
            textAlign: 'center' 
          }}>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
              Showroom is currently empty. Use Thunder Client to add your superbikes!
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