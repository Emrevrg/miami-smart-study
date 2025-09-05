
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2 p-4">
      <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-0"></div>
      <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse delay-200"></div>
      <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse delay-400"></div>
      <span className="ml-4 text-slate-300">Yapay zeka düşünüyor...</span>
    </div>
  );
};

export default Loader;
