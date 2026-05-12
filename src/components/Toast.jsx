import React from 'react';
import './Toast.css';

const Toast = ({ message }) => {
  if (!message) return null;
  return (
    <div className="toast" role="status" aria-live="polite">
      ✓ {message}
    </div>
  );
};

export default Toast;
