import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import FilterBar from '../components/FilterBar';

const CelebList = () => {
  const { celebs } = useData();
  const [filter, setFilter] = useState('ALL');

  const industries = ['ALL', ...new Set(celebs.map(c => c.industry))];
  const filteredCelebs = filter === 'ALL' ? celebs : celebs.filter(c => c.industry === filter);

  return (
    <div className="bg-white py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-1.5 bg-primary-red"></div>
            <span className="font-black text-primary-red uppercase tracking-[0.3em] text-sm">Pollywood Stars</span>
          </div>
          <h1 className="text-6xl font-black text-text-dark mb-16 tracking-tight">Celebrities</h1>

          <FilterBar 
            options={industries} 
            activeFilter={filter} 
            onFilterChange={setFilter} 
            label="Industry" 
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {filteredCelebs.map((celeb) => (
              <Link to={`/celeb/${celeb._id}`} key={celeb._id} className="group">
                <div className="relative overflow-hidden rounded-[2.5rem] mb-6 shadow-xl aspect-square">
                  <img src={celeb.image} alt={celeb.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-3" />
                  <div className="absolute inset-0 bg-primary-red opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-primary-red text-white text-[10px] font-black px-2 py-1 rounded shadow-lg uppercase">{celeb.industry}</span>
                  </div>
                </div>
                <div className="text-center">
                    <h3 className="text-2xl font-black text-text-dark mb-1 group-hover:text-primary-red transition-colors">{celeb.name}</h3>
                    <p className="text-text-gray font-bold text-sm uppercase tracking-widest">{celeb.role}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
    </div>
  );
};

export default CelebList;
