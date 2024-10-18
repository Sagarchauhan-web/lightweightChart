import React from 'react';

const PanelToggle = ({ isBuyMode, handleToggleBuySell }) => {
  return (
    <div className="absolute top-4 right-4">
      <div
        style={{
          padding: '10px 20px',
          backgroundColor: isBuyMode ? '#4caf50' : '#f44336',
          color: 'white',
          cursor: 'pointer',
          borderRadius: '8px',
          fontWeight: 'bold',
        }}
        onClick={handleToggleBuySell}
      >
        {isBuyMode ? 'Buy' : 'Sell'}
      </div>
    </div>
  );
};

export default PanelToggle;
