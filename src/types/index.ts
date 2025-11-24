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
    productNameColor: string;
    productNameFont: string;
    winningPhrase: string;
    winningPhraseSize: number;
    winningPhraseColor: string;
    winningPhraseFont: string;
    textPosition: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

    // Top Bar (Urgency)
    topBarVisible: boolean;
    topBarText: string;
    topBarBgColor: string;
    topBarTextColor: string;
    topBarHeight: number;

    // Hero Rich Text Subsection
    heroRichText: string;
    heroRichTextColor: string;
    heroRichTextFontSize: number;
    heroRichTextBgColor: string;

    // Hero Price & CTA Subsection
    heroPriceVisible: boolean;
    heroPriceLayout: 'price-left' | 'price-right';
    heroPriceValue: string;
    heroPriceColor: string;
    heroPriceSize: number;
    heroOldPriceValue: string;
    heroOldPriceColor: string;
    heroOldPriceSize: number;
    heroCtaText: string;
    heroCtaTextColor: string;
    heroCtaBgColor: string;
    heroPriceImageUrl: string;

    // Hero Variation: Split Diagonal
    heroType: 'classic' | 'split';
    heroSplitLineColor1: string;
    heroSplitLineColor2: string;
    heroSplitDividerStyle: 'straight' | 'wave-soft' | 'wave-heavy';
    heroSplitTopPhrase: string;
    heroSplitTopPhraseColor: string;
    heroSplitTopPhraseFont: string;
    heroAltBenefits: { icon: string; text: string; color: string }[];
    heroAltBenefitsBgColor: string;
    heroAltBenefitsBgOpacity: number;

    imageUrl: string;
    topGradientBaseColor: string;
    topGradientHeight: number;

    separator1ColorStart: string; // Separador entre S1 y S2
    separator1ColorEnd: string;
    separator1Height: number;

    // Hero Circle
    heroCircleVisible: boolean;
    heroCircleSize: number;
    heroCircleColor: string;
    heroCircleOpacity: number;

    features: FeatureItem[];
    featuresPosition: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    featureLayout: 'left' | '2-columns';

    // Sección 2 (Problem-Solution / Beneficios Detallados)
    section2Layout: 'list' | 'grid';
    section2TopGradientHeight: number;
    section2TopGradientColorStart: string;
    section2TopGradientColorEnd: string;
    section2Title: string;
    section2TitleColor: string;
    section2TitleFont: string;
    section2BgColor: string;
    section2Benefits: BenefitItem[];
    separator2ColorStart: string; // Separador entre S2 y S3
    separator2ColorEnd: string;
    separator2Height: number;

    // Sección 3 (Testimonios)
    section3Layout: 'list' | 'grid';
    section3Title: string;
    section3TitleColor: string;
    section3TitleFont: string;
    section3BgColor: string;
    section3Testimonials: TestimonialItem[];
    separator3ColorStart: string; // Separador entre S3 y S4
    separator3ColorEnd: string;
    separator3Height: number;
}
