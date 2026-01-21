
import { BaseType, Color, TshirtColor, Placement, Size } from './types';

export const WHATSAPP_NUMBER = "573147995183";
export const CANVA_URL = "https://www.canva.com/design/DAG-_c0OJuk/UGeTUITeRBqYqGaLn80aDA/view?utm_content=DAG-_c0OJuk&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=ha0dd70bf48";
const RAW_BASE = "https://raw.githubusercontent.com/furiarocktshirtscolombia-netizen/cocoyema-assets/main";

export const LOGO_URL = `${RAW_BASE}/assets/branding/logo_cocoyema.png`;
export const BACKGROUND_URL = `${RAW_BASE}/assets/backgrounds/bg_texture.png`;
export const INSTAGRAM_URL = "https://www.instagram.com/cocoyemacolombia/";
export const FURIAROCK_URL = "https://www.furia-rock.com/";


export const ASSETS = {
    shorts: {
        negro: `${RAW_BASE}/assets/shorts/short_negro.png`,
        blanco: `${RAW_BASE}/assets/shorts/short_blanco.png`,
        arena: `${RAW_BASE}/assets/shorts/short_arena.png`,
        verde: `${RAW_BASE}/assets/shorts/short_verde.png`,
        rosa_pastel: `${RAW_BASE}/assets/shorts/short_rosa_pastel.png`,
        azul_pastel: `${RAW_BASE}/assets/shorts/short_azul_pastel.png`,
        lila_pastel: `${RAW_BASE}/assets/shorts/short_lila_pastel.png`,
        verde_menta: `${RAW_BASE}/assets/shorts/short_verde_menta.png`,
    },
    joggers: {
        negro: `${RAW_BASE}/assets/joggers/jogger_negro.png`,
        blanco: `${RAW_BASE}/assets/joggers/jogger_blanco.png`,
        arena: `${RAW_BASE}/assets/joggers/jogger_arena.png`,
        verde: `${RAW_BASE}/assets/joggers/jogger_verde.png`,
        rosa_pastel: `${RAW_BASE}/assets/joggers/jogger_rosa_pastel.png`,
        azul_pastel: `${RAW_BASE}/assets/joggers/jogger_azul_pastel.png`,
        lila_pastel: `${RAW_BASE}/assets/joggers/jogger_lila_pastel.png`,
        verde_menta: `${RAW_BASE}/assets/joggers/jogger_verde_menta.png`,
    },
    camisetas: {
        blanca: `${RAW_BASE}/assets/camisetas/tee_blanca.png`,
        negra: `${RAW_BASE}/assets/camisetas/tee_negra.png`,
        arena: `${RAW_BASE}/assets/camisetas/tee_arena.png`,
    },
};

export const PRICES = {
    shortsSet: 80000,
    joggerSet: 85000,
};

export const STEPS = [
    { id: 1, name: 'Base' },
    { id: 2, name: 'Color' },
    { id: 3, name: 'Camiseta' },
    { id: 4, name: 'Diseño' },
    { id: 5, name: 'Resumen' },
];

export const BASE_OPTIONS = [
    { id: BaseType.Shorts, name: 'Pantaloneta', image: ASSETS.shorts.negro },
    { id: BaseType.Jogger, name: 'Jogger', image: ASSETS.joggers.negro },
];

export const COLOR_OPTIONS: { id: Color, name: string, hex: string }[] = [
    { id: 'negro', name: 'Negro', hex: '#262626' },
    { id: 'blanco', name: 'Blanco', hex: '#F7F7F7' },
    { id: 'arena', name: 'Arena', hex: '#D8CDBF' },
    { id: 'verde', name: 'Verde Militar', hex: '#5E6D56' },
    { id: 'rosa_pastel', name: 'Rosa Pastel', hex: '#F4D3DD' },
    { id: 'azul_pastel', name: 'Azul Pastel', hex: '#C7D9E8' },
    { id: 'lila_pastel', name: 'Lila Pastel', hex: '#D9D2E9' },
    { id: 'verde_menta', name: 'Verde Menta', hex: '#C7E2D8' },
];

export const TSHIRT_COLOR_OPTIONS: { id: TshirtColor, name: string, hex: string }[] = [
    { id: 'blanca', name: 'Blanca', hex: '#F7F7F7' },
    { id: 'negra', name: 'Negra', hex: '#262626' },
    { id: 'arena', name: 'Arena', hex: '#D8CDBF' },
];

export const PLACEMENT_OPTIONS: Record<string, { id: Placement, name: string }[]> = {
    'Frente': [
        { id: 'frente_grande', name: 'Frente grande' },
        { id: 'pecho', name: 'Pecho' },
        { id: 'punto_corazon', name: 'Punto corazón' },
    ],
    'Mangas': [
        { id: 'manga_izquierda', name: 'Manga izquierda' },
        { id: 'manga_derecha', name: 'Manga derecha' },
    ],
    'Espalda': [
        { id: 'espalda_completa', name: 'Espalda completa' },
        { id: 'espalda_superior', name: 'Espalda superior' },
    ]
};

export const SIZES: Size[] = ['0-2', '2-4', '6-8', '10-12', '14-16'];
