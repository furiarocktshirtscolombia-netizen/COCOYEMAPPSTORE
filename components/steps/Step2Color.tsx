
import React from 'react';
import { BaseType, Color } from '../../types';
import { COLOR_OPTIONS, ASSETS } from '../../constants';
import ImageWithFallback from '../ImageWithFallback';

interface Step2ColorProps {
    selectedBase: BaseType;
    selectedColor: Color;
    onSelectColor: (color: Color) => void;
}

const Step2Color: React.FC<Step2ColorProps> = ({ selectedBase, selectedColor, onSelectColor }) => {
    const assetKey = selectedBase === BaseType.Shorts ? 'shorts' : 'joggers';

    return (
        <div>
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Selecciona el color</h2>
            <p className="text-stone-500 mb-8">Elige el color para tu {selectedBase === BaseType.Shorts ? 'pantaloneta' : 'jogger'}.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {COLOR_OPTIONS.map((color) => (
                    <button
                        key={color.id}
                        onClick={() => onSelectColor(color.id)}
                        className={`text-center p-2 border-2 rounded-xl transition-all duration-200 ${selectedColor === color.id ? 'border-amber-800 ring-2 ring-amber-800/50 bg-amber-50' : 'border-stone-200 hover:border-amber-700'}`}
                    >
                        <div className="aspect-square w-full rounded-lg overflow-hidden bg-stone-100">
                             <ImageWithFallback src={ASSETS[assetKey][color.id]} alt={color.name} className="w-full h-full object-cover"/>
                        </div>
                        <span className="block mt-2 text-sm font-medium text-stone-600">{color.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Step2Color;
