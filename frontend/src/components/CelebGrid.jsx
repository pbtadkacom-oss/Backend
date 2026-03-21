import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const CelebGrid = () => {
  const { celebs } = useData();
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6 pb-2.5 border-b-[3px] border-primary-red">
        <h2 className="text-3xl font-extrabold text-text-dark flex items-center">
          <i className="fas fa-star mr-2.5 text-primary-red"></i> Top Celebrities
        </h2>
        <Link to="/celebs" className="text-primary-red font-semibold no-underline text-sm hover:underline">
          View All Celebs <i className="fas fa-arrow-right ml-1"></i>
        </Link>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {celebs.slice(0, 4).map((celeb) => (
          <Link to={`/celeb/${celeb._id}`} key={celeb._id} className="bg-white rounded-lg overflow-hidden shadow-lg text-center hover:-translate-y-1 transition-all group no-underline text-inherit">
            <div className="h-[200px] overflow-hidden">
              <img 
                src={celeb.image} 
                alt={celeb.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <div className="font-bold text-lg mb-1 group-hover:text-primary-red transition-colors">{celeb.name}</div>
              <div className="text-primary-red text-sm font-semibold mb-2.5">{celeb.role}</div>
              <p className="text-text-gray text-xs leading-relaxed line-clamp-2">
                {celeb.bio}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CelebGrid;
