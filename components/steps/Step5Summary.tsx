
import React from 'react';
import { Selections, Size } from '../../types';
import { SIZES, WHATSAPP_NUMBER, PLACEMENT_OPTIONS } from '../../constants';
import { MessageCircle, Send } from 'lucide-react';

interface Step5SummaryProps {
    selections: Selections;
    onUpdateSize: (size: Size) => void;
    onUpdateNotes: (notes: string) => void;
    totalPrice: number;
}

const Step5Summary: React.FC<Step5SummaryProps> = ({ selections, onUpdateSize, onUpdateNotes, totalPrice }) => {

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
            `*Pedido COCOYEMA*`,
            ``,
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
    
    const handleWhatsAppOrder = () => {
        if (!selections.size) {
            alert('Por favor, selecciona una talla.');
            return;
        }
        const message = encodeURIComponent(formatSummary());
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
        window.open(url, '_blank');
    };


    return (
        <div>
            <h2 className="text-3xl font-bold text-stone-800 mb-2">Casi listo, ¡últimos detalles!</h2>
            <p className="text-stone-500 mb-8">Confirma la talla y agrega cualquier nota especial para tu pedido.</p>

            <div className="space-y-6">
                <div>
                    <label htmlFor="size" className="block text-lg font-semibold text-stone-700 mb-2">Talla (obligatorio)</label>
                    <select
                        id="size"
                        value={selections.size || ''}
                        onChange={(e) => onUpdateSize(e.target.value as Size)}
                        className="w-full p-3 border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-amber-800 focus:border-amber-800 transition"
                    >
                        <option value="" disabled>Selecciona una talla...</option>
                        {SIZES.map(size => (
                            <option key={size} value={size}>Talla {size} años</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="notes" className="block text-lg font-semibold text-stone-700 mb-2">Notas adicionales</label>
                     <div className="relative">
                        <MessageCircle className="absolute top-3.5 left-3 w-5 h-5 text-stone-400" />
                        <textarea
                            id="notes"
                            value={selections.notes}
                            onChange={(e) => onUpdateNotes(e.target.value)}
                            placeholder="Ej: El diseño en la espalda, un poco más grande..."
                            rows={4}
                            className="w-full p-3 pl-10 border border-stone-300 rounded-lg bg-white focus:ring-2 focus:ring-amber-800 focus:border-amber-800 transition"
                        />
                     </div>
                </div>

                <div className="pt-6 border-t border-stone-200">
                    <button
                        onClick={handleWhatsAppOrder}
                        disabled={!selections.size}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-green-500 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-green-600 disabled:bg-stone-400 disabled:cursor-not-allowed transition-all"
                    >
                        <Send size={22} />
                        Ordenar por WhatsApp
                    </button>
                     <p className="text-xs text-stone-500 text-center mt-3">Serás redirigido a WhatsApp para finalizar tu pedido. Si indicaste que tenías un diseño, no olvides enviarlo también en el chat.</p>
                </div>
            </div>
        </div>
    );
};

export default Step5Summary;
