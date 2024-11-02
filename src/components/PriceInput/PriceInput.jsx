 import React from "react";

function PriceInput({ label, price, setPrice }) {
  const handleChange = (e) => {
    setPrice(parseFloat(e.target.value));
  };

  return (
    <div className="flex items-center space-x-2">
      <label className="font-medium">{label}:</label>
      <input
        type="number"
        value={price}
        onChange={handleChange}
        className="w-20 p-1 border rounded"
      />
    </div>
  );
}

export default PriceInput;
