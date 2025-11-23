import React, { forwardRef } from 'react';
import * as LucideIcons from 'lucide-react';
import { LandingConfig, FeatureItem } from '../../types';

interface HeroPreviewProps {
    config: LandingConfig;
}

export const HeroPreview = forwardRef<HTMLDivElement, HeroPreviewProps>(({ config }, ref) => {
    // Gradiente Superior (S1)
    const topGradientStyle: React.CSSProperties = {
        height: `${config.topGradientHeight}px`,
        background: `linear-gradient(to top, transparent, ${config.topGradientBaseColor})`,
    };

    // Separador S1 y S2
    const separator1Style: React.CSSProperties = {
        height: `${config.separator1Height}px`,
        background: `linear-gradient(to bottom, ${config.separator1ColorStart}, ${config.separator1ColorEnd})`,
    };

    // Helper para convertir posición (ej: 'top-left') a clases de Flexbox
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

    // Helper para el background de un feature individual
    const getFeatureBackground = (feature: FeatureItem) => {
        if (feature.bgType === 'solid') {
            return feature.bgColor;
        } else {
            return `linear-gradient(${feature.gradientDirection}, ${feature.gradientStart}, ${feature.gradientEnd})`;
        }
    };

    // Helper para renderizar el icono dinámicamente
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

    return (
        <div ref={ref} className="w-full relative" id="hero-section-to-capture">
            {/* 1. Gradiente Superior */}
            <div style={topGradientStyle} className="w-full absolute top-0 left-0 z-10"></div>

            {/* 2. Contenido Principal */}
            <div
                className="w-full min-h-[550px] bg-cover bg-center relative overflow-hidden"
                style={{
                    backgroundImage: `url(${config.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {/* Overlay de Sombra */}
                <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

                {/* Container Absoluto para Texto y Features */}
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between pointer-events-none">

                    {/* Capa de Posicionamiento de Texto */}
                    <div className={`absolute inset-0 p-6 ${getPositionClasses(config.textPosition)} pointer-events-none`}>
                        <div className="pointer-events-auto">
                            <h2
                                className="font-black seo-text text-white leading-tight"
                                style={{
                                    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                                    fontSize: `${config.productNameSize}px`
                                }}
                            >
                                {config.productName}
                            </h2>
                            <p
                                className="font-semibold seo-phrase mt-2 text-white"
                                style={{
                                    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                                    fontSize: `${config.winningPhraseSize}px`
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
