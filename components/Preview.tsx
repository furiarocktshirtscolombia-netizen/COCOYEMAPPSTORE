
import React from 'react';
import { Selections } from '../types';
import { ASSETS } from '../constants';
import ImageWithFallback from './ImageWithFallback';

interface PreviewProps {
    selections: Selections;
}

const Preview: React.FC<PreviewProps> = ({ selections }) => {
    const baseImageSrc = selections.base ? ASSETS[selections.base === 'shorts' ? 'shorts' : 'joggers'][selections.baseColor] : ASSETS.shorts.negro;
    const tshirtImageSrc = ASSETS.camisetas[selections.tshirtColor];

    const isBackPlacement = selections.design.placement.startsWith('espalda');

    return (
        <div className="w-full h-full bg-white rounded-2xl shadow-lg flex items-center justify-center p-4 overflow-hidden">
            <div className="relative w-full max-w-sm h-full flex flex-col items-center justify-center">
                {/* T-shirt Layer */}
                <div className="relative w-[75%]">
                    <ImageWithFallback
                        src={tshirtImageSrc}
                        alt={`Camiseta color ${selections.tshirtColor}`}
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Base Layer */}
                <div className="w-[80%] -mt-6">
                     <ImageWithFallback
                        src={baseImageSrc}
                        alt={`Prenda base color ${selections.baseColor}`}
                        className="w-full h-full object-contain"
                    />
                </div>
                
                {selections.design.hasCustomDesign && isBackPlacement && (
                     <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
                         VISTA FRONTAL (Diseño en espalda)
                     </div>
                 )}
            </div>
        </div>
    );
};

export default Preview;
