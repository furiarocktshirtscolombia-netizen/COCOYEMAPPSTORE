
export enum BaseType {
    Shorts = 'shorts',
    Jogger = 'jogger',
}

export type Color = 'negro' | 'blanco' | 'arena' | 'verde' | 'rosa_pastel' | 'azul_pastel' | 'lila_pastel' | 'verde_menta';
export type TshirtColor = 'blanca' | 'negra' | 'arena';
export type Placement = 'frente_grande' | 'pecho' | 'punto_corazon' | 'manga_izquierda' | 'manga_derecha' | 'espalda_completa' | 'espalda_superior';
export type Size = '0-2' | '2-4' | '6-8' | '10-12' | '14-16';

export interface Design {
    hasCustomDesign: boolean;
    placement: Placement;
}

export interface Selections {
    base: BaseType | null;
    baseColor: Color;
    tshirtColor: TshirtColor;
    design: Design;
    size: Size | null;
    notes: string;
}
