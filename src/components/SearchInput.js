import React from 'react';

function SearchInput({ value, onChange, onClick, placeholder, buttonText }) {
  return (
    <div className="flex items-center border border-white rounded">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 bg-darkest-blue text-white border-none"
      />
      <button
        onClick={onClick}
        className="py-2 px-4 bg-darker-blue text-white rounded hover:bg-darkest-blue border border-white"
      >
        {buttonText}
      </button>
    </div>
  );
}

export default SearchInput;