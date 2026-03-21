import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import CommentSection from '../components/CommentSection';

const NewsDetail = () => {
    const { id } = useParams();
    const { news, addComment, likeComment, reportComment, updateComment, deleteComment } = useData();
    const article = news.find(n => n._id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return 'Just Now';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getRelatedContent = () => {
        if (!article) return [];
        const related = news.filter(n => n.category === article.category && n._id !== id);
        const others = news.filter(n => n.category !== article.category && n._id !== id);
        return [...related, ...others].sort(() => 0.5 - Math.random()).slice(0, 6);
    };

    const relatedNews = getRelatedContent();

    if (!article) return <div className="p-10 text-center font-bold">Article not found</div>;

    const handleCommentSubmit = async (e) => {
        // Redundant - remove later if everything works
    };

    return (
        <div className="bg-white min-h-screen">
            <main className="max-w-[1240px] mx-auto px-5 py-8 mt-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    <div className="lg:w-[70%] xl:w-[72%] min-w-0">
                        <nav className="mb-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                            <Link to="/" className="hover:text-primary-red">Home</Link> 
                            <span className="mx-2">/</span>
                            <Link to="/news" className="hover:text-primary-red">News</Link> 
                            <span className="mx-2">/</span>
                            <span className="text-slate-900">{article.category}</span>
                        </nav>
                        
                        <h1 className="text-3xl md:text-5xl font-black mb-6 leading-[1.1] text-slate-900 italic tracking-tighter uppercase">
                            {article.title}
                        </h1>
                        
                        <div className="flex items-center gap-6 mb-8 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                            <span className="flex items-center gap-2"><i className="far fa-calendar-alt text-primary-red"></i> {formatDate(article.createdAt || article.date)}</span>
                            <span className="flex items-center gap-2"><i className="far fa-user text-primary-red"></i> By {article.author || 'Editor Team'}</span>
                            <span className="flex items-center gap-2"><i className="far fa-heart text-primary-red"></i> {article.likes || 0} Likes</span>
                        </div>
                        
                        <div className="rounded-2xl overflow-hidden mb-10 shadow-2xl border border-gray-100">
                            <img src={article.image} alt={article.title} className="w-full h-auto" />
                        </div>
                        
                        <div className="max-w-none text-slate-800 leading-relaxed mb-12">
                            <p className="text-xl md:text-2xl font-black mb-8 italic text-slate-500 border-l-4 border-primary-red pl-6 py-2 leading-snug">
                                {article.excerpt}
                            </p>
                            <div 
                                className="space-y-6 font-medium text-lg text-slate-700"
                                style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}
                                dangerouslySetInnerHTML={{ __html: article.fullStory || article.content }}
                            />
                        </div>

                        {/* Comment Section */}
                        <CommentSection 
                            itemId={article._id}
                            comments={article.comments}
                            onAdd={addComment}
                            onLike={likeComment}
                            onReport={reportComment}
                            onUpdate={updateComment}
                            onDelete={deleteComment}
                        />
                    </div>

                    <aside className="lg:w-[30%] xl:w-[28%]">
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sticky top-24">
                            <h3 className="text-sm font-black text-primary-red uppercase tracking-widest mb-8 flex items-center gap-2 italic">
                                <span className="w-2.5 h-2.5 bg-primary-red rounded-full animate-pulse"></span> Related Stories
                            </h3>
                            
                            <div className="space-y-8">
                                {relatedNews.map((item) => (
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

            {/* UserAuthModal removed - now inside CommentSection */}
        </div>
    );
};

export default NewsDetail;
