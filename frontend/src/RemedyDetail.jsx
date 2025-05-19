import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RemedyDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { remedy, condition } = location.state || {};

  if (!remedy) {
    return (
      <div style={{ padding: 24 }}>
        <h2>No remedy data found.</h2>
        <button onClick={() => navigate(-1)} style={{ padding: '8px 20px', background: '#388e3c', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>&larr; Back</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '32px auto', background: '#f8fff8', padding: 32, borderRadius: 16, boxShadow: '0 2px 16px #0001' }}>
      <button
        onClick={() => navigate(-1)}
        style={{ padding: '10px 28px', background: '#388e3c', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 18, marginBottom: 24, cursor: 'pointer', boxShadow: '0 1px 4px #0002' }}
      >
        &larr; Back
      </button>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Text Content */}
        <div style={{ flex: 2, minWidth: 260 }}>
          <h1 style={{ fontSize: '2.5rem', color: '#216a2c', marginBottom: 0 }}>{remedy.name}</h1>
          <h3 style={{ color: '#388e3c', marginTop: 8 }}>{condition}</h3>
          <hr style={{ margin: '16px 0' }} />
          <p><strong>How to Use:</strong> {remedy.usage}</p>
          <p><strong>Additional Info:</strong> {remedy.info}</p>
          {remedy.symptoms && <p><strong>Symptoms:</strong> {remedy.symptoms}</p>}
          {remedy.precautions && <p><strong>Precautions:</strong> {remedy.precautions}</p>}
          {remedy.scientificInfo && <p><strong>Scientific Info:</strong> {remedy.scientificInfo}</p>}
        </div>
        {/* Image */}
        {remedy.image && (
          <div style={{ flex: 1, minWidth: 200, display: 'flex', justifyContent: 'center' }}>
            <img
              src={remedy.image}
              alt={remedy.name}
              style={{ maxWidth: 240, maxHeight: 240, borderRadius: 12, boxShadow: '0 2px 8px #0002', objectFit: 'cover' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RemedyDetail; 