import React from 'react';

const Loader = () => {
  const loaderContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#212121',
  };

  const loaderStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    border: '6px solid #ffffff',
    borderTop: '6px solid #ff4081',
    animation: 'spin 1s linear infinite',
  };

  const keyframes = `
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  return (
    <div style={loaderContainerStyle}>
      <style>{keyframes}</style>
      <div style={loaderStyle}></div>
    </div>
  );
};

export default Loader;
