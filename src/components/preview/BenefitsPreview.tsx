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

            <h2 className="text-lg font-bold text-center pt-6 pb-2 px-4 text-gray-900">
                {config.section2Title}
            </h2>

            <div className="space-y-4 p-4 pb-6">
                {config.section2Benefits.map((benefit, index) => (
                    <div key={`s2-ben-${index}`} className="flex items-start space-x-3">
                        <span className="text-2xl pt-1" style={{ color: benefit.color }}>
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
