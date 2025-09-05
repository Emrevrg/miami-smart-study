import React, { useState, useEffect } from 'react';
import Card from './Card';
import { getUserApiKey, setUserApiKey } from '../services/apiKeyService';

const Settings: React.FC = () => {
  const [userKey, setUserKey] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success'>('idle');

  useEffect(() => {
    const storedKey = getUserApiKey();
    if (storedKey) {
      setUserKey(storedKey);
    }
  }, []);

  const handleSave = () => {
    setUserApiKey(userKey);
    setSaveStatus('success');
    setTimeout(() => setSaveStatus('idle'), 2000); // Hide message after 2 seconds
  };
  
  const handleClear = () => {
    setUserKey('');
    setUserApiKey('');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">⚙️ API Anahtarı Ayarları</h1>
      <p className="text-slate-400">
        Bu platformda yerleşik 6 farklı API anahtarı bulunmaktadır ve bunlar otomatik olarak kullanılır. 
        Ancak, günlük kullanım limitleri dolarsa veya kendi anahtarınızı kullanmak isterseniz, 
        aşağıdaki alana Google Gemini API anahtarınızı girebilirsiniz.
      </p>
      
      <Card>
        <div className="space-y-4">
          <div>
            <label htmlFor="api-key-input" className="block text-sm font-medium text-slate-300 mb-2">
              Kişisel Gemini API Anahtarınız
            </label>
            <input
              id="api-key-input"
              type="password"
              value={userKey}
              onChange={(e) => setUserKey(e.target.value)}
              placeholder="AIzaSy... ile başlayan anahtarınızı buraya yapıştırın"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-300"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
                onClick={handleSave}
                className="w-full px-4 py-3 font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
                {saveStatus === 'success' ? 'Kaydedildi!' : 'Anahtarı Kaydet'}
            </button>
            <button
                onClick={handleClear}
                className="w-full px-4 py-3 font-bold text-slate-200 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all duration-300"
            >
                Kaydı Temizle
            </button>
          </div>
        </div>
      </Card>
      
      <div className="text-slate-500 text-sm">
        <p>Girdiğiniz anahtar sadece sizin tarayıcınızda saklanır ve hiçbir yere gönderilmez. Alanı temizlediğinizde platform tekrar yerleşik anahtarları kullanmaya devam eder.</p>
      </div>
    </div>
  );
};

export default Settings;
