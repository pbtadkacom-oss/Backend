import React from 'react';
import Logo from './Logo';

const Loading = ({ fullScreen = true }) => {
  return (
    <div className={`flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm z-[2000] ${fullScreen ? 'fixed inset-0 w-screen h-screen' : 'w-full py-20'}`}>
      <div className="relative">
        {/* Animated Rings */}
        <div className="absolute inset-0 -m-8 rounded-full border-2 border-primary-red/20 animate-ping"></div>
        <div className="absolute inset-0 -m-4 rounded-full border-2 border-primary-red/10 animate-pulse delay-75"></div>
        
        {/* Logo with Pulse */}
        <div className="relative animate-bounce-slow">
           <Logo className="h-32 md:h-40 w-auto filter drop-shadow-2xl" />
        </div>
      </div>
      
      {/* Text with Shimmer */}
      <div className="mt-12 text-center">
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.3em] animate-pulse">
          Fetching Latest <span className="text-primary-red">Updates</span>
        </h2>
        <div className="mt-4 flex justify-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-primary-red rounded-full animate-bounce delay-0"></div>
          <div className="w-1.5 h-1.5 bg-primary-red rounded-full animate-bounce delay-150"></div>
          <div className="w-1.5 h-1.5 bg-primary-red rounded-full animate-bounce delay-300"></div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;
