import React from 'react';

const BikeCard = ({ bike }) => {
  return (
    <div style={{ 
      backgroundColor: '#1e293b', 
      border: '1px solid #334155', 
      borderRadius: '16px', 
      overflow: 'hidden',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%'
    }}>
      {/* Card Header Background Block */}
      <div style={{ backgroundColor: '#0f172a', padding: '20px', borderBottom: '1px solid #334155' }}>
        <h3 style={{ margin: '0', fontSize: '1.3rem', color: '#f8fafc', fontWeight: '700' }}>
          {bike.name}
        </h3>
      </div>

      {/* Details Body */}
      <div style={{ padding: '20px', flexGrow: '1' }}>
        <p style={{ margin: '0 0 12px 0', color: '#94a3b8', fontSize: '0.95rem' }}>
          <strong style={{ color: '#cbd5e1' }}>Category:</strong> {bike.type}
        </p>
        
        <p style={{ margin: '0', fontSize: '1.4rem', color: '#38bdf8', fontWeight: '800' }}>
          ${bike.pricePerDay} <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'normal' }}>/ day</span>
        </p>
      </div>

      {/* Status Badge Footer */}
      <div style={{ padding: '15px 20px', backgroundColor: '#111827', borderTop: '1px solid #1e293b' }}>
        <span style={{ 
          display: 'inline-flex',
          alignItems: 'center',
          padding: '6px 12px', 
          borderRadius: '9999px', 
          fontSize: '0.8rem',
          fontWeight: '700',
          letterSpacing: '0.5px',
          backgroundColor: bike.isAvailable ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          color: bike.isAvailable ? '#34d399' : '#f87171',
          border: bike.isAvailable ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
        }}>
          <span style={{ 
            width: '6px', 
            height: '6px', 
            borderRadius: '50%', 
            backgroundColor: bike.isAvailable ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            marginRight: '8px'
          }}></span>
          {bike.isAvailable ? 'AVAILABLE' : 'RENTED'}
        </span>
      </div>
    </div>
  );
};

export default BikeCard;