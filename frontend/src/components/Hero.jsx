import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Hero = () => {
  const { news } = useData();

  if (!news || news.length === 0) return null;

  const mainStory = news[0];
  const sideStories = news.slice(1, 4);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
      {/* Main Feature Story (8 cols) */}
      <Link to={`/news/${mainStory._id}`} className="lg:col-span-8 group relative overflow-hidden rounded-3xl bg-slate-900 aspect-[16/10] lg:aspect-auto no-underline block">
        <img 
          src={mainStory.image} 
          alt={mainStory.title}
          className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-x-0 bottom-0 p-8 pt-24 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent text-left">
            <div className="flex items-center gap-3 mb-4">
                <span className="bg-primary-red text-white py-1 px-3 rounded-md text-[10px] font-black uppercase tracking-widest italic shadow-xl shadow-primary-red/20">
                    {mainStory.category}
                </span>
                <span className="text-white/40 text-[9px] font-black uppercase tracking-widest">Global Top Story</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white group-hover:text-primary-red transition-colors leading-[1.1] mb-5 italic tracking-tighter uppercase">
                {mainStory.title}
            </h2>
            <p className="text-white/60 text-sm md:text-base line-clamp-2 max-w-2xl font-medium italic">
                {mainStory.excerpt}
            </p>
            <div className="mt-8 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md group-hover:bg-primary-red transition-colors">
                    <i className="fas fa-play text-xs"></i>
                </div>
                <span className="text-white text-[10px] font-black uppercase tracking-widest group-hover:text-primary-red">Read full story</span>
            </div>
        </div>
      </Link>

      {/* Side Stories (4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-5">
        <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-primary-red rounded-full"></span>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 italic">Highly Recommended</h3>
        </div>
        
        {sideStories.map((story, i) => (
            <Link to={`/news/${story._id}`} key={i} className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-primary-red/10 hover:shadow-xl transition-all group cursor-pointer no-underline text-inherit block">
                <div className="w-24 h-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <img src={story.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                </div>
                <div className="flex flex-col justify-center text-left">
                    <span className="text-primary-red text-[8px] font-black uppercase tracking-widest mb-1">{story.category}</span>
                    <h4 className="text-[13px] font-black text-slate-800 leading-[1.3] italic tracking-tighter uppercase group-hover:text-primary-red transition-colors line-clamp-3">
                        {story.title}
                    </h4>
                </div>
            </Link>
        ))}

        <div className="mt-auto bg-slate-50 border border-slate-100 p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 text-7xl text-slate-200 rotate-12 opacity-50 group-hover:scale-110 transition-transform">
                <i className="fas fa-newspaper"></i>
            </div>
            <h5 className="text-slate-900 font-black italic tracking-tighter text-lg uppercase mb-2 relative z-10">DAILY DIGEST</h5>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-tight mb-4 relative z-10">Get the only newsletter that matters in Punjabi cinema.</p>
            <button className="bg-slate-900 text-white w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-red transition-colors relative z-10">Subscribe Free</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
