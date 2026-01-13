
import React from 'react';
import { Selections, Size, CustomerDetails } from '../../types';
import { SIZES, WHATSAPP_NUMBER, PLACEMENT_OPTIONS } from '../../constants';
import { MessageCircle, Send, RotateCw, User, Phone, MapPin } from 'lucide-react';

interface Step5SummaryProps {
    selections: Selections;
    onUpdateSize: (size: Size) => void;
    onUpdateNotes: (notes: string) => void;
    onUpdateCustomerDetails: (details: CustomerDetails) => void;
    totalPrice: number;
    onReset: () => void;
}

const Step5Summary: React.FC<Step5SummaryProps> = ({ selections, onUpdateSize, onUpdateNotes, onUpdateCustomerDetails, totalPrice, onReset }) => {

    const { customerDetails } = selections;

    const handleCustomerDetailChange = (key: keyof CustomerDetails, value: string) => {
        onUpdateCustomerDetails({
            ...customerDetails,
            [key]: value
        });
    };

    const getPlacementName = (id: string): string => {
        const option = Object.values(PLACEMENT_OPTIONS).flat().find(p => p.id === id);
        return option ? option.name : id;
    }

    const formatSummary = () => {
        let estampadoLines: string[] = [];

        if (selections.design.hasCustomDesign) {
            estampadoLines = [
                `*Estampado*`,
                `*Ubicación:* ${getPlacementName(selections.design.placement)}`,
                `*Diseño:* 📎 El diseño será enviado por este chat.`
            ];
        } else {
            estampadoLines = [
                `*Estampado:* Sin diseño personalizado`
            ];
        }

        const summary = [
            `*Nuevo Pedido COCOYEMA*`,
            ``,
            `*Cliente:* ${customerDetails.fullName}`,
            `*Teléfono:* ${customerDetails.phoneNumber}`,
            `*Ubicación:* ${customerDetails.city} - ${customerDetails.department}`,
            `*Dirección:* ${customerDetails.address}`,
            ``,
            `--------------------------------`,
            `*DETALLES DEL PEDIDO*`,
            `*Base:* ${selections.base === 'shorts' ? 'Pantaloneta' : 'Jogger'}`,
            `*Color de Base:* ${selections.baseColor.replace(/_/g, ' ')}`,
            `*Color de Camiseta:* ${selections.tshirtColor}`,
            `*Talla:* ${selections.size} años`,
            ``,
            ...estampadoLines,
            ``,
            `*Notas:* ${selections.notes || 'Ninguna'}`,
            ``,
            `*Precio Total:* $${totalPrice.toLocaleString('es-CO')} COP`
        ];
        return summary.join('\n');
    };
    
    const isFormValid = () => {
        return selections.size && 
               customerDetails.fullName && 
               customerDetails.phoneNumber && 
               customerDetails.city && 
               customerDetails.department && 
               customerDetails.address;
    };

    const handleWhatsAppOrder = () => {
        if (!isFormValid()) {
            alert('Por favor, completa la talla y todos los datos de envío para continuar.');
            return;
        }
        const message = encodeURIComponent(formatSummary());
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
        window.open(url, '_blank');
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Finalizar Pedido</h2>
            <p className="text-stone-500 mb-6">Por favor completa tus datos de envío y confirma la talla para generar el pedido.</p>

            <div className="space-y-6">
                
                {/* Size Selection (Required) */}
                <div>
                    <label htmlFor="size" className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">Talla (Obligatorio)</label>
                    <select
                        id="size"
                        value={selections.size || ''}
                        onChange={(e) => onUpdateSize(e.target.value as Size)}
                        className="w-full p-3 border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-amber-800 focus:border-amber-800 transition shadow-sm"
                    >
                        <option value="" disabled>Selecciona una talla...</option>
                        {SIZES.map(size => (
                            <option key={size} value={size}>Talla {size} años</option>
                        ))}
                    </select>
                </div>

                {/* Customer Details Form */}
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-4">
                    <h3 className="font-bold text-stone-700 border-b border-stone-200 pb-2">Datos de Envío</h3>
                    
                    {/* Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-stone-600 mb-1">Nombre Completo</label>
                            <div className="relative">
                                <User className="absolute top-3 left-3 w-4 h-4 text-stone-400" />
                                <input 
                                    type="text" 
                                    value={customerDetails.fullName}
                                    onChange={(e) => handleCustomerDetailChange('fullName', e.target.value)}
                                    placeholder="Tu nombre"
                                    className="w-full p-2.5 pl-9 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 outline-none text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-stone-600 mb-1">Celular / WhatsApp</label>
                            <div className="relative">
                                <Phone className="absolute top-3 left-3 w-4 h-4 text-stone-400" />
                                <input 
                                    type="tel" 
                                    value={customerDetails.phoneNumber}
                                    onChange={(e) => handleCustomerDetailChange('phoneNumber', e.target.value)}
                                    placeholder="Ej: 300 123 4567"
                                    className="w-full p-2.5 pl-9 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 outline-none text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Department & City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-stone-600 mb-1">Departamento</label>
                            <input 
                                type="text" 
                                value={customerDetails.department}
                                onChange={(e) => handleCustomerDetailChange('department', e.target.value)}
                                placeholder="Ej: Antioquia"
                                className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-stone-600 mb-1">Ciudad / Municipio</label>
                            <input 
                                type="text" 
                                value={customerDetails.city}
                                onChange={(e) => handleCustomerDetailChange('city', e.target.value)}
                                placeholder="Ej: Medellín"
                                className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 outline-none text-sm"
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-xs font-semibold text-stone-600 mb-1">Dirección de Entrega</label>
                        <div className="relative">
                            <MapPin className="absolute top-3 left-3 w-4 h-4 text-stone-400" />
                            <input 
                                type="text" 
                                value={customerDetails.address}
                                onChange={(e) => handleCustomerDetailChange('address', e.target.value)}
                                placeholder="Ej: Calle 10 # 20-30, Apto 401"
                                className="w-full p-2.5 pl-9 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-800 focus:border-amber-800 outline-none text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Notes */}
                <div>
                    <label htmlFor="notes" className="block text-sm font-bold text-stone-700 mb-2">Notas adicionales (Opcional)</label>
                     <div className="relative">
                        <MessageCircle className="absolute top-3.5 left-3 w-5 h-5 text-stone-400" />
                        <textarea
                            id="notes"
                            value={selections.notes}
                            onChange={(e) => onUpdateNotes(e.target.value)}
                            placeholder="Ej: El diseño en la espalda, un poco más grande..."
                            rows={3}
                            className="w-full p-3 pl-10 border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-amber-800 focus:border-amber-800 transition text-sm shadow-sm"
                        />
                     </div>
                </div>

                <div className="pt-6 border-t border-stone-200">
                    <button
                        onClick={handleWhatsAppOrder}
                        disabled={!isFormValid()}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-green-500 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-green-600 disabled:bg-stone-300 disabled:cursor-not-allowed transition-all"
                    >
                        <Send size={22} />
                        Enviar Pedido
                    </button>
                     <p className="text-xs text-stone-500 text-center mt-3">Al hacer clic, se abrirá WhatsApp con todos los detalles listos para enviar.</p>
                     
                     <button
                        onClick={onReset}
                        className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-stone-100 text-stone-700 font-semibold rounded-lg shadow-sm hover:bg-stone-200 transition-all border border-stone-200"
                    >
                        <RotateCw size={18} />
                        Empezar de nuevo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Step5Summary;
