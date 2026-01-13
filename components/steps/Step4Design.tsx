
import React from 'react';
import { Design, Placement } from '../../types';
import { PLACEMENT_OPTIONS } from '../../constants';

interface Step4DesignProps {
    design: Design;
    onUpdateDesign: (design: Design) => void;
}

const Step4Design: React.FC<Step4DesignProps> = ({ design, onUpdateDesign }) => {
    const handleHasDesignChange = (checked: boolean) => {
        onUpdateDesign({ ...design, hasCustomDesign: checked });
    };

    const handlePlacementChange = (placement: Placement) => {
        onUpdateDesign({ ...design, placement });
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Personaliza el diseño</h2>
            <p className="text-stone-500 mb-8">Indica si quieres añadir un estampado y elige su ubicación.</p>
            
            <div className="space-y-8">
                <div className="flex items-center justify-between bg-stone-50 p-4 rounded-xl border border-stone-200">
                    <label htmlFor="hasDesignToggle" className="font-semibold text-stone-700 text-lg cursor-pointer">
                        Añadir estampado personalizado
                    </label>
                    <button
                        id="hasDesignToggle"
                        onClick={() => handleHasDesignChange(!design.hasCustomDesign)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-800 focus:ring-offset-2 ${
                            design.hasCustomDesign ? 'bg-amber-800' : 'bg-stone-300'
                        }`}
                        role="switch"
                        aria-checked={design.hasCustomDesign}
                    >
                        <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                design.hasCustomDesign ? 'translate-x-5' : 'translate-x-0'
                            }`}
                        />
                    </button>
                </div>

                <div className={`transition-all duration-500 ${design.hasCustomDesign ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <h3 className="text-lg font-semibold text-stone-700 mb-3">Elige la ubicación del estampado</h3>
                    <p className="text-sm text-stone-500 mb-4">El archivo de tu diseño lo coordinaremos y lo enviaremos por WhatsApp.</p>
                    <div className="space-y-4">
                        {Object.entries(PLACEMENT_OPTIONS).map(([groupName, options]) => (
                            <div key={groupName}>
                                <h4 className="font-semibold text-stone-600 mb-2">{groupName}</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {options.map(option => (
                                        <button
                                            key={option.id}
                                            onClick={() => handlePlacementChange(option.id)}
                                            className={`px-4 py-3 rounded-lg text-sm font-semibold transition-colors text-center ${design.placement === option.id ? 'bg-amber-800 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'}`}
                                        >
                                            {option.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step4Design;
