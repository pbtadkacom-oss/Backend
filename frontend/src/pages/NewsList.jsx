import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import FilterBar from '../components/FilterBar';

const NewsList = () => {
  const { news } = useData();
  const [filter, setFilter] = useState('ALL');
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Just Now';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const categories = ['ALL', ...new Set(news.map(item => item.category))];
  const filteredNews = filter === 'ALL' ? news : news.filter(item => item.category === filter);

  return (
    <div className="bg-gray-50 py-12">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="mb-12">
            <h1 className="text-5xl font-black text-text-dark mb-4">Latest Updates</h1>
            <p className="text-text-gray text-lg mb-10">Fresh news from the heart of Punjabi film industry.</p>
            
            <FilterBar 
              options={categories} 
              activeFilter={filter} 
              onFilterChange={setFilter} 
              label="Category" 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((article) => (
              <Link to={`/news/${article._id}`} key={article._id} className="group no-underline">
                <article className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                  <div className="relative h-[240px] overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 left-4 bg-primary-red text-white px-4 py-1.5 rounded-full text-xs font-black shadow-lg">
                      {article.category}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="text-text-gray text-xs font-bold mb-4 flex items-center gap-2">
                      <i className="far fa-calendar-alt text-primary-red"></i> {formatDate(article.createdAt || article.date)}
                    </div>
                    <h2 className="text-2xl font-black text-text-dark mb-4 group-hover:text-primary-red transition-colors leading-tight">
                      {article.title}
                    </h2>
                    <p className="text-text-gray leading-relaxed mb-6 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto pt-6 border-t border-gray-50 text-primary-red font-black text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                      CONTINUE READING <i className="fas fa-arrow-right"></i>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
    </div>
  );
};

export default NewsList;
