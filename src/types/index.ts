export interface BenefitItem {
    icon: string;
    title: string;
    description: string;
    color: string;
}

export interface TestimonialItem {
    name: string;
    rating: number; // 1 to 5
    text: string;
    avatarUrl: string;
}

export interface FeatureItem {
    text: string;
    iconType: 'emoji' | 'image' | 'icon';
    iconValue: string;

    // Estilos Individuales
    iconColor: string;
    iconSize: number;
    textColor: string;
    textSize: number;

    bgType: 'solid' | 'gradient';
    bgColor: string;
    bgOpacity: number;
    gradientStart: string;
    gradientEnd: string;
    gradientDirection: 'to right' | 'to bottom' | 'to bottom right';

    borderRadius: number;
    skewX: number;
}

export interface LandingConfig {
    // Sección 1 (Hero)
    productName: string;
    productNameSize: number;
    winningPhrase: string;
    winningPhraseSize: number;
    textPosition: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

    imageUrl: string;
    topGradientBaseColor: string;
    topGradientHeight: number;

    separator1ColorStart: string; // Separador entre S1 y S2
    separator1ColorEnd: string;
    separator1Height: number;

    features: FeatureItem[];
    featuresPosition: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    featureLayout: 'left' | '2-columns';

    // Sección 2 (Problem-Solution / Beneficios Detallados)
    section2Title: string;
    section2BgColor: string;
    section2Benefits: BenefitItem[];
    separator2ColorStart: string; // Separador entre S2 y S3
    separator2ColorEnd: string;
    separator2Height: number;

    // Sección 3 (Testimonios)
    section3Title: string;
    section3BgColor: string;
    section3Testimonials: TestimonialItem[];
    separator3ColorStart: string; // Separador entre S3 y S4
    separator3ColorEnd: string;
    separator3Height: number;
}
