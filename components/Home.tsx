
import React from 'react';

interface HomeProps {
  name: string;
}

const Home: React.FC<HomeProps> = ({ name }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-72 h-72 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-full animate-pulse filter blur-3xl opacity-40"></div>
        <div className="w-96 h-96 bg-gradient-to-br from-pink-500 to-orange-400 rounded-full animate-pulse filter blur-3xl opacity-30 animation-delay-2000 absolute -top-20 -right-20"></div>
      </div>
      <div className="relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Happy Birthday {name} <span className="animate-bounce inline-block">🎉</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-300">
          Bugün senin günün! Öğrenerek kutlayalım.
        </p>
        <p className="mt-8 text-slate-400">Başlamak için soldaki menüden bir seçenek belirle.</p>
      </div>
    </div>
  );
};

export default Home;
