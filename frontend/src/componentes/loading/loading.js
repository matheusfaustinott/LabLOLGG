import React from 'react';

const modalStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
};

const paperStyles = {
  backgroundColor: '#fff',
  borderRadius: 10,
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
  padding: '16px 32px 24px',
  textAlign: 'center',
  outline: 'none',
};

const imageStyles = {
  width: '100%',
  maxWidth: 200,
  marginBottom: 16,
};

const LoadingComponent = ({ open }) => {
  if (!open) return null;

  return (
    <div style={modalStyles}>
      <div style={paperStyles}>
        <h2>Carregando dados do invocador</h2>
        <img 
          src="https://i.pinimg.com/originals/1b/28/70/1b287016548914a63010f89609a0800a.gif" 
          alt="loading" 
          style={imageStyles} 
        />
      </div>
    </div>
  );
};

export default LoadingComponent;
