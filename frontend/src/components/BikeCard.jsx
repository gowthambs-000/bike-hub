import React from 'react';

const BikeCard = ({ bike }) => {
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '20px', 
      borderRadius: '10px', 
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      width: '250px',
      color: '#2c3e50'
    }}>
      <h3 style={{ marginTop: '0', color: '#2c3e50' }}>{bike.name}</h3>
      <p style={{ margin: '5px 0' }}><strong>Type:</strong> {bike.type}</p>
      <p style={{ margin: '5px 0', color: '#e74c3c', fontWeight: 'bold' }}>
        Price: ${bike.pricePerDay}/day
      </p>
      <div style={{ marginTop: '15px' }}>
        <span style={{ 
          padding: '5px 10px', 
          borderRadius: '5px', 
          fontSize: '0.85em',
          backgroundColor: bike.isAvailable ? '#d4edda' : '#f8d7da',
          color: bike.isAvailable ? '#155724' : '#721c24'
        }}>
          {bike.isAvailable ? '● Available' : '● Rented Out'}
        </span>
      </div>
    </div>
  );
};

export default BikeCard;