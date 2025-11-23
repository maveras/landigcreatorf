'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LandingConfig } from '../../types';
import { decodeState } from '../../utils/compression';
import { HeroPreview } from '../../components/preview/HeroPreview';
import { BenefitsPreview } from '../../components/preview/BenefitsPreview';
import { TestimonialsPreview } from '../../components/preview/TestimonialsPreview';

const PreviewContent = () => {
    const searchParams = useSearchParams();
    const [config, setConfig] = useState<LandingConfig | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const data = searchParams.get('data');
        if (data) {
            const decoded = decodeState(data);
            if (decoded) {
                setConfig(decoded);
            } else {
                setError('No se pudo cargar la configuración. El enlace podría estar roto.');
            }
        } else {
            setError('No se encontraron datos de configuración en la URL.');
        }
    }, [searchParams]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h1 className="text-xl font-bold text-red-600 mb-2">Error</h1>
                    <p className="text-gray-700">{error}</p>
                </div>
            </div>
        );
    }

    if (!config) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-indigo-600 font-medium">Cargando vista previa... 📱</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <HeroPreview config={config} />
            <BenefitsPreview config={config} />
            <TestimonialsPreview config={config} />
        </div>
    );
};

export default function PreviewPage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <PreviewContent />
        </Suspense>
    );
}
