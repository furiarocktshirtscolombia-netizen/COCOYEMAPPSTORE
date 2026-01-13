
import React, { useState, useMemo } from 'react';
import { Selections, BaseType } from './types';
import { STEPS, PRICES, LOGO_URL, BACKGROUND_URL, WHATSAPP_NUMBER, INSTAGRAM_URL, FURIAROCK_URL } from './constants';
import Stepper from './components/Stepper';
import Step1Base from './components/steps/Step1Base';
import Step2Color from './components/steps/Step2Color';
import Step3Tshirt from './components/steps/Step3Tshirt';
import Step4Design from './components/steps/Step4Design';
import Step5Summary from './components/steps/Step5Summary';
import Preview from './components/Preview';
import { ArrowLeft, ArrowRight, Phone, Instagram } from 'lucide-react';

const initialSelections: Selections = {
    base: null,
    baseColor: 'negro',
    tshirtColor: 'negra',
    design: {
        hasCustomDesign: false,
        placement: 'frente_grande',
    },
    size: null,
    notes: '',
};

const App: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selections, setSelections] = useState<Selections>(initialSelections);

    const handleReset = () => {
        setSelections(initialSelections);
        setCurrentStep(1);
    };

    const handleNext = () => {
        if (currentStep < STEPS.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const updateSelections = <K extends keyof Selections>(key: K, value: Selections[K]) => {
        setSelections(prev => ({ ...prev, [key]: value }));
    };

    const isNextDisabled = (): boolean => {
        switch (currentStep) {
            case 1:
                return !selections.base;
            case 2:
                return !selections.baseColor;
            case 3:
                return !selections.tshirtColor;
            case 5:
                 return !selections.size;
            default:
                return false;
        }
    };

    const totalPrice = useMemo(() => {
        if (!selections.base) return 0;
        return selections.base === BaseType.Shorts ? PRICES.shortsSet : PRICES.joggerSet;
    }, [selections.base]);

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1Base selectedBase={selections.base} onSelectBase={(base) => updateSelections('base', base)} />;
            case 2:
                return <Step2Color selectedBase={selections.base!} selectedColor={selections.baseColor} onSelectColor={(color) => updateSelections('baseColor', color)} />;
            case 3:
                return <Step3Tshirt selectedColor={selections.tshirtColor} onSelectColor={(color) => updateSelections('tshirtColor', color)} />;
            case 4:
                return <Step4Design design={selections.design} onUpdateDesign={(design) => updateSelections('design', design)} />;
            case 5:
                return <Step5Summary selections={selections} onUpdateSize={(size) => updateSelections('size', size)} onUpdateNotes={(notes) => updateSelections('notes', notes)} totalPrice={totalPrice} onReset={handleReset}/>;
            default:
                return null;
        }
    };

    return (
        <div 
            className="min-h-screen text-stone-800 flex flex-col items-center p-4 sm:p-6 lg:p-8 bg-cover bg-center bg-fixed relative"
            style={{ backgroundImage: `url(${BACKGROUND_URL})` }}
        >
            <div className="absolute inset-0 bg-stone-100/90 backdrop-blur-sm z-0"></div>
            
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col min-h-screen">
                <header className="mb-8 w-full">
                    <div className="relative flex items-center justify-center text-center py-4">
                         <button onClick={handleReset} className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-800 focus:ring-offset-2 rounded-full">
                            <img src={LOGO_URL} alt="COCOYEMA Logo - Volver al inicio" className="h-24 md:h-28"/>
                        </button>
                        <div className="text-center">
                            <h1 className="text-5xl md:text-6xl font-bold text-amber-900">COCOYEMA</h1>
                            <p className="text-stone-600 mt-1 text-lg">Crea el conjunto perfecto para tu peque</p>
                        </div>
                    </div>
                </header>
                
                <div className="w-full">
                    <Stepper steps={STEPS} currentStep={currentStep} />
                </div>

                <main className="w-full flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 flex flex-col">
                        <div className="flex-grow">
                            {renderStep()}
                        </div>
                        <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between">
                            <button
                                onClick={handleBack}
                                disabled={currentStep === 1}
                                className="flex items-center gap-2 px-6 py-3 bg-stone-200 text-stone-700 font-semibold rounded-lg shadow-sm hover:bg-stone-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <ArrowLeft size={18} />
                                Anterior
                            </button>
                            <div className="text-center">
                                <span className="text-stone-500 text-sm block">Precio Total</span>
                                <span className="text-2xl font-bold text-amber-900">${totalPrice.toLocaleString('es-CO')} COP</span>
                            </div>
                            {currentStep < STEPS.length ? (
                                <button
                                    onClick={handleNext}
                                    disabled={isNextDisabled()}
                                    className="flex items-center gap-2 px-6 py-3 bg-amber-800 text-white font-semibold rounded-lg shadow-md hover:bg-amber-900 disabled:bg-stone-400 disabled:cursor-not-allowed transition-all"
                                >
                                    Siguiente
                                    <ArrowRight size={18} />
                                </button>
                            ) : (
                            <div className="w-40"></div> // Placeholder to keep alignment
                            )}
                        </div>
                    </div>

                    <div className="lg:sticky top-8 h-[60vh] lg:h-auto">
                    <Preview selections={selections} />
                    </div>
                </main>
                <footer className="w-full text-center mt-auto pt-8 flex items-center justify-center gap-4 md:gap-6 text-sm text-stone-600">
                    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-amber-800 transition-colors">
                        <Instagram size={18} />
                        Visítanos en Instagram
                    </a>
                    <span className="text-stone-400">|</span>
                    <a href={FURIAROCK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-amber-800 transition-colors">
                        Fabricado y distribuido por Furiarock t-shirts
                    </a>
                </footer>
            </div>
            <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform hover:scale-110 z-20"
                aria-label="Contactar por WhatsApp"
            >
                <Phone size={28} />
            </a>
        </div>
    );
};

export default App;
