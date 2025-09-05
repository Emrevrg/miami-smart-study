
import React, { useState } from 'react';
import { Subject } from '../types';
import Card from './Card';
import Loader from './Loader';
import SubjectSelector from './SubjectSelector';
import { generateContent } from '../services/geminiService';

const Practice: React.FC = () => {
  const [subject, setSubject] = useState<Subject>(Subject.MATH);
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    setQuestions('');

    const prompt = `Lise seviyesinde, "${subject}" dersi için "${topic}" konusuyla ilgili 5 adet alıştırma sorusu üret. Sorular farklı zorluk seviyelerinde olabilir ve konuyu pekiştirmeye yönelik olmalıdır.`;
    
    const result = await generateContent(prompt);
    setQuestions(result);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">✏️ Alıştırma Yaptırma</h1>
      <p className="text-slate-400">Bir ders ve konu seç, yapay zeka sana özel pratik soruları hazırlasın. Öğrendiklerini pekiştirmenin en iyi yolu!</p>
      
      <Card>
        <div className="space-y-4">
          <SubjectSelector selectedSubject={subject} onSubjectChange={setSubject} />
          <div>
            <label htmlFor="topic-input" className="block text-sm font-medium text-slate-300 mb-2">
              Konu Belirtin
            </label>
            <input
              id="topic-input"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Örn: Türev, I. Dünya Savaşı, Hücre Bölünmesi..."
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-300"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={isLoading || !topic.trim()}
            className="w-full px-4 py-3 font-bold text-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg hover:from-pink-600 hover:to-orange-500 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sorular Üretiliyor...' : 'Alıştırma Soruları Üret'}
          </button>
        </div>
      </Card>
      
      {(isLoading || questions) && (
        <Card>
          <h2 className="text-xl font-semibold text-white mb-4">Alıştırma Soruları</h2>
          {isLoading && <Loader />}
          {questions && <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">{questions}</div>}
        </Card>
      )}
    </div>
  );
};

export default Practice;
