
import React from 'react';

interface ResultDisplayProps {
  imageUrl: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ imageUrl }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'embrace-your-soul.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
    
  return (
    <div className="mt-10 pt-8 border-t border-stone-200 flex flex-col items-center animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-6 text-stone-800">تحفتك الفنية جاهزة!</h2>
      <div className="relative group w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">
        <img src={imageUrl} alt="Generated hug" className="w-full h-auto" />
      </div>
      <button
        onClick={handleDownload}
        className="mt-8 bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-emerald-600 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        تحميل الصورة
      </button>
    </div>
  );
};
