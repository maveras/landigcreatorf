import React from 'react';
import { LandingConfig, BenefitItem } from '../../types';

interface BenefitsControlsProps {
    config: LandingConfig;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onBenefitChange: (index: number, field: keyof BenefitItem, value: string) => void;
    onDownload: () => void;
}

export const BenefitsControls: React.FC<BenefitsControlsProps> = ({ config, onChange, onBenefitChange, onDownload }) => {
    return (
        <div className="p-4 border border-gray-200 rounded-lg mb-6 bg-green-50">
            <h3 className="text-lg font-bold mb-3 text-green-800">Sección 2: Beneficios Detallados</h3>

            <label className="block mb-4">
                <span className="text-sm font-medium text-gray-700">Título de la Sección:</span>
                <input type="text" name="section2Title" value={config.section2Title} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </label>
            <label className="block mb-4">
                <span className="text-sm font-medium text-gray-700">Color de Fondo S2:</span>
                <input type="color" name="section2BgColor" value={config.section2BgColor} onChange={onChange} className="mt-1 w-full h-8 border-none p-0 rounded-md" />
            </label>

            <h4 className="text-base font-semibold mt-4 mb-2 text-gray-800">Items de Beneficios (3)</h4>

            {config.section2Benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-3 rounded-lg border border-gray-300 mb-3 shadow-sm">
                    <p className="text-xs font-semibold mb-1 text-gray-600">Item {index + 1}</p>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                        <label className="col-span-1">
                            <span className="text-xs font-medium text-gray-700">Ícono (Emoji):</span>
                            <input type="text" value={benefit.icon} onChange={(e) => onBenefitChange(index, 'icon', e.target.value)} maxLength={2} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 text-sm text-center" />
                        </label>
                        <label className="col-span-2">
                            <span className="text-xs font-medium text-gray-700">Color Ícono:</span>
                            <input type="color" value={benefit.color} onChange={(e) => onBenefitChange(index, 'color', e.target.value)} className="mt-1 w-full h-8 border-none p-0 rounded-md" />
                        </label>
                    </div>
                    <label className="block mb-2">
                        <span className="text-xs font-medium text-gray-700">Título:</span>
                        <input type="text" value={benefit.title} onChange={(e) => onBenefitChange(index, 'title', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 text-sm" />
                    </label>
                    <label className="block">
                        <span className="text-xs font-medium text-gray-700">Descripción:</span>
                        <input type="text" value={benefit.description} onChange={(e) => onBenefitChange(index, 'description', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 text-sm" />
                    </label>
                </div>
            ))}

            {/* Separador S2 a S3 */}
            <h4 className="text-base font-semibold mt-6 mb-2 text-gray-800 border-t pt-4">4. Separador S2 a S3</h4>
            <div className="grid grid-cols-3 gap-3 mb-4 items-end">
                <label className="col-span-1">
                    <span className="text-xs font-medium text-gray-700">Inicio:</span>
                    <input type="color" name="separator2ColorStart" value={config.separator2ColorStart} onChange={onChange} className="mt-1 w-full h-8 border-none p-0 rounded-md" />
                </label>
                <label className="col-span-1">
                    <span className="text-xs font-medium text-gray-700">Fin:</span>
                    <input type="color" name="separator2ColorEnd" value={config.separator2ColorEnd} onChange={onChange} className="mt-1 w-full h-8 border-none p-0 rounded-md" />
                </label>
                <label className="col-span-1">
                    <span className="text-xs font-medium text-gray-700">Altura (px)</span>
                    <input type="number" name="separator2Height" value={config.separator2Height} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 text-sm" min="0" max="100" />
                </label>
            </div>

            <button
                onClick={onDownload}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl mt-4 transition duration-150 shadow-md text-sm"
            >
                ⬇️ Descargar Imagen S2
            </button>
        </div>
    );
};
