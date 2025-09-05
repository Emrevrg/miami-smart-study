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

const Solve: React.FC = () => {
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSolve = async () => {
    if (!problem.trim() && !file) return;
    setIsLoading(true);
    setSolution('');
    
    let prompt = `Aşağıdaki soruyu adım adım, her adımı açıklayarak çöz. Çözümü bir lise öğrencisinin anlayabileceği şekilde detaylandır. Özellikle Matematik ve Fen Bilimleri soruları için formülleri ve mantığı açıkla. Soru metni: "${problem}"`;
    if (file) {
      prompt += `\n\nNot: Soru, ekteki dosyada da olabilir.`
    }
    
    let result = '';
    if (file && file.type.startsWith('image/')) {
       const imageBase64 = await fileToBase64(file);
       result = await generateContentWithImage(prompt, imageBase64, file.type);
    } else if (file && file.type === 'text/plain') {
        const textContent = await file.text();
        const combinedProblem = `${prompt}\n\nDosya içeriği:\n${textContent}`;
        result = await generateContent(combinedProblem);
    } else {
        result = await generateContent(prompt);
    }

    setSolution(result);
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
      <h1 className="text-3xl font-bold text-white">✅ Soru Çözdürme</h1>
      <p className="text-slate-400">Çözemediğin bir soruyu yaz veya fotoğrafını/dosyasını yükle. Yapay zeka senin için adım adım çözsün ve açıklasın.</p>
      
      <Card>
        <div className="space-y-4">
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Çözülecek soruyu (özellikle Matematik veya Fen) buraya yazın veya dosyadan yükleyin..."
            className="w-full h-32 p-3 bg-slate-900/70 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 resize-none"
          />
           <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/png, image/jpeg, text/plain" className="hidden" id="file-upload-solve"/>
            <label htmlFor="file-upload-solve" className="w-full sm:w-auto flex-shrink-0 cursor-pointer text-center px-4 py-3 bg-slate-700 rounded-lg text-slate-300 hover:bg-slate-600 transition-colors">
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
            onClick={handleSolve}
            disabled={isLoading || (!problem.trim() && !file)}
            className="w-full px-4 py-3 font-bold text-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg hover:from-pink-600 hover:to-orange-500 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Çözülüyor...' : 'Soruyu Çöz'}
          </button>
        </div>
      </Card>
      
      {(isLoading || solution) && (
        <Card>
          <h2 className="text-xl font-semibold text-white mb-4">Adım Adım Çözüm</h2>
          {isLoading && <Loader />}
          {solution && <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">{solution}</div>}
        </Card>
      )}
    </div>
  );
};

export default Solve;
