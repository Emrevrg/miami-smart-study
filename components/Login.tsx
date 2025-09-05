import React, { useState } from 'react';

interface LoginProps {
  onLogin: (rememberMe: boolean) => void;
}

const CORRECT_CODE = 'LAL-BİRTHDAY-3F9X';

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [code, setCode] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() === CORRECT_CODE) {
      setError('');
      onLogin(rememberMe);
    } else {
      setError('Geçersiz kod. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="w-full max-w-md text-center">
        <div className="relative p-8 bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700">
          <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-32 h-32 bg-cyan-500/30 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-32 h-32 bg-pink-500/30 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500">
            Miami Smart Study
          </h1>
          <p className="text-slate-300 mb-6">Bu platform Lal Su Akpınar'a özeldir. Lütfen size verilen kodu girin.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Özel Kodu Girin..."
              className={`w-full px-4 py-3 bg-slate-900/50 border-2 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition-all duration-300 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-700 focus:border-pink-500 focus:ring-pink-500'}`}
              required
            />
            {error && <p className="text-red-400 text-sm text-left">{error}</p>}
            
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-pink-500 focus:ring-pink-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-300">
                Beni Hatırla
              </label>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 font-bold text-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg hover:from-pink-600 hover:to-orange-500 transform hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-orange-500"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
