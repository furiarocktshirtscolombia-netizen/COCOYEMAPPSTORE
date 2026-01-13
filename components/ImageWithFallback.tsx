
import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, ...props }) => {
    const [error, setError] = useState(false);

    const handleError = () => {
        setError(true);
    };

    if (error) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 border-2 border-dashed border-stone-300 rounded-lg text-center p-2">
                <AlertTriangle className="w-8 h-8 text-red-500 mb-2" />
                <p className="text-xs text-stone-600 font-semibold">Error al cargar imagen</p>
                <p className="text-[10px] text-stone-500 mt-1">Revisa que el nombre y ruta existan en GitHub.</p>
            </div>
        );
    }

    return <img src={src} alt={alt} onError={handleError} {...props} />;
};

export default ImageWithFallback;
