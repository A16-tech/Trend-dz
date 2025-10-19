
import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { Header } from './components/Header';
import { ResultDisplay } from './components/ResultDisplay';
import { Spinner } from './components/Spinner';
import { StyleSelector } from './components/StyleSelector';
import { generateHugImage } from './services/geminiService';
import type { ImageData, StyleOption } from './types';

const App: React.FC = () => {
  const [childImage, setChildImage] = useState<ImageData | null>(null);
  const [adultImage, setAdultImage] = useState<ImageData | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StyleOption>('polaroid');

  const handleGenerateClick = useCallback(async () => {
    if (!childImage || !adultImage) {
      setError('الرجاء رفع الصورتين للمتابعة.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateHugImage(childImage, adultImage);
      setGeneratedImage(result);
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء إنشاء الصورة. الرجاء المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  }, [childImage, adultImage]);

  return (
    <div className="bg-stone-50 min-h-screen text-stone-800 p-4 sm:p-8">
      <div className="container mx-auto max-w-4xl">
        <Header />

        <main className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <ImageUploader
              label="1. صورتك وأنت صغير"
              onImageUpload={setChildImage}
            />
            <ImageUploader
              label="2. صورتك الحالية"
              onImageUpload={setAdultImage}
            />
          </div>

          <div className="flex flex-col items-center">
            {/* StyleSelector can be added here in the future */}
            {/* <StyleSelector selectedStyle={selectedStyle} onStyleChange={setSelectedStyle} /> */}

            <button
              onClick={handleGenerateClick}
              disabled={!childImage || !adultImage || isLoading}
              className="mt-4 w-full md:w-1/2 bg-rose-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-rose-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {isLoading ? 'جاري الإنشاء...' : 'عَانق روحك الآن'}
            </button>
          </div>

          {error && <p className="text-center text-red-500 mt-6">{error}</p>}
          
          {isLoading && <Spinner />}

          {generatedImage && (
            <ResultDisplay imageUrl={generatedImage} />
          )}
        </main>
        
        <footer className="text-center text-stone-500 mt-8 text-sm">
            <p>صُنع بحب باستخدام Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
