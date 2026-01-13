
import React from 'react';
import { TshirtColor } from '../../types';
import { TSHIRT_COLOR_OPTIONS, ASSETS } from '../../constants';
import ImageWithFallback from '../ImageWithFallback';

interface Step3TshirtProps {
    selectedColor: TshirtColor;
    onSelectColor: (color: TshirtColor) => void;
}

const Step3Tshirt: React.FC<Step3TshirtProps> = ({ selectedColor, onSelectColor }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Ahora, la camiseta</h2>
            <p className="text-stone-500 mb-8">Escoge uno de nuestros colores base para la camiseta.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                 {TSHIRT_COLOR_OPTIONS.map((color) => (
                    <button
                        key={color.id}
                        onClick={() => onSelectColor(color.id)}
                        className={`text-center p-2 border-2 rounded-xl transition-all duration-200 ${selectedColor === color.id ? 'border-amber-800 ring-2 ring-amber-800/50 bg-amber-50' : 'border-stone-200 hover:border-amber-700'}`}
                    >
                        <div className="aspect-square w-full rounded-lg overflow-hidden bg-stone-100">
                            <ImageWithFallback src={ASSETS.camisetas[color.id]} alt={color.name} className="w-full h-full object-cover"/>
                        </div>
                        <span className="block mt-2 text-sm font-medium text-stone-600">{color.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Step3Tshirt;
