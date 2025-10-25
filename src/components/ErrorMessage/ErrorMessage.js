import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ error }) => {
  if (!error) return null;
  
  return (
    <div className="error-message">
      <p>❌ {error}</p>
    </div>
  );
};

export default ErrorMessage;
