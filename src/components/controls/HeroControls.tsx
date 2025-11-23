import React, { useState } from 'react';
import { LandingConfig, FeatureItem } from '../../types';
import { IconSelector } from '../ui/IconSelector';

interface HeroControlsProps {
    config: LandingConfig;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDownload: () => void;
    onFeatureChange?: (index: number, field: keyof FeatureItem, value: string | number) => void;
}

export const HeroControls: React.FC<HeroControlsProps> = ({ config, onChange, onImageUpload, onDownload, onFeatureChange }) => {
    const [openIconSelector, setOpenIconSelector] = useState<number | null>(null);
    const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

    const positions = [
        { label: '↖️', value: 'top-left' },
        { label: '⬆️', value: 'top-center' },
        { label: '↗️', value: 'top-right' },
        { label: '⬅️', value: 'center-left' },
        { label: '⏺️', value: 'center-center' },
        { label: '➡️', value: 'center-right' },
        { label: '↙️', value: 'bottom-left' },
        { label: '⬇️', value: 'bottom-center' },
        { label: '↘️', value: 'bottom-right' },
    ];

    const toggleFeature = (index: number) => {
        setExpandedFeature(expandedFeature === index ? null : index);
    };

    const handleFeatureChangeLocal = (index: number, field: keyof FeatureItem, value: any) => {
        if (onFeatureChange) {
            onFeatureChange(index, field, value);
        }
    };

    return (
        <div className="p-4 border border-gray-200 rounded-lg mb-6 bg-indigo-50">
            <h3 className="text-lg font-bold mb-3 text-indigo-800">Sección 1: Hero Principal</h3>

            {/* Título y Frase */}
            <div className="space-y-4 mb-6">
                <div className="border-b pb-4">
                    <label className="block mb-2">
                        <span className="text-sm font-medium text-gray-700">1. Título:</span>
                        <input type="text" name="productName" value={config.productName} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </label>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Tamaño:</span>
                        <input type="range" name="productNameSize" min="12" max="64" value={config.productNameSize} onChange={onChange} className="w-full" />
                        <span className="text-xs text-gray-700 w-8">{config.productNameSize}px</span>
                    </div>
                </div>

                <div className="border-b pb-4">
                    <label className="block mb-2">
                        <span className="text-sm font-medium text-gray-700">2. Frase Ganadora:</span>
                        <input type="text" name="winningPhrase" value={config.winningPhrase} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </label>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Tamaño:</span>
                        <input type="range" name="winningPhraseSize" min="10" max="48" value={config.winningPhraseSize} onChange={onChange} className="w-full" />
                        <span className="text-xs text-gray-700 w-8">{config.winningPhraseSize}px</span>
                    </div>
                </div>

                <div>
                    <span className="text-sm font-medium text-gray-700 block mb-2">Posición del Texto:</span>
                    <div className="grid grid-cols-3 gap-1 w-32">
                        {positions.map((pos) => (
                            <button
                                key={pos.value}
                                onClick={() => onChange({ target: { name: 'textPosition', value: pos.value } } as any)}
                                className={`p-2 border rounded ${config.textPosition === pos.value ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                                title={pos.value}
                            >
                                {pos.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Imagen de Fondo */}
            <h4 className="text-base font-semibold mb-2 mt-4 text-gray-800 border-t pt-4">3. Imagen y Gradientes</h4>
            <label className="block mb-4">
                <span className="text-xs font-medium text-gray-700">URL o Subir Imagen:</span>
                <input type="text" name="imageUrl" value={config.imageUrl} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm" />
            </label>
            <label className="block mb-6">
                <input type="file" accept="image/*" onChange={onImageUpload} className="mt-1 block w-full text-xs text-gray-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200" />
            </label>

            <div className="grid grid-cols-2 gap-3 mb-4 items-end">
                <label className="col-span-1">
                    <span className="text-xs font-medium text-gray-700">Top - Color Base:</span>
                    <input type="color" name="topGradientBaseColor" value={config.topGradientBaseColor} onChange={onChange} className="mt-1 w-full h-8 border-none p-0 rounded-md" />
                </label>
                <label className="col-span-1">
                    <span className="text-xs font-medium text-gray-700">Altura Top (px)</span>
                    <input type="number" name="topGradientHeight" value={config.topGradientHeight} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-1 text-sm" min="0" max="100" />
                </label>
            </div>

            {/* Características / Beneficios Inmediatos */}
            <h4 className="text-base font-semibold mb-2 mt-4 text-gray-800 border-t pt-4">4. Beneficios Inmediatos (Individuales)</h4>

            <div className="mb-4">
                <span className="text-sm font-medium text-gray-700 block mb-2">Posición Global:</span>
                <div className="grid grid-cols-3 gap-1 w-32">
                    {positions.map((pos) => (
                        <button
                            key={`feat-${pos.value}`}
                            onClick={() => onChange({ target: { name: 'featuresPosition', value: pos.value } } as any)}
                            className={`p-2 border rounded ${config.featuresPosition === pos.value ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                            title={pos.value}
                        >
                            {pos.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                {config.features.map((feature, index) => (
                    <div key={index} className="bg-white border rounded text-sm overflow-hidden">
                        {/* Header del Accordion */}
                        <div
                            className="p-3 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                            onClick={() => toggleFeature(index)}
                        >
                            <span className="font-medium text-gray-700 truncate w-3/4">{feature.text || `Beneficio ${index + 1}`}</span>
                            <span className="text-gray-500">{expandedFeature === index ? '▲' : '▼'}</span>
                        </div>

                        {/* Contenido del Accordion */}
                        {expandedFeature === index && (
                            <div className="p-3 space-y-4 border-t">
                                {/* Contenido */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Texto:</label>
                                    <input
                                        type="text"
                                        value={feature.text}
                                        onChange={(e) => handleFeatureChangeLocal(index, 'text', e.target.value)}
                                        className="border rounded p-1 w-full text-xs"
                                    />
                                    <div className="flex items-center space-x-2 mt-2">
                                        <input type="color" value={feature.textColor} onChange={(e) => handleFeatureChangeLocal(index, 'textColor', e.target.value)} className="h-6 w-8 border-none p-0 rounded" />
                                        <input type="range" min="10" max="32" value={feature.textSize} onChange={(e) => handleFeatureChangeLocal(index, 'textSize', parseInt(e.target.value))} className="flex-1" />
                                        <span className="text-xs w-6">{feature.textSize}px</span>
                                    </div>
                                </div>

                                {/* Icono */}
                                <div className="border-t pt-2">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Icono:</label>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <select
                                            value={feature.iconType}
                                            onChange={(e) => handleFeatureChangeLocal(index, 'iconType', e.target.value)}
                                            className="border rounded p-1 text-xs"
                                        >
                                            <option value="emoji">Emoji</option>
                                            <option value="icon">Icono</option>
                                            <option value="image">Imagen</option>
                                        </select>

                                        {feature.iconType === 'icon' ? (
                                            <button
                                                onClick={() => setOpenIconSelector(openIconSelector === index ? null : index)}
                                                className="border rounded p-1 flex-1 text-xs text-left bg-gray-50 hover:bg-gray-100 truncate"
                                            >
                                                {feature.iconValue || 'Seleccionar'}
                                            </button>
                                        ) : (
                                            <input
                                                type="text"
                                                value={feature.iconValue}
                                                onChange={(e) => handleFeatureChangeLocal(index, 'iconValue', e.target.value)}
                                                placeholder={feature.iconType === 'emoji' ? 'Emoji' : 'URL'}
                                                className="border rounded p-1 flex-1 text-xs"
                                            />
                                        )}
                                    </div>

                                    {openIconSelector === index && (
                                        <div className="mb-2">
                                            <IconSelector
                                                selectedIcon={feature.iconValue}
                                                onSelect={(iconName) => {
                                                    handleFeatureChangeLocal(index, 'iconValue', iconName);
                                                    setOpenIconSelector(null);
                                                }}
                                            />
                                        </div>
                                    )}

                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs">Color:</span>
                                        <input type="color" value={feature.iconColor} onChange={(e) => handleFeatureChangeLocal(index, 'iconColor', e.target.value)} className="h-6 w-8 border-none p-0 rounded" />
                                        <span className="text-xs">Tam:</span>
                                        <input type="range" min="12" max="48" value={feature.iconSize} onChange={(e) => handleFeatureChangeLocal(index, 'iconSize', parseInt(e.target.value))} className="flex-1" />
                                    </div>
                                </div>

                                {/* Fondo */}
                                <div className="border-t pt-2">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Fondo:</label>
                                    <select
                                        value={feature.bgType}
                                        onChange={(e) => handleFeatureChangeLocal(index, 'bgType', e.target.value)}
                                        className="block w-full border border-gray-300 rounded-md shadow-sm p-1 text-xs mb-2"
                                    >
                                        <option value="solid">Sólido</option>
                                        <option value="gradient">Degradado</option>
                                    </select>

                                    {feature.bgType === 'solid' ? (
                                        <div className="flex items-center space-x-2">
                                            <input type="color" value={feature.bgColor} onChange={(e) => handleFeatureChangeLocal(index, 'bgColor', e.target.value)} className="h-6 w-8 border-none p-0 rounded" />
                                            <span className="text-xs">Opacidad:</span>
                                            <input type="range" min="0" max="1" step="0.1" value={feature.bgOpacity} onChange={(e) => handleFeatureChangeLocal(index, 'bgOpacity', parseFloat(e.target.value))} className="flex-1" />
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs w-8">Inicio:</span>
                                                <input type="color" value={feature.gradientStart} onChange={(e) => handleFeatureChangeLocal(index, 'gradientStart', e.target.value)} className="h-6 w-full border-none p-0 rounded" />
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs w-8">Fin:</span>
                                                <input type="color" value={feature.gradientEnd} onChange={(e) => handleFeatureChangeLocal(index, 'gradientEnd', e.target.value)} className="h-6 w-full border-none p-0 rounded" />
                                            </div>
                                            <select value={feature.gradientDirection} onChange={(e) => handleFeatureChangeLocal(index, 'gradientDirection', e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm p-1 text-xs">
                                                <option value="to right">➡️ Der</option>
                                                <option value="to bottom">⬇️ Abajo</option>
                                                <option value="to bottom right">↘️ Diag</option>
                                            </select>
                                        </div>
                                    )}
                                </div>

                                {/* Forma */}
                                <div className="border-t pt-2 grid grid-cols-2 gap-2">
                                    <label>
                                        <span className="text-xs block text-gray-500">Radio ({feature.borderRadius}px):</span>
                                        <input type="range" min="0" max="30" value={feature.borderRadius} onChange={(e) => handleFeatureChangeLocal(index, 'borderRadius', parseInt(e.target.value))} className="w-full" />
                                    </label>
                                    <label>
                                        <span className="text-xs block text-gray-500">Skew ({feature.skewX}°):</span>
                                        <input type="range" min="-45" max="45" value={feature.skewX} onChange={(e) => handleFeatureChangeLocal(index, 'skewX', parseInt(e.target.value))} className="w-full" />
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button
                onClick={onDownload}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-xl mt-4 transition duration-150 shadow-md text-sm"
            >
                ⬇️ Descargar Imagen S1
            </button>
        </div>
    );
};
