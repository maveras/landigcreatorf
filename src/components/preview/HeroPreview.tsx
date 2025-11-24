import React, { forwardRef } from 'react';
import * as LucideIcons from 'lucide-react';
import { LandingConfig, FeatureItem } from '../../types';

interface HeroPreviewProps {
    config: LandingConfig;
}

export const HeroPreview = forwardRef<HTMLDivElement, HeroPreviewProps>(({ config }, ref) => {
    // --- Common Helpers ---
    const renderIcon = (feature: FeatureItem) => {
        if (feature.iconType === 'emoji') {
            return <span style={{ fontSize: `${feature.iconSize}px`, lineHeight: 1 }}>{feature.iconValue}</span>;
        } else if (feature.iconType === 'image') {
            return <img src={feature.iconValue} alt="" style={{ width: `${feature.iconSize}px`, height: `${feature.iconSize}px`, objectFit: 'contain' }} />;
        } else if (feature.iconType === 'icon') {
            // @ts-ignore
            const IconComponent = LucideIcons[feature.iconValue];
            if (IconComponent) {
                return <IconComponent size={feature.iconSize} color={feature.iconColor} />;
            }
            return null;
        }
        return null;
    };

    // --- Classic Layout Helpers ---
    const topGradientStyle: React.CSSProperties = {
        height: `${config.topGradientHeight}px`,
        background: `linear-gradient(to top, transparent, ${config.topGradientBaseColor})`,
    };

    const separator1Style: React.CSSProperties = {
        height: `${config.separator1Height}px`,
        background: `linear-gradient(to bottom, ${config.separator1ColorStart}, ${config.separator1ColorEnd})`,
    };

    const getPositionClasses = (position: string) => {
        const [vertical, horizontal] = position.split('-');
        let classes = 'flex flex-col ';

        if (vertical === 'top') classes += 'justify-start ';
        else if (vertical === 'center') classes += 'justify-center ';
        else classes += 'justify-end '; // bottom

        if (horizontal === 'left') classes += 'items-start text-left ';
        else if (horizontal === 'center') classes += 'items-center text-center ';
        else classes += 'items-end text-right '; // right

        return classes;
    };

    const getFeatureBackground = (feature: FeatureItem) => {
        if (feature.bgType === 'solid') {
            return feature.bgColor;
        } else {
            return `linear-gradient(${feature.gradientDirection}, ${feature.gradientStart}, ${feature.gradientEnd})`;
        }
    };

    // --- Split Layout Render ---
    if (config.heroType === 'split') {
        // Divider SVG Path
        let dividerPath = '';
        if (config.heroSplitDividerStyle === 'straight') {
            dividerPath = 'M0,100 L100,0 L100,100 Z'; // Simple diagonal
        } else if (config.heroSplitDividerStyle === 'wave-soft') {
            dividerPath = 'M0,100 C30,100 30,0 100,0 L100,100 Z'; // Soft wave
        } else { // wave-heavy
            // Multi-wave diagonal path
            dividerPath = 'M0,100 C 20,90 20,60 40,50 S 60,10 80,20 S 100,10 100,0 L 100,100 Z';
        }

        const hexToRgba = (hex: string, alpha: number) => {
            let r = 0, g = 0, b = 0;
            if (hex.length === 4) {
                r = parseInt(hex[1] + hex[1], 16);
                g = parseInt(hex[2] + hex[2], 16);
                b = parseInt(hex[3] + hex[3], 16);
            } else if (hex.length === 7) {
                r = parseInt(hex.slice(1, 3), 16);
                g = parseInt(hex.slice(3, 5), 16);
                b = parseInt(hex.slice(5, 7), 16);
            }
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };

        return (
            <div ref={ref} className="w-full relative flex flex-col overflow-hidden" id="hero-section-to-capture" style={{ minHeight: '600px' }}>
                {/* Background Layer */}
                <div className="absolute inset-0 z-0" style={{ backgroundColor: config.heroSplitLineColor1 }}>
                    <svg className="absolute bottom-0 right-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <path d={dividerPath} fill={config.heroSplitLineColor2} />
                    </svg>
                </div>

                {/* Content Container */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 space-y-6 text-center w-full max-w-4xl mx-auto">

                    {/* Top Phrase */}
                    <div
                        className="font-bold uppercase tracking-wider mb-2"
                        style={{
                            color: config.heroSplitTopPhraseColor,
                            fontFamily: config.heroSplitTopPhraseFont,
                            fontSize: '1.2rem'
                        }}
                    >
                        {config.heroSplitTopPhrase}
                    </div>

                    {/* Product Image */}
                    {config.heroPriceImageUrl && (
                        <div className="relative w-48 h-48 md:w-64 md:h-64 mb-4">
                            <img
                                src={config.heroPriceImageUrl}
                                alt="Producto"
                                className="w-full h-full object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    )}

                    {/* Product Name */}
                    <h1
                        className="font-black leading-none"
                        style={{
                            fontSize: `${config.productNameSize}px`,
                            color: config.productNameColor,
                            fontFamily: config.productNameFont,
                            textShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                    >
                        {config.productName}
                    </h1>

                    {/* Price Section */}
                    <div className="flex flex-col items-center space-y-1">
                        <div className="flex items-baseline gap-3">
                            <span
                                className="font-bold"
                                style={{ fontSize: '3rem', color: config.heroPriceColor }}
                            >
                                {config.heroPriceValue}
                            </span>
                            {config.heroOldPriceValue && (
                                <span
                                    className="text-xl line-through opacity-60"
                                    style={{ color: config.heroOldPriceColor || config.heroPriceColor }}
                                >
                                    {config.heroOldPriceValue}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button
                        className="px-8 py-4 rounded-full font-bold text-xl shadow-xl transform hover:scale-105 transition-all duration-200 hover:shadow-2xl"
                        style={{
                            backgroundColor: config.heroCtaBgColor,
                            color: config.heroCtaTextColor
                        }}
                    >
                        {config.heroCtaText}
                    </button>

                </div>

                {/* Horizontal Benefits Footer */}
                <div
                    className="relative z-20 py-4 px-4 mt-auto border-t border-gray-100"
                    style={{
                        backgroundColor: hexToRgba(config.heroAltBenefitsBgColor, config.heroAltBenefitsBgOpacity),
                        backdropFilter: 'blur(4px)'
                    }}
                >
                    <div className="max-w-5xl mx-auto grid grid-cols-3 gap-4">
                        {config.heroAltBenefits.map((benefit, idx) => {
                            // @ts-ignore
                            const Icon = LucideIcons[benefit.icon] || LucideIcons.Star;
                            return (
                                <div key={idx} className="flex flex-col items-center text-center space-y-1">
                                    <div className="p-2 rounded-full bg-gray-50 shadow-sm">
                                        <Icon size={24} color={benefit.color} />
                                    </div>
                                    <span className="text-xs md:text-sm font-medium text-gray-700 leading-tight">
                                        {benefit.text}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        );
    }

    // --- Classic Layout Render (Existing) ---
    return (
        <div ref={ref} className="w-full relative flex flex-col" id="hero-section-to-capture">

            {/* 0. Barra de Urgencia */}
            {config.topBarVisible && (
                <div
                    className="w-full flex items-center justify-center px-2 text-center font-bold z-50 relative shrink-0"
                    style={{
                        height: `${config.topBarHeight}px`,
                        backgroundColor: config.topBarBgColor,
                        color: config.topBarTextColor,
                        fontSize: `${Math.max(10, config.topBarHeight * 0.4)}px` // Auto-size text based on height
                    }}
                >
                    {config.topBarText}
                </div>
            )}

            {/* 2. Contenido Principal */}
            <div
                className="w-full min-h-[550px] bg-cover bg-center relative overflow-hidden"
                style={{
                    backgroundImage: `url(${config.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {/* 1. Gradiente Superior (Siempre dentro, overlay) */}
                <div style={topGradientStyle} className="w-full absolute top-0 left-0 z-10"></div>

                {/* Overlay de Sombra */}
                <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

                {/* Container Absoluto para Texto y Features */}
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between pointer-events-none">

                    {/* Capa de Posicionamiento de Texto */}
                    <div className={`absolute inset-0 p-6 ${getPositionClasses(config.textPosition)} pointer-events-none`}>
                        <div className="pointer-events-auto relative">
                            {config.heroCircleVisible && (
                                <div
                                    className="absolute rounded-full z-0"
                                    style={{
                                        width: `${config.heroCircleSize}px`,
                                        height: `${config.heroCircleSize}px`,
                                        backgroundColor: config.heroCircleColor,
                                        opacity: config.heroCircleOpacity,
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        filter: 'blur(20px)'
                                    }}
                                ></div>
                            )}
                            <h2
                                className="font-black seo-text leading-tight relative z-10"
                                style={{
                                    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                                    fontSize: `${config.productNameSize}px`,
                                    color: config.productNameColor,
                                    fontFamily: config.productNameFont
                                }}
                            >
                                {config.productName}
                            </h2>
                            <p
                                className="font-semibold seo-phrase mt-2 relative z-10"
                                style={{
                                    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                                    fontSize: `${config.winningPhraseSize}px`,
                                    color: config.winningPhraseColor,
                                    fontFamily: config.winningPhraseFont
                                }}
                            >
                                {config.winningPhrase}
                            </p>
                        </div>
                    </div>

                    {/* Capa de Posicionamiento de Features */}
                    <div className={`absolute inset-0 p-6 ${getPositionClasses(config.featuresPosition)} pointer-events-none`}>
                        <div className={`grid gap-2 pointer-events-auto ${config.featureLayout === '2-columns' ? 'grid-cols-2' : 'grid-cols-1'} w-full max-w-[250px]`}>
                            {config.features.map((feature, index) => (
                                <div
                                    key={`s1-feat-${index}`}
                                    className="flex items-center space-x-2 p-2 shadow-sm transition-all duration-300"
                                    style={{
                                        background: getFeatureBackground(feature),
                                        opacity: feature.bgType === 'solid' ? feature.bgOpacity : 1,
                                        borderRadius: `${feature.borderRadius}px`,
                                        transform: `skewX(${feature.skewX}deg)`,
                                        color: feature.textColor
                                    }}
                                >
                                    <div className="flex items-center space-x-2" style={{ transform: `skewX(${-feature.skewX}deg)` }}>
                                        {renderIcon(feature)}
                                        <p
                                            className="leading-tight font-medium"
                                            style={{ fontSize: `${feature.textSize}px` }}
                                        >
                                            {feature.text}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {/* Subsección: Texto Rico */}
                            {config.heroRichText && (
                                <div
                                    className="col-span-full mt-4 p-3 rounded-lg pointer-events-auto"
                                    style={{
                                        backgroundColor: config.heroRichTextBgColor,
                                        color: config.heroRichTextColor,
                                        fontSize: `${config.heroRichTextFontSize}px`
                                    }}
                                    dangerouslySetInnerHTML={{ __html: config.heroRichText }}
                                />
                            )}

                            {/* Subsección: Precio y Oferta */}
                            {config.heroPriceVisible && (
                                <div className={`col-span-full mt-4 flex flex-col md:flex-row items-center gap-4 pointer-events-auto ${config.heroPriceLayout === 'price-right' ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Parte del Precio y CTA */}
                                    <div className="flex-1 text-center md:text-left">
                                        <div className="flex items-baseline justify-center md:justify-start gap-2 mb-1">
                                            <span
                                                className="font-bold"
                                                style={{ color: config.heroPriceColor, fontSize: `${config.heroPriceSize}px` }}
                                            >
                                                {config.heroPriceValue}
                                            </span>
                                            {config.heroOldPriceValue && (
                                                <span
                                                    className="line-through"
                                                    style={{ color: config.heroOldPriceColor, fontSize: `${config.heroOldPriceSize}px` }}
                                                >
                                                    {config.heroOldPriceValue}
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            className="px-4 py-2 rounded-full font-bold shadow-lg transform hover:scale-105 transition-transform duration-200"
                                            style={{
                                                backgroundColor: config.heroCtaBgColor,
                                                color: config.heroCtaTextColor,
                                                fontSize: '14px'
                                            }}
                                        >
                                            {config.heroCtaText}
                                        </button>
                                    </div>

                                    {/* Parte de la Imagen */}
                                    {config.heroPriceImageUrl && (
                                        <div className="flex-1 flex justify-center">
                                            <img
                                                src={config.heroPriceImageUrl}
                                                alt="Producto"
                                                className="max-w-[100px] rounded-lg shadow-md object-cover"
                                                style={{ maxHeight: '100px' }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* 4. Gradiente Separador S1 a S2 */}
            <div style={separator1Style} className="w-full z-10 relative -mt-1"></div>

        </div>
    );
});

HeroPreview.displayName = 'HeroPreview';
