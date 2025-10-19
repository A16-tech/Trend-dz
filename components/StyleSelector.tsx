
import React from 'react';
import type { StyleOption, Style } from '../types';

const styles: Style[] = [
  { id: 'polaroid', name: 'لمسة بولارويد', promptFragment: 'make a picture taken with a Polaroid camera...' },
  { id: '80s', name: 'حنين الثمانينات', promptFragment: 'An 80s film photo, grainy, with vintage colors...' },
  { id: 'watercolor', name: 'ألوان مائية', promptFragment: 'A dreamy watercolor painting...' },
  { id: 'bw', name: 'نوار وبلان', promptFragment: 'A classic, high-contrast black and white photograph...' }
];

interface StyleSelectorProps {
  selectedStyle: StyleOption;
  onStyleChange: (style: StyleOption) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleChange }) => {
  return (
    <div className="my-6 w-full">
        <label htmlFor="style-selector" className="block text-center text-md font-medium text-stone-700 mb-3">
            اختر لمسة فنية
        </label>
        <div className="flex justify-center flex-wrap gap-3">
            {styles.map((style) => (
                <button
                    key={style.id}
                    onClick={() => onStyleChange(style.id)}
                    className={`px-4 py-2 text-sm font-semibold rounded-full border-2 transition-all duration-200
                        ${selectedStyle === style.id 
                            ? 'bg-rose-500 border-rose-500 text-white' 
                            : 'bg-white border-stone-300 text-stone-700 hover:border-rose-400'
                        }`}
                >
                    {style.name}
                </button>
            ))}
        </div>
    </div>
  );
};
