
import React, { useState, useRef } from 'react';
import type { ImageData } from '../types';

interface ImageUploaderProps {
  label: string;
  onImageUpload: (imageData: ImageData | null) => void;
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result.split(',')[1]); // remove data:mime/type;base64, prefix
            } else {
                reject(new Error('Failed to read file as base64 string.'));
            }
        };
        reader.onerror = (error) => reject(error);
    });
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({ label, onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        onImageUpload({ base64, mimeType: file.type });
        setPreview(URL.createObjectURL(file));
      } catch (error) {
        console.error("Error converting file to base64", error);
        onImageUpload(null);
        setPreview(null);
      }
    } else {
        onImageUpload(null);
        setPreview(null);
    }
  };

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-lg font-semibold text-stone-700">{label}</h3>
      <div
        onClick={handleAreaClick}
        className="w-full aspect-square bg-stone-100 rounded-xl border-2 border-dashed border-stone-300 flex items-center justify-center cursor-pointer hover:border-rose-400 hover:bg-rose-50 transition-colors duration-300 relative overflow-hidden"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
        />
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center text-stone-500 p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 text-sm">انقر هنا لرفع صورة</p>
          </div>
        )}
      </div>
    </div>
  );
};
