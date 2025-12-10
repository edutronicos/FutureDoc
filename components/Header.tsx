import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Logo Icon */}
            <svg className="h-8 w-8 text-navy-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            <span className="ml-3 text-xl font-serif font-bold text-navy-900 tracking-tight">
              Future<span className="text-gold-500">Doc.</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
             <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-sm font-medium text-slate-700">Seja Bem Vindo</span>
                <span className="text-xs text-slate-500">Gemini</span>
             </div>
             <div className="h-10 w-10 rounded-full bg-navy-900 text-white flex items-center justify-center font-serif font-bold border-2 border-gold-500">
                GE
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;