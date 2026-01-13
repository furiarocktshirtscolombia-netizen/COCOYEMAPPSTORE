
import React, { useState, useMemo } from 'react';
import { Selections, BaseType } from './types';
import { STEPS, PRICES, LOGO_URL, BACKGROUND_URL, WHATSAPP_NUMBER, INSTAGRAM_URL, FURIAROCK_URL, CANVA_URL } from './constants';
import Stepper from './components/Stepper';
import Step1Base from './components/steps/Step1Base';
import Step2Color from './components/steps/Step2Color';
import Step3Tshirt from './components/steps/Step3Tshirt';
import Step4Design from './components/steps/Step4Design';
import Step5Summary from './components/steps/Step5Summary';
import Preview from './components/Preview';
import { ArrowLeft, ArrowRight, Phone, Instagram, BookOpen } from 'lucide-react';

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
            className="min-h-screen text-stone-800 flex flex-col items-center bg-cover bg-center bg-fixed relative"
            style={{ backgroundImage: `url(${BACKGROUND_URL})` }}
        >
            <div className="absolute inset-0 bg-stone-100/90 backdrop-blur-sm z-0"></div>
            
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col min-h-screen p-3 sm:p-6 lg:p-8">
                
                {/* --- HEADER --- */}
                <header className="mb-4 lg:mb-8 w-full">
                    
                    {/* MOBILE HEADER: Compact Row */}
                    <div className="flex md:hidden items-center justify-between py-2 border-b border-stone-200/50">
                         <button onClick={handleReset} className="focus:outline-none">
                            <img src={LOGO_URL} alt="COCOYEMA" className="h-12 w-auto object-contain"/>
                        </button>
                        
                        <h1 className="text-2xl font-bold text-amber-900 tracking-tight">COCOYEMA</h1>

                        <a 
                            href={CANVA_URL} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="p-2 text-amber-900 bg-white/50 rounded-full border border-stone-200 shadow-sm"
                        >
                            <BookOpen size={20} />
                        </a>
                    </div>

                    {/* DESKTOP HEADER: Original Large Centered Layout */}
                    <div className="hidden md:block relative items-center justify-center text-center py-4">
                        <button 
                            onClick={handleReset} 
                            className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-800 focus:ring-offset-2 rounded-full z-20"
                        >
                            <img src={LOGO_URL} alt="COCOYEMA Logo" className="h-28 transition-all duration-300"/>
                        </button>

                        <div className="text-center w-full z-10">
                            <h1 className="text-6xl font-bold text-amber-900 leading-tight">COCOYEMA</h1>
                            <p className="text-stone-600 mt-1 text-lg">Crea el conjunto perfecto para tu peque</p>
                        </div>

                         <a 
                            href={CANVA_URL} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 bg-white/60 hover:bg-white/90 backdrop-blur-sm border border-white/50 text-amber-900 font-semibold rounded-lg shadow-sm transition-all z-20"
                        >
                            <BookOpen size={18} />
                            <span>Catálogo</span>
                        </a>
                    </div>
                </header>
                
                {/* STEPPER */}
                <div className="w-full mb-4 lg:mb-0">
                    <Stepper steps={STEPS} currentStep={currentStep} />
                </div>

                {/* --- MAIN CONTENT GRID --- */}
                <main className="w-full flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 mt-2 lg:mt-8">
                    
                    {/* 
                       CONTROLS (Step Components)
                       Mobile: Order 1 (First Plane / Top)
                       Desktop: Order 1 (Left Column)
                    */}
                    <div className="bg-white rounded-2xl shadow-lg p-5 md:p-10 flex flex-col">
                        <div className="flex-grow">
                            {renderStep()}
                        </div>
                        
                        {/* Navigation Footer inside the Card */}
                        <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between">
                            <button
                                onClick={handleBack}
                                disabled={currentStep === 1}
                                className="flex items-center gap-2 px-4 md:px-6 py-3 bg-stone-200 text-stone-700 font-semibold rounded-lg shadow-sm hover:bg-stone-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm md:text-base"
                            >
                                <ArrowLeft size={18} />
                                <span className="hidden sm:inline">Anterior</span>
                            </button>
                            
                            <div className="text-center px-2">
                                <span className="text-stone-500 text-xs md:text-sm block">Precio Total</span>
                                <span className="text-xl md:text-2xl font-bold text-amber-900">${totalPrice.toLocaleString('es-CO')}</span>
                            </div>
                            
                            {currentStep < STEPS.length ? (
                                <button
                                    onClick={handleNext}
                                    disabled={isNextDisabled()}
                                    className="flex items-center gap-2 px-4 md:px-6 py-3 bg-amber-800 text-white font-semibold rounded-lg shadow-md hover:bg-amber-900 disabled:bg-stone-400 disabled:cursor-not-allowed transition-all text-sm md:text-base"
                                >
                                    <span>Siguiente</span>
                                    <ArrowRight size={18} />
                                </button>
                            ) : (
                                <div className="w-10 sm:w-20 md:w-40"></div>
                            )}
                        </div>
                    </div>

                    {/* 
                       PREVIEW (Visual Feedback)
                       Mobile: Order 2 (Below Controls, Miniature Rectangle)
                       Desktop: Order 2 (Right Column, Sticky)
                    */}
                    <div className="lg:sticky lg:top-8 h-auto">
                        {/* 
                           The container height changes based on screen size:
                           Mobile: h-64 (Fixed rectangular miniature window below controls)
                           Desktop: Auto/Full height
                        */}
                        <div className="h-64 lg:h-auto lg:min-h-[600px] w-full">
                             <Preview selections={selections} />
                        </div>
                    </div>

                </main>

                <footer className="w-full text-center mt-auto pt-8 flex items-center justify-center gap-4 md:gap-6 text-xs sm:text-sm text-stone-600 pb-20 sm:pb-8">
                    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-amber-800 transition-colors">
                        <Instagram size={18} />
                        <span className="hidden sm:inline">Visítanos en Instagram</span>
                        <span className="sm:hidden">Instagram</span>
                    </a>
                    <span className="text-stone-400">|</span>
                    <a href={FURIAROCK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-amber-800 transition-colors">
                        Furiarock t-shirts
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
