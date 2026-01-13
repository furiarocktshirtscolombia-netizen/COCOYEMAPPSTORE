
import React from 'react';
import { BaseType } from '../../types';
import { BASE_OPTIONS } from '../../constants';
import ImageWithFallback from '../ImageWithFallback';

interface Step1BaseProps {
    selectedBase: BaseType | null;
    onSelectBase: (base: BaseType) => void;
}

const Step1Base: React.FC<Step1BaseProps> = ({ selectedBase, onSelectBase }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Elige la base</h2>
            <p className="text-stone-500 mb-8">Comienza seleccionando el tipo de prenda inferior para tu conjunto.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {BASE_OPTIONS.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => onSelectBase(option.id)}
                        className={`text-left p-4 border-2 rounded-xl transition-all duration-200 ${selectedBase === option.id ? 'border-amber-800 ring-2 ring-amber-800/50 bg-amber-50' : 'border-stone-200 hover:border-amber-700'}`}
                    >
                        <div className="aspect-square w-full rounded-lg overflow-hidden bg-stone-100">
                           <ImageWithFallback src={option.image} alt={option.name} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="mt-4 text-xl font-semibold text-stone-700">{option.name}</h3>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Step1Base;
