import { LandingConfig } from '../types';

export const LOCAL_STORAGE_KEY = 'landingPageConfig';

export const FONT_OPTIONS = [
    { label: 'Inter', value: 'var(--font-inter), sans-serif' },
    { label: 'Roboto', value: 'var(--font-roboto), sans-serif' },
    { label: 'Open Sans', value: 'var(--font-open-sans), sans-serif' },
    { label: 'Montserrat', value: 'var(--font-montserrat), sans-serif' },
    { label: 'Lato', value: 'var(--font-lato), sans-serif' },
    { label: 'Poppins', value: 'var(--font-poppins), sans-serif' },
    { label: 'Playfair Display', value: 'var(--font-playfair-display), serif' },
    { label: 'Merriweather', value: 'var(--font-merriweather), serif' },
    { label: 'Oswald', value: 'var(--font-oswald), sans-serif' },
    { label: 'Raleway', value: 'var(--font-raleway), sans-serif' },
];

export const initialConfig: LandingConfig = {
    // Sección 1 Defaults
    productName: 'PRODUCTO INCREÍBLE',
    productNameSize: 32,
    productNameColor: '#FFFFFF',
    productNameFont: 'var(--font-inter), sans-serif',
    winningPhrase: 'Frase Ganadora Impactante (¡COPIAR Y PEGAR EN GEMPAGES!)',
    winningPhraseSize: 16,
    winningPhraseColor: '#FFFFFF',
    winningPhraseFont: 'var(--font-inter), sans-serif',
    textPosition: 'bottom-left',

    // Top Bar Defaults
    topBarVisible: false,
    topBarText: '🔥 ¡OFERTA POR TIEMPO LIMITADO! 50% OFF 🔥',
    topBarBgColor: '#EF4444',
    topBarTextColor: '#FFFFFF',
    topBarHeight: 40,

    // Hero Rich Text Defaults
    heroRichText: 'Este es un texto <b>importante</b> que destaca los beneficios.',
    heroRichTextColor: '#333333',
    heroRichTextFontSize: 16,
    heroRichTextBgColor: '#F9FAFB',

    // Hero Price & CTA Defaults
    heroPriceVisible: true,
    heroPriceLayout: 'price-left',
    heroPriceValue: '$29.99',
    heroPriceColor: '#111827',
    heroPriceSize: 32,
    heroOldPriceValue: '$59.99',
    heroOldPriceColor: '#9CA3AF',
    heroOldPriceSize: 18,
    heroCtaText: '¡COMPRAR AHORA!',
    heroCtaTextColor: '#FFFFFF',
    heroCtaBgColor: '#EF4444',
    heroPriceImageUrl: 'https://via.placeholder.com/300x300?text=Producto',

    // Hero Split Defaults
    heroType: 'classic',
    heroSplitLineColor1: '#F3F4F6',
    heroSplitLineColor2: '#FFFFFF',
    heroSplitDividerStyle: 'wave-soft',
    heroSplitTopPhrase: '¡LA MEJOR OPCIÓN PARA TI!',
    heroSplitTopPhraseColor: '#111827',
    heroSplitTopPhraseFont: 'var(--font-inter), sans-serif',
    heroAltBenefits: [
        { icon: 'Rocket', text: 'Envío Rápido', color: '#10B981' },
        { icon: 'Shield', text: 'Garantía Total', color: '#3B82F6' },
        { icon: 'Star', text: 'Calidad Premium', color: '#F59E0B' }
    ],
    heroAltBenefitsBgColor: '#FFFFFF',
    heroAltBenefitsBgOpacity: 0.9,

    imageUrl: 'https://via.placeholder.com/800x1200?text=IMAGEN+DE+FONDO',
    topGradientBaseColor: '#F3F4F6',
    topGradientHeight: 40,
    separator1ColorStart: '#F3F4F6',
    separator1ColorEnd: '#000000',
    separator1Height: 50,

    // Hero Circle Defaults
    heroCircleVisible: false,
    heroCircleSize: 100,
    heroCircleColor: '#FFD700',
    heroCircleOpacity: 0.5,

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
    section2Layout: 'list',
    section2TopGradientHeight: 40,
    section2TopGradientColorStart: '#000000',
    section2TopGradientColorEnd: 'transparent',
    section2Title: '3 Razones por las que NECESITAS este Producto',
    section2TitleColor: '#111827',
    section2TitleFont: 'var(--font-inter), sans-serif',
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
    section3Layout: 'list',
    section3Title: 'Lo que dicen nuestros clientes satisfechos',
    section3TitleColor: '#111827',
    section3TitleFont: 'var(--font-inter), sans-serif',
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
