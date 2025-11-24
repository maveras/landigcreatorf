import React, { forwardRef } from 'react';
import { LandingConfig } from '../../types';

interface BenefitsPreviewProps {
    config: LandingConfig;
}

export const BenefitsPreview = forwardRef<HTMLDivElement, BenefitsPreviewProps>(({ config }, ref) => {
    // Separador S2 y S3
    const separator2Style: React.CSSProperties = {
        height: `${config.separator2Height}px`,
        background: `linear-gradient(to bottom, ${config.separator2ColorStart}, ${config.separator2ColorEnd})`,
    };

    return (
        <div ref={ref} className="w-full relative" id="section-2-to-capture" style={{ backgroundColor: config.section2BgColor }}>

            {/* Gradiente Superior S2 */}
            <div
                style={{
                    height: `${config.section2TopGradientHeight}px`,
                    background: `linear-gradient(to bottom, ${config.section2TopGradientColorStart}, ${config.section2TopGradientColorEnd})`,
                    width: '100%'
                }}
            ></div>

            <h2
                className="text-lg font-bold text-center pt-6 pb-2 px-4 mb-4"
                style={{
                    color: config.section2TitleColor,
                    fontFamily: config.section2TitleFont
                }}
            >
                {config.section2Title}
            </h2>

            <div className={`p-4 pb-6 ${config.section2Layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 gap-4' : 'space-y-4'}`}>
                {config.section2Benefits.map((benefit, index) => (
                    <div
                        key={`s2-ben-${index}`}
                        className={`
                            ${config.section2Layout === 'grid'
                                ? 'flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100'
                                : 'flex items-start space-x-3'
                            }
                        `}
                    >
                        <span
                            className={`${config.section2Layout === 'grid' ? 'text-4xl mb-3' : 'text-2xl pt-1'}`}
                            style={{ color: benefit.color }}
                        >
                            {benefit.icon}
                        </span>
                        <div>
                            <h3 className="font-semibold text-gray-900 leading-snug">{benefit.title}</h3>
                            <p className="text-xs text-gray-600 mt-0.5">{benefit.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 4. Gradiente Separador S2 a S3 */}
            <div style={separator2Style} className="w-full z-10"></div>
        </div>
    );
});

BenefitsPreview.displayName = 'BenefitsPreview';
