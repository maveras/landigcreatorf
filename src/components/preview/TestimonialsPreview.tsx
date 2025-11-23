import React, { forwardRef } from 'react';
import { LandingConfig } from '../../types';
import { RatingStars } from '../ui/RatingStars';

interface TestimonialsPreviewProps {
    config: LandingConfig;
}

export const TestimonialsPreview = forwardRef<HTMLDivElement, TestimonialsPreviewProps>(({ config }, ref) => {
    // Separador S3 y S4
    const separator3Style: React.CSSProperties = {
        height: `${config.separator3Height}px`,
        background: `linear-gradient(to bottom, ${config.separator3ColorStart}, ${config.separator3ColorEnd})`,
    };

    return (
        <div ref={ref} className="w-full relative py-6" id="section-3-to-capture" style={{ backgroundColor: config.section3BgColor }}>

            <h2 className="text-lg font-bold text-center px-4 text-gray-900 mb-4">
                {config.section3Title}
            </h2>

            <div className="space-y-4 px-4">
                {config.section3Testimonials.map((testimonial, index) => (
                    <div key={`s3-test-${index}`} className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center space-x-2">
                                <img
                                    src={testimonial.avatarUrl}
                                    alt={testimonial.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = `https://placehold.co/40x40/CCCCCC/666666?text=${testimonial.name.charAt(0)}`;
                                    }}
                                />
                                <p className="font-semibold text-sm text-gray-800">{testimonial.name}</p>
                            </div>
                            <RatingStars rating={testimonial.rating} />
                        </div>
                        <p className="text-xs italic text-gray-600 leading-snug">"{testimonial.text}"</p>
                    </div>
                ))}
            </div>

            {/* 4. Gradiente Separador S3 a S4 */}
            <div style={separator3Style} className="w-full z-10 mt-6"></div>
        </div>
    );
});

TestimonialsPreview.displayName = 'TestimonialsPreview';
