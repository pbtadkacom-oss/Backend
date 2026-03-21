import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import CommentSection from '../components/CommentSection';

const CelebDetail = () => {
    const { id } = useParams();
    const { celebs, news, addCelebComment, likeCelebComment, updateCelebComment, deleteCelebComment } = useData();
    
    const celeb = celebs.find(item => item._id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const sidebarNews = [...news].sort(() => 0.5 - Math.random()).slice(0, 6);

    if (!celeb) return <div className="p-10 text-center font-bold">Celebrity not found</div>;

    return (
        <div className="bg-white min-h-screen">
            <main className="max-w-[1240px] mx-auto px-5 py-8 mt-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Main Content (70%) */}
                    <div className="lg:w-[70%] xl:w-[72%] min-w-0">
                        <nav className="mb-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                            <Link to="/" className="hover:text-primary-red">Home</Link> 
                            <span className="mx-2">/</span>
                            <Link to="/celebs" className="hover:text-primary-red">Celebrities</Link> 
                            <span className="mx-2">/</span>
                            <span className="text-slate-900">{celeb.name}</span>
                        </nav>
                        
                        <h1 className="text-3xl md:text-5xl font-black mb-6 leading-[1.1] text-slate-900 italic tracking-tighter uppercase font-article-title">
                            {celeb.name}
                        </h1>
                        
                        <div className="flex items-center gap-6 mb-8 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                            <span className="flex items-center gap-2"><i className="fas fa-star text-primary-red"></i> {celeb.role}</span>
                            <span className="flex items-center gap-2">Official Profile</span>
                            <span className="flex items-center gap-2">Industry: Pollywood</span>
                        </div>
                        
                        <div className="rounded-2xl overflow-hidden mb-10 shadow-2xl border border-gray-100">
                            <img src={celeb.image} alt={celeb.name} className="w-full h-auto" />
                        </div>
                        
                        <div className="max-w-none text-slate-800 leading-relaxed mb-12 font-article-text">
                            <div className="flex items-center gap-2 mb-8">
                                <span className="w-8 h-1 bg-primary-red"></span>
                                <h2 className="text-xl font-black uppercase italic tracking-tighter text-slate-900">Career & Biography</h2>
                            </div>
                            <p className="text-xl md:text-2xl font-black mb-8 italic text-slate-500 border-l-4 border-primary-red pl-6 py-2 leading-snug font-article-text">
                                "{celeb.bio}"
                            </p>
                            <div 
                                className="space-y-6 font-medium text-lg text-slate-700 font-article-text"
                                style={{ wordBreak: 'normal', overflowWrap: 'break-word', hyphens: 'none' }}
                            >
                                {celeb.fullBio ? (
                                    <div 
                                        className="rich-text-content"
                                        dangerouslySetInnerHTML={{ __html: celeb.fullBio }} 
                                    />
                                ) : (
                                    <>
                                        <p>
                                            As one of the most influential figures in Punjabi entertainment, {celeb.name} has revolutionized the industry with consistent hits and iconic performances. From humble beginnings to global stardom, the journey of this superstar serves as an inspiration for millions of aspiring artists.
                                        </p>
                                        <p>
                                            Industry experts and fans alike consider {celeb.name} to be at the pinnacle of their career in 2026, with major international collaborations and record-breaking box office hits.
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Milestones Card */}
                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mb-12">
                             <h3 className="text-lg font-black uppercase italic tracking-tighter text-slate-900 mb-8 flex items-center gap-3 border-b pb-4">
                                <i className="fas fa-trophy text-yellow-500"></i> Historic Milestones
                             </h3>
                              <div className="space-y-4">
                                {celeb.milestones?.length ? celeb.milestones.map((item, i) => (
                                    <div key={i} className="flex gap-6 items-center p-4 rounded-xl bg-white shadow-sm border border-gray-100 transition-all hover:border-primary-red/10">
                                        <div className="bg-slate-900 text-white font-black px-4 py-1.5 rounded-lg text-sm italic tracking-tighter leading-none">{item.year}</div>
                                        <div className="text-sm font-black text-slate-700 pt-0.5 italic tracking-tight uppercase leading-snug line-clamp-2">{item.text}</div>
                                    </div>
                                )) : [
                                    { year: '2026', text: 'Nominated for Global Punjabi Icon Award after record international tours.' },
                                    { year: '2025', text: 'Won Best Artist at Filmfare Awards Punjabi for the third consecutive year.' },
                                    { year: '2024', text: 'First Punjabi artist to sell out O2 Arena in London with a record attendance.' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 items-center p-4 rounded-xl bg-white shadow-sm border border-gray-100 transition-all hover:border-primary-red/10">
                                        <div className="bg-slate-900 text-white font-black px-4 py-1.5 rounded-lg text-sm italic tracking-tighter leading-none">{item.year}</div>
                                        <div className="text-sm font-black text-slate-700 pt-0.5 italic tracking-tight uppercase leading-snug line-clamp-2">{item.text}</div>
                                    </div>
                                ))}
                              </div>
                        </div>

                        {/* Stats Card */}
                        <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl relative overflow-hidden mb-12">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <i className="fas fa-bolt text-white text-5xl"></i>
                            </div>
                            <h3 className="font-black text-white text-xs uppercase tracking-widest mb-8 border-b border-white/10 pb-4 italic">Quick Stats</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <div className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">Fan Base</div>
                                    <div className="font-black text-xl text-white tracking-tighter leading-none italic">{celeb.stats?.fanBase || '12.5M+'}</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <div className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">Global Tours</div>
                                    <div className="font-black text-xl text-white tracking-tighter leading-none italic">{celeb.stats?.tours || '15+ Nations'}</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <div className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">Impact Score</div>
                                    <div className="font-black text-xl text-primary-red tracking-tighter leading-none italic">{celeb.stats?.impactScore || '98% Positive'}</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                            <span className="font-black uppercase tracking-widest text-xs text-slate-400">Share this profile</span>
                            <div className="flex gap-4">
                                <a 
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                                    target="_blank" rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                                >
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a 
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${celeb.name}'s profile on Punjabi Film News!`)}&url=${encodeURIComponent(window.location.href)}`} 
                                    target="_blank" rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                                >
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a 
                                    href={`https://wa.me/?text=${encodeURIComponent(`Check out ${celeb.name}'s profile on Punjabi Film News! ${window.location.href}`)}`} 
                                    target="_blank" rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                                >
                                    <i className="fab fa-whatsapp"></i>
                                </a>
                            </div>
                        </div>

                        {/* Comment Section */}
                        <CommentSection 
                            itemId={celeb._id}
                            comments={celeb.comments}
                            onAdd={addCelebComment}
                            onLike={likeCelebComment}
                            onUpdate={updateCelebComment}
                            onDelete={deleteCelebComment}
                        />

                    </div>

                    {/* Sidebar (Celebrity Buzz) (30%) */}
                    <aside className="lg:w-[30%] xl:w-[28%]">
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sticky top-24">
                            <h3 className="text-sm font-black text-primary-red uppercase tracking-widest mb-8 flex items-center gap-2 italic">
                                <span className="w-2.5 h-2.5 bg-primary-red rounded-full animate-pulse"></span> Celebrity Buzz
                            </h3>
                            
                            <div className="space-y-8">
                                {sidebarNews.map((item) => (
                                    <Link key={item._id} to={`/news/${item._id}`} className="flex gap-4 group cursor-pointer no-underline">
                                        <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden shadow-sm">
                                            <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h4 className="text-[12px] font-black text-slate-800 leading-[1.3] line-clamp-3 group-hover:text-primary-red transition-colors uppercase tracking-tight italic">
                                                {item.title}
                                            </h4>
                                            <span className="text-[9px] text-gray-400 font-bold mt-2 uppercase tracking-tighter">Pollywood Update</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default CelebDetail;
