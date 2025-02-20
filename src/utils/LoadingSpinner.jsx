// LoadingSpinner.js
import React from 'react';

function LoadingSpinner() {
  return (
    <p className="loading">
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" stroke="grey" strokeWidth="4" fill="none" />
        <circle cx="20" cy="20" r="18" stroke="blue" strokeWidth="4" strokeLinecap="round" fill="none" strokeDasharray="113.097" strokeDashoffset="56.548">
          <animate attributeName="stroke-dashoffset" from="113.097" to="0" dur="1s" repeatCount="indefinite" />
        </circle>
      </svg>
    </p>
  );
}

export default LoadingSpinner;
