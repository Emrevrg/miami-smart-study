import React, { useState, useRef } from 'react';
import Card from './Card';
import Loader from './Loader';
import { generateContent, generateContentWithImage } from '../services/geminiService';

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
  
const ReadQuestion: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = async () => {
    if (!question.trim() && !file) return;
    setIsLoading(true);
    setAnalysis('');
    
    let prompt = `Bir öğrencinin sorduğu aşağıdaki soruyu analiz et ve ne anlama geldiğini, hangi konuları içerdiğini ve nasıl bir yaklaşım sergilenmesi gerektiğini açıkla. Öğrenciye yol gösterici ol. Soru metni: "${question}"`;
    if (file) {
      prompt += `\n\nNot: Soru, ekteki dosyada da olabilir.`
    }

    let result = '';
    if (file && file.type.startsWith('image/')) {
       const imageBase64 = await fileToBase64(file);
       result = await generateContentWithImage(prompt, imageBase64, file.type);
    } else if (file && file.type === 'text/plain') {
        const textContent = await file.text();
        const combinedQuestion = `${prompt}\n\nDosya içeriği:\n${textContent}`;
        result = await generateContent(combinedQuestion);
    } else {
        result = await generateContent(prompt);
    }
    
    setAnalysis(result);
    setIsLoading(false);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
        if(selectedFile.size > 4 * 1024 * 1024) { // 4MB limit
            alert("Dosya boyutu 4MB'den büyük olamaz.");
            return;
        }
        if (selectedFile.type.startsWith('image/') || selectedFile.type === 'text/plain') {
            setFile(selectedFile);
        } else {
            alert("Lütfen bir resim (JPEG, PNG) veya metin (.txt) dosyası yükleyin.");
        }
    }
  };

  const clearFile = () => {
      setFile(null);
      if(fileInputRef.current) {
          fileInputRef.current.value = "";
      }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">📘 Soru Okutma</h1>
      <p className="text-slate-400">Anlamadığın bir soruyu yaz veya fotoğrafını/dosyasını yükle. Yapay zeka senin için analiz etsin ve açıklasın.</p>
      
      <Card>
        <div className="space-y-4">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Analiz edilecek soruyu buraya yazın veya dosyadan yükleyin..."
            className="w-full h-32 p-3 bg-slate-900/70 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 resize-none"
          />

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/png, image/jpeg, text/plain" className="hidden" id="file-upload-read"/>
            <label htmlFor="file-upload-read" className="w-full sm:w-auto flex-shrink-0 cursor-pointer text-center px-4 py-3 bg-slate-700 rounded-lg text-slate-300 hover:bg-slate-600 transition-colors">
              {file ? 'Dosyayı Değiştir' : 'Dosya Yükle (.png, .jpg, .txt)'}
            </label>
            {file && (
                <div className="flex-grow flex items-center justify-between bg-slate-900/80 p-2 rounded-lg text-sm min-w-0">
                    <span className="text-cyan-400 truncate pr-2">{file.name}</span>
                    <button onClick={clearFile} className="flex-shrink-0 text-red-400 hover:text-red-300 text-xl leading-none">&times;</button>
                </div>
            )}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isLoading || (!question.trim() && !file)}
            className="w-full px-4 py-3 font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Analiz Ediliyor...' : 'Soruyu Analiz Et'}
          </button>
        </div>
      </Card>
      
      {(isLoading || analysis) && (
        <Card>
          <h2 className="text-xl font-semibold text-white mb-4">Analiz Sonucu</h2>
          {isLoading && <Loader />}
          {analysis && <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">{analysis}</div>}
        </Card>
      )}
    </div>
  );
};

export default ReadQuestion;
