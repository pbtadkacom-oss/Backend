import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import FilterBar from '../components/FilterBar';

const MovieList = () => {
  const { movies } = useData();
  const [filter, setFilter] = useState('ALL');

  const industries = ['ALL', ...new Set(movies.map(m => m.industry))];
  const filteredMovies = filter === 'ALL' ? movies : movies.filter(m => m.industry === filter);

  return (
    <div className="bg-text-dark text-white py-24 min-h-screen">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">Box Office</h1>
            <p className="text-text-gray text-xl max-w-2xl mx-auto">Latest Punjabi movies taking over the cinema screens and hearts of fans worldwide.</p>
          </div>

          <FilterBar 
            options={industries} 
            activeFilter={filter} 
            onFilterChange={setFilter} 
            label="Industry" 
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {filteredMovies.map((movie) => (
              <Link to={`/movie/${movie._id}`} key={movie._id} className="group">
                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-6 shadow-2xl">
                  <img src={movie.image} alt={movie.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-primary-red text-white text-[10px] font-black px-2 py-1 rounded shadow-lg uppercase">{movie.industry}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10">
                    <span className="bg-accent-gold text-black text-[10px] font-black px-2 py-1 rounded">⭐ {movie.rating}</span>
                    <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded">{movie.year}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary-red transition-colors">{movie.title}</h3>
                <span className="text-text-gray text-sm">{movie.genre}</span>
              </Link>
            ))}
          </div>
        </div>
    </div>
  );
};

export default MovieList;
