import React from 'react';

const FilterBar = ({ options, activeFilter, onFilterChange, label = "Filter By" }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
      <div className="flex items-center gap-4">
        <div className="w-8 h-1 bg-primary-red"></div>
        <span className="text-sm font-black uppercase tracking-widest text-text-gray">{label}</span>
      </div>
      
      <div className="flex flex-wrap justify-center gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onFilterChange(option)}
            className={`px-6 py-2 rounded-full font-black text-xs uppercase tracking-tighter transition-all duration-300 ${
              activeFilter === option
                ? 'bg-primary-red text-white shadow-[0_10px_20px_rgba(235,33,46,0.3)] scale-105'
                : 'bg-white text-text-dark border border-gray-100 hover:border-primary-red hover:text-primary-red'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
