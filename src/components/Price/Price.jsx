// PriceContext.js
import React, { createContext, useContext, useState } from 'react';

const PriceContext = createContext();

export const PriceProvider = ({ children }) => {
  const [entryPrice, setEntryPrice] = useState(120);
  const [supportPrice, setSupportPrice] = useState(97);
  const [resistancePrice, setResistancePrice] = useState(140);
  const [arePricesVisible, setArePricesVisible] = useState(false);

  return (
    <PriceContext.Provider
      value={{
        entryPrice,
        setEntryPrice,
        supportPrice,
        setSupportPrice,
        resistancePrice,
        setResistancePrice,
        arePricesVisible,
        setArePricesVisible,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};

export const usePriceContext = () => useContext(PriceContext);
