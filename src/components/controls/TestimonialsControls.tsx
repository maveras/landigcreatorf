import React from 'react';
import { LandingConfig, TestimonialItem } from '../../types';
import { FONT_OPTIONS } from '../../constants';

interface TestimonialsControlsProps {
    config: LandingConfig;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onTestimonialChange: (index: number, field: keyof TestimonialItem, value: string | number) => void;
    onDownload: () => void;
}

export const TestimonialsControls: React.FC<TestimonialsControlsProps> = ({ config, onChange, onTestimonialChange, onDownload }) => {
    return (
        <div className="p-4 border border-gray-200 rounded-lg bg-yellow-50 mt-6">
            <h3 className="text-lg font-bold mb-3 text-yellow-800">Sección 3: Testimonios</h3>

            {/* Selector de Layout */}
            <div className="bg-white p-2 rounded border border-yellow-200 mb-4">
                <span className="text-xs font-medium text-gray-700 block mb-2">Disposición:</span>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onChange({ target: { name: 'section3Layout', value: 'list' } } as any)}
                        className={`flex-1 py-1 px-2 text-xs rounded border ${config.section3Layout === 'list' ? 'bg-yellow-100 border-yellow-500 text-yellow-700' : 'bg-gray-50 text-gray-600'}`}
                    >
                        Lista (Vertical)
                    </button>
                    <button
                        onClick={() => onChange({ target: { name: 'section3Layout', value: 'grid' } } as any)}
                        className={`flex-1 py-1 px-2 text-xs rounded border ${config.section3Layout === 'grid' ? 'bg-yellow-100 border-yellow-500 text-yellow-700' : 'bg-gray-50 text-gray-600'}`}
                    >
                        Grilla (Tarjetas)
                    </button>
                </div>
            </div>

            <div className="border-b pb-4 mb-4">
                <label className="block mb-2">
                    <span className="text-sm font-medium text-gray-700">Título de la Sección:</span>
                    <input type="text" name="section3Title" value={config.section3Title} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </label>
                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-500">Color:</span>
                        <input type="color" name="section3TitleColor" value={config.section3TitleColor} onChange={onChange} className="h-6 w-8 border-none p-0 rounded" />
                    </div>
                    <div className="flex items-center space-x-1 flex-1">
                        <span className="text-xs text-gray-500">Fuente:</span>
                        <select name="section3TitleFont" value={config.section3TitleFont} onChange={onChange} className="block w-full border border-gray-300 rounded-md shadow-sm p-1 text-xs">
                            {FONT_OPTIONS.map((font) => (
                                <option key={font.value} value={font.value}>{font.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <label className="block mb-4">
                <span className="text-sm font-medium text-gray-700">Color de Fondo S3:</span>
                <input type="color" name="section3BgColor" value={config.section3BgColor} onChange={onChange} className="mt-1 w-full h-8 border-none p-0 rounded-md" />
            </label>

            <h4 className="text-base font-semibold mt-4 mb-2 text-gray-800">Testimonios (3)</h4>

            {config.section3Testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-3 rounded-lg border border-gray-300 mb-3 shadow-sm">
                    <p className="text-xs font-semibold mb-1 text-gray-600">Testimonio {index + 1}</p>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                        <label className="col-span-1">
                            <span className="text-xs font-medium text-gray-700">Nombre:</span>
                            <input type="text" value={testimonial.name} onChange={(e) => onTestimonialChange(index, 'name', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 text-sm" />
                        </label>
                        <label className="col-span-1">
                            <span className="text-xs font-medium text-gray-700">Calificación (1-5):</span>
                            <input type="number" value={testimonial.rating} onChange={(e) => onTestimonialChange(index, 'rating', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 text-sm text-center" min="1" max="5" step="1" />
                        </label>
                    </div>
                    <label className="block mb-2">
                        <span className="text-xs font-medium text-gray-700">Texto:</span>
                        <textarea value={testimonial.text} onChange={(e) => onTestimonialChange(index, 'text', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 text-sm h-16 resize-none" />
                    </label>
                    <label className="block">
                        <span className="text-xs font-medium text-gray-700">Avatar URL:</span>
                        <input type="text" value={testimonial.avatarUrl} onChange={(e) => onTestimonialChange(index, 'avatarUrl', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 text-sm" />
                    </label>
                </div>
            ))}

            {/* Separador S3 a S4 */}
            <h4 className="text-base font-semibold mt-6 mb-2 text-gray-800 border-t pt-4">5. Separador S3 a S4</h4>
            <div className="grid grid-cols-3 gap-3 mb-4 items-end">
                <label className="col-span-1">
                    <span className="text-xs font-medium text-gray-700">Inicio:</span>
                    <input type="color" name="separator3ColorStart" value={config.separator3ColorStart} onChange={onChange} className="mt-1 w-full h-8 border-none p-0 rounded-md" />
                </label>
                <label className="col-span-1">
                    <span className="text-xs font-medium text-gray-700">Fin:</span>
                    <input type="color" name="separator3ColorEnd" value={config.separator3ColorEnd} onChange={onChange} className="mt-1 w-full h-8 border-none p-0 rounded-md" />
                </label>
                <label className="col-span-1">
                    <span className="text-xs font-medium text-gray-700">Altura (px)</span>
                    <input type="number" name="separator3Height" value={config.separator3Height} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 text-sm" min="0" max="100" />
                </label>
            </div>

            <button
                onClick={onDownload}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-xl mt-4 transition duration-150 shadow-md text-sm"
            >
                ⬇️ Descargar Imagen S3
            </button>
        </div>
    );
};
