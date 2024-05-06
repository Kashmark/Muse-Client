import React from 'react';
import './Welcome.css'; // Import the CSS file

export const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Muse</h1>
      <div className="welcome-definition">/myooz/</div>
      <div className="welcome-description">-noun-</div>
      <div className="welcome-description">1. (in Greek and Roman mythology) each of nine goddesses, the daughters of Zeus and Mnemosyne, who preside over the arts and sciences.</div>
      <div className="welcome-description">2. a person or personified force who is the source of inspiration for a creative artist.</div>
    </div>
  );
};

