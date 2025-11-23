import { LandingConfig } from '../types';

export const LOCAL_STORAGE_KEY = 'landingPageConfig';

export const initialConfig: LandingConfig = {
    // Sección 1 Defaults
    productName: 'PRODUCTO INCREÍBLE',
    productNameSize: 32,
    winningPhrase: 'Frase Ganadora Impactante (¡COPIAR Y PEGAR EN GEMPAGES!)',
    winningPhraseSize: 16,
    textPosition: 'bottom-left',

    imageUrl: 'https://via.placeholder.com/800x1200?text=IMAGEN+DE+FONDO',
    topGradientBaseColor: '#F3F4F6',
    topGradientHeight: 40,
    separator1ColorStart: '#F3F4F6',
    separator1ColorEnd: '#000000',
    separator1Height: 50,

    features: [
        {
            text: 'Refrescante al instante',
            iconType: 'icon',
            iconValue: 'Zap',
            iconColor: '#FFD700',
            iconSize: 24,
            textColor: '#000000',
            textSize: 16,
            bgType: 'solid',
            bgColor: '#FFFFFF',
            bgOpacity: 0.9,
            gradientStart: '#ffffff',
            gradientEnd: '#f0f0f0',
            gradientDirection: 'to right',
            borderRadius: 8,
            skewX: -10
        },
        {
            text: 'Siente el sabor único',
            iconType: 'icon',
            iconValue: 'Sparkles',
            iconColor: '#FF69B4',
            iconSize: 24,
            textColor: '#000000',
            textSize: 16,
            bgType: 'solid',
            bgColor: '#FFFFFF',
            bgOpacity: 0.9,
            gradientStart: '#ffffff',
            gradientEnd: '#f0f0f0',
            gradientDirection: 'to right',
            borderRadius: 8,
            skewX: -10
        },
        {
            text: 'Disfruta la frescura',
            iconType: 'icon',
            iconValue: 'Droplet',
            iconColor: '#00BFFF',
            iconSize: 24,
            textColor: '#000000',
            textSize: 16,
            bgType: 'solid',
            bgColor: '#FFFFFF',
            bgOpacity: 0.9,
            gradientStart: '#ffffff',
            gradientEnd: '#f0f0f0',
            gradientDirection: 'to right',
            borderRadius: 8,
            skewX: -10
        },
    ],
    featuresPosition: 'bottom-left',
    featureLayout: 'left',

    // Sección 2 Defaults
    section2Title: '3 Razones por las que NECESITAS este Producto',
    section2BgColor: '#FFFFFF',
    section2Benefits: [
        { icon: '⏰', title: 'Ahorra Tiempo', description: 'Elimina las horas perdidas y simplifica tu rutina diaria.', color: '#EF4444' },
        { icon: '💰', title: 'Ahorra Dinero', description: 'Olvídate de soluciones caras. La mejor opción a un precio inigualable.', color: '#3B82F6' },
        { icon: '✨', title: 'Resultados Garantizados', description: 'Mira la diferencia desde el primer día. Eficacia comprobada.', color: '#10B981' }
    ],
    separator2ColorStart: '#FFFFFF',
    separator2ColorEnd: '#F3F4F6',
    separator2Height: 30,

    // Sección 3 Defaults
    section3Title: 'Lo que dicen nuestros clientes satisfechos',
    section3BgColor: '#F3F4F6',
    section3Testimonials: [
        { name: 'Ana M.', rating: 5, text: '¡Cambió mi vida! Es un producto robusto y funciona tal como se describe. Excelente inversión.', avatarUrl: 'https://placehold.co/40x40/FF5733/FFFFFF?text=A' },
        { name: 'Juan C.', rating: 4, text: 'Buen producto en general. Cumple las expectativas y llegó muy rápido. Un 4/5 sólido.', avatarUrl: 'https://placehold.co/40x40/33AFFF/FFFFFF?text=J' },
        { name: 'Sofía V.', rating: 5, text: 'El mejor producto que he comprado en mucho tiempo. Lo recomiendo a todos mis amigos.', avatarUrl: 'https://placehold.co/40x40/33FF57/FFFFFF?text=S' }
    ],
    separator3ColorStart: '#F3F4F6',
    separator3ColorEnd: '#FFFFFF',
    separator3Height: 30,
};
