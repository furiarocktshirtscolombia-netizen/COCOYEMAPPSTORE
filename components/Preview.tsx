
import React from 'react';
import { Selections } from '../types';
import { ASSETS } from '../constants';
import ImageWithFallback from './ImageWithFallback';

interface PreviewProps {
    selections: Selections;
    compact?: boolean;
}

const Preview: React.FC<PreviewProps> = ({ selections, compact = false }) => {
    const baseImageSrc = selections.base ? ASSETS[selections.base === 'shorts' ? 'shorts' : 'joggers'][selections.baseColor] : ASSETS.shorts.negro;
    const tshirtImageSrc = ASSETS.camisetas[selections.tshirtColor];

    const isBackPlacement = selections.design.placement.startsWith('espalda');

    return (
        <div className={`w-full h-full bg-white rounded-2xl shadow-lg flex items-center justify-center overflow-hidden ${compact ? 'p-1' : 'p-4'}`}>
            <div className="relative w-full max-w-sm h-full flex flex-col items-center justify-center">
                {/* T-shirt Layer */}
                <div className={`relative transition-all duration-300 ${compact ? 'w-[85%]' : 'w-[75%]'}`}>
                    <ImageWithFallback
                        src={tshirtImageSrc}
                        alt={`Camiseta color ${selections.tshirtColor}`}
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Base Layer */}
                {/* Using percentage based negative margin on compact mode for better scaling */}
                <div className={`transition-all duration-300 ${compact ? 'w-[90%] -mt-[15%]' : 'w-[80%] -mt-6'}`}>
                     <ImageWithFallback
                        src={baseImageSrc}
                        alt={`Prenda base color ${selections.baseColor}`}
                        className="w-full h-full object-contain"
                    />
                </div>
                
                {selections.design.hasCustomDesign && isBackPlacement && (
                     <div className={`absolute top-2 right-2 bg-black/50 text-white rounded px-2 py-1 ${compact ? 'text-[10px]' : 'text-xs'}`}>
                         {compact ? 'Espalda' : 'VISTA FRONTAL (Diseño en espalda)'}
                     </div>
                 )}
            </div>
        </div>
    );
};

export default Preview;
