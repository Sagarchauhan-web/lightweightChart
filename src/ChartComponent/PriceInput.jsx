import React from "react";

const PriceInput = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col items-center">
      <label className="mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="border p-2 rounded"
        placeholder={`Set ${label}`}
      />
    </div>
  );
};

export default PriceInput;
