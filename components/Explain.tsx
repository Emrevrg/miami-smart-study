
import React, { useState } from 'react';
import { Subject } from '../types';
import Card from './Card';
import Loader from './Loader';
import SubjectSelector from './SubjectSelector';
import { generateContent } from '../services/geminiService';

const Explain: React.FC = () => {
  const [subject, setSubject] = useState<Subject>(Subject.HISTORY);
  const [topic, setTopic] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleExplain = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    setExplanation('');
    
    const prompt = `Lise öğrencisi için "${subject}" dersindeki "${topic}" konusunu basit, anlaşılır ve akılda kalıcı bir şekilde anlat. Örnekler ve analojiler kullanarak konuyu somutlaştır.`;
    
    const result = await generateContent(prompt);
    setExplanation(result);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">📖 Konu Anlatımı</h1>
      <p className="text-slate-400">Anlamakta zorlandığın bir konu mu var? Dersini ve konusunu seç, yapay zeka sana en basit haliyle anlatsın.</p>
      
      <Card>
        <div className="space-y-4">
          <SubjectSelector selectedSubject={subject} onSubjectChange={setSubject} />
          <div>
            <label htmlFor="topic-input-explain" className="block text-sm font-medium text-slate-300 mb-2">
              Konu Belirtin
            </label>
            <input
              id="topic-input-explain"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Örn: Mitokondri, Cümlenin Öğeleri, Fransız İhtilali..."
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-300"
            />
          </div>
          <button
            onClick={handleExplain}
            disabled={isLoading || !topic.trim()}
            className="w-full px-4 py-3 font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Anlatım Hazırlanıyor...' : 'Konuyu Anlat'}
          </button>
        </div>
      </Card>
      
      {(isLoading || explanation) && (
        <Card>
          <h2 className="text-xl font-semibold text-white mb-4">Konu Anlatımı: {topic}</h2>
          {isLoading && <Loader />}
          {explanation && <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">{explanation}</div>}
        </Card>
      )}
    </div>
  );
};

export default Explain;
