import React, { useState } from 'react';
import { LandingConfig, FeatureItem } from '../../types';
import { IconSelector } from '../ui/IconSelector';
import { FONT_OPTIONS } from '../../constants';

interface HeroControlsProps {
    config: LandingConfig;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, fieldName?: keyof LandingConfig) => void;
    onFeatureChange: (index: number, field: keyof FeatureItem, value: any) => void;
    onDownload: () => void;
}

export const HeroControls: React.FC<HeroControlsProps> = ({
    config,
    onChange,
    onImageUpload,
    onFeatureChange,
    onDownload
}) => {
    const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
    const [openIconSelector, setOpenIconSelector] = useState<number | null>(null);

    const toggleFeature = (index: number) => {
        setExpandedFeature(expandedFeature === index ? null : index);
    };

    const handleFeatureChangeLocal = (index: number, field: keyof FeatureItem, value: any) => {
        onFeatureChange(index, field, value);
    };

    const positions = [
        { label: '↖️ Top-Left', value: 'top-left' },
        { label: '⬆️ Top-Center', value: 'top-center' },
        { label: '↗️ Top-Right', value: 'top-right' },
        { label: '⬅️ Center-Left', value: 'center-left' },
        { label: '⏺️ Center', value: 'center-center' },
        { label: '➡️ Center-Right', value: 'center-right' },
        { label: '↙️ Bottom-Left', value: 'bottom-left' },
        { label: '⬇️ Bottom-Center', value: 'bottom-center' },
        { label: '↘️ Bottom-Right', value: 'bottom-right' },
    ];

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                {/* Selector de Tipo de Hero */}
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <span className="text-sm font-medium text-gray-700 block mb-2">Estilo de Sección:</span>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => onChange({ target: { name: 'heroType', value: 'classic' } } as any)}
                            className={`flex-1 py-2 px-3 text-sm rounded border ${config.heroType === 'classic' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                        >
                            Clásico
                        </button>
                        <button
                            onClick={() => onChange({ target: { name: 'heroType', value: 'split' } } as any)}
                            className={`flex-1 py-2 px-3 text-sm rounded border ${config.heroType === 'split' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                        >
                            Diagonal / Dividido
                        </button>
                    </div>
                </div>

                {/* 1. Nombre del Producto (Común) */}
                <div className="border-b pb-4">
                    <label className="block mb-2">
                        <span className="text-sm font-medium text-gray-700">1. Nombre del Producto:</span>
                        <input type="text" name="productName" value={config.productName} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </label>
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs text-gray-500">Tamaño:</span>
                        <input type="range" name="productNameSize" min="20" max="80" value={config.productNameSize} onChange={onChange} className="w-full" />
                        <span className="text-xs text-gray-700 w-8">{config.productNameSize}px</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-500">Color:</span>
                            <input type="color" name="productNameColor" value={config.productNameColor} onChange={onChange} className="h-6 w-8 border-none p-0 rounded" />
                        </div>
                        <div className="flex items-center space-x-1 flex-1">
                            <span className="text-xs text-gray-500">Fuente:</span>
                            <select name="productNameFont" value={config.productNameFont} onChange={onChange} className="block w-full border border-gray-300 rounded-md shadow-sm p-1 text-xs">
                                {FONT_OPTIONS.map((font) => (
                                    <option key={font.value} value={font.value}>{font.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {config.heroType === 'classic' && (
                    <>
                        <div className="border-b pb-4">
                            <label className="block mb-2">
                                <span className="text-sm font-medium text-gray-700">2. Frase Ganadora:</span>
                                <input type="text" name="winningPhrase" value={config.winningPhrase} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </label>
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="text-xs text-gray-500">Tamaño:</span>
                                <input type="range" name="winningPhraseSize" min="10" max="48" value={config.winningPhraseSize} onChange={onChange} className="w-full" />
                                <span className="text-xs text-gray-700 w-8">{config.winningPhraseSize}px</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-1">
                                    <span className="text-xs text-gray-500">Color:</span>
                                    <input type="color" name="winningPhraseColor" value={config.winningPhraseColor} onChange={onChange} className="h-6 w-8 border-none p-0 rounded" />
                                </div>
                                <div className="flex items-center space-x-1 flex-1">
                                    <span className="text-xs text-gray-500">Fuente:</span>
                                    <select name="winningPhraseFont" value={config.winningPhraseFont} onChange={onChange} className="block w-full border border-gray-300 rounded-md shadow-sm p-1 text-xs">
                                        {FONT_OPTIONS.map((font) => (
                                            <option key={font.value} value={font.value}>{font.label}</option>
                                        ))}
                                    </select>
                                </div>
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

                        {/* Círculo Decorativo */}
                        <div className="border-t pt-4 mt-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Círculo Decorativo:</span>
                                <input
                                    type="checkbox"
                                    checked={config.heroCircleVisible}
                                    onChange={(e) => onChange({ target: { name: 'heroCircleVisible', value: e.target.checked } } as any)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                            </div>
                            {config.heroCircleVisible && (
                                <div className="space-y-2 bg-white p-2 rounded border">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs text-gray-500 w-12">Tamaño:</span>
                                        <input type="range" name="heroCircleSize" min="20" max="300" value={config.heroCircleSize} onChange={onChange} className="flex-1" />
                                        <span className="text-xs text-gray-700 w-8">{config.heroCircleSize}px</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs text-gray-500 w-12">Color:</span>
                                        <input type="color" name="heroCircleColor" value={config.heroCircleColor} onChange={onChange} className="h-6 w-8 border-none p-0 rounded" />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs text-gray-500 w-12">Opacidad:</span>
                                        <input type="range" name="heroCircleOpacity" min="0" max="1" step="0.1" value={config.heroCircleOpacity} onChange={onChange} className="flex-1" />
                                        <span className="text-xs text-gray-700 w-8">{config.heroCircleOpacity}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Barra de Urgencia */}
                        <div className="border-t pt-4 mt-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Barra de Urgencia:</span>
                                <input
                                    type="checkbox"
                                    checked={config.topBarVisible}
                                    onChange={(e) => onChange({ target: { name: 'topBarVisible', value: e.target.checked } } as any)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                            </div>
                            {config.topBarVisible && (
                                <div className="space-y-2 bg-white p-2 rounded border">
                                    <div>
                                        <span className="text-xs text-gray-500 block mb-1">Texto:</span>
                                        <input
                                            type="text"
                                            name="topBarText"
                                            value={config.topBarText}
                                            onChange={onChange}
                                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <span className="text-xs text-gray-500 block mb-1">Fondo:</span>
                                            <input type="color" name="topBarBgColor" value={config.topBarBgColor} onChange={onChange} className="w-full h-8 border-none p-0 rounded" />
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-500 block mb-1">Texto Color:</span>
                                            <input type="color" name="topBarTextColor" value={config.topBarTextColor} onChange={onChange} className="w-full h-8 border-none p-0 rounded" />
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs text-gray-500 w-12">Altura:</span>
                                        <input type="range" name="topBarHeight" min="20" max="100" value={config.topBarHeight} onChange={onChange} className="flex-1" />
                                        <span className="text-xs text-gray-700 w-8">{config.topBarHeight}px</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Subsección: Texto Rico */}
                        <div className="border-t pt-4 mt-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Texto Informativo (Rich Text):</h4>
                            <div className="space-y-2">
                                <textarea
                                    name="heroRichText"
                                    value={config.heroRichText}
                                    onChange={onChange}
                                    rows={3}
                                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                />
                                <p className="text-xs text-gray-500">Usa &lt;b&gt;texto&lt;/b&gt; para negrita.</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <span className="text-xs text-gray-500 block mb-1">Color Texto:</span>
                                        <input type="color" name="heroRichTextColor" value={config.heroRichTextColor} onChange={onChange} className="w-full h-8 border-none p-0 rounded" />
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500 block mb-1">Color Fondo:</span>
                                        <input type="color" name="heroRichTextBgColor" value={config.heroRichTextBgColor} onChange={onChange} className="w-full h-8 border-none p-0 rounded" />
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-500 w-12">Tamaño:</span>
                                    <input type="range" name="heroRichTextFontSize" min="10" max="30" value={config.heroRichTextFontSize} onChange={onChange} className="flex-1" />
                                    <span className="text-xs text-gray-700 w-8">{config.heroRichTextFontSize}px</span>
                                </div>
                            </div>
                        </div>

                        {/* Subsección: Precio y Oferta */}
                        <div className="border-t pt-4 mt-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Sección de Precio y Oferta:</span>
                                <input
                                    type="checkbox"
                                    checked={config.heroPriceVisible}
                                    onChange={(e) => onChange({ target: { name: 'heroPriceVisible', value: e.target.checked } } as any)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                            </div>
                            {config.heroPriceVisible && (
                                <div className="space-y-3 bg-white p-2 rounded border">
                                    <div>
                                        <span className="text-xs text-gray-500 block mb-1">Disposición:</span>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => onChange({ target: { name: 'heroPriceLayout', value: 'price-left' } } as any)}
                                                className={`flex-1 py-1 px-2 text-xs rounded border ${config.heroPriceLayout === 'price-left' ? 'bg-indigo-100 border-indigo-500 text-indigo-700' : 'bg-gray-50 text-gray-600'}`}
                                            >
                                                Precio Izq / Foto Der
                                            </button>
                                            <button
                                                onClick={() => onChange({ target: { name: 'heroPriceLayout', value: 'price-right' } } as any)}
                                                className={`flex-1 py-1 px-2 text-xs rounded border ${config.heroPriceLayout === 'price-right' ? 'bg-indigo-100 border-indigo-500 text-indigo-700' : 'bg-gray-50 text-gray-600'}`}
                                            >
                                                Foto Izq / Precio Der
                                            </button>
                                        </div>
                                    </div>

                                    {/* Precios */}
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <span className="text-xs text-gray-500 block mb-1">Precio Actual:</span>
                                            <input type="text" name="heroPriceValue" value={config.heroPriceValue} onChange={onChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-1" />
                                            <input type="color" name="heroPriceColor" value={config.heroPriceColor} onChange={onChange} className="w-full h-6 border-none p-0 rounded" />
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-500 block mb-1">Precio Anterior:</span>
                                            <input type="text" name="heroOldPriceValue" value={config.heroOldPriceValue} onChange={onChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-1" />
                                            <input type="color" name="heroOldPriceColor" value={config.heroOldPriceColor} onChange={onChange} className="w-full h-6 border-none p-0 rounded" />
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div>
                                        <span className="text-xs text-gray-500 block mb-1">Botón CTA:</span>
                                        <input type="text" name="heroCtaText" value={config.heroCtaText} onChange={onChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-1" />
                                        <div className="grid grid-cols-2 gap-2">
                                            <input type="color" name="heroCtaBgColor" value={config.heroCtaBgColor} onChange={onChange} className="w-full h-6 border-none p-0 rounded" title="Fondo Botón" />
                                            <input type="color" name="heroCtaTextColor" value={config.heroCtaTextColor} onChange={onChange} className="w-full h-6 border-none p-0 rounded" title="Texto Botón" />
                                        </div>
                                    </div>

                                    {/* Imagen Producto */}
                                    <div>
                                        <span className="text-xs text-gray-500 block mb-1">Imagen Producto (URL):</span>
                                        <input type="text" name="heroPriceImageUrl" value={config.heroPriceImageUrl} onChange={onChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Imagen de Fondo */}
                        <h4 className="text-base font-semibold mb-2 mt-4 text-gray-800 border-t pt-4">3. Imagen y Gradientes</h4>
                        <label className="block mb-4">
                            <span className="text-xs font-medium text-gray-700">URL o Subir Imagen:</span>
                            <input type="text" name="imageUrl" value={config.imageUrl} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm" />
                        </label>
                        <label className="block mb-6">
                            <input type="file" accept="image/*" onChange={(e) => onImageUpload(e, 'imageUrl')} className="mt-1 block w-full text-xs text-gray-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200" />
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
                    </>
                )}

                {config.heroType === 'split' && (
                    <div className="space-y-4 border-t pt-4">
                        <h4 className="font-medium text-gray-900">Configuración Diagonal</h4>

                        {/* Colores de Fondo */}
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <span className="text-xs text-gray-500 block mb-1">Color Superior/Izq:</span>
                                <input type="color" name="heroSplitLineColor1" value={config.heroSplitLineColor1} onChange={onChange} className="w-full h-8 border-none p-0 rounded" />
                            </div>
                            <div>
                                <span className="text-xs text-gray-500 block mb-1">Color Inferior/Der:</span>
                                <input type="color" name="heroSplitLineColor2" value={config.heroSplitLineColor2} onChange={onChange} className="w-full h-8 border-none p-0 rounded" />
                            </div>
                        </div>

                        {/* Estilo de División */}
                        <div>
                            <span className="text-xs text-gray-500 block mb-1">Estilo de División:</span>
                            <select name="heroSplitDividerStyle" value={config.heroSplitDividerStyle} onChange={onChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm">
                                <option value="straight">Recto</option>
                                <option value="wave-soft">Ondas Suaves</option>
                                <option value="wave-heavy">Ondas Marcadas</option>
                            </select>
                        </div>

                        {/* Frase Superior */}
                        <div>
                            <span className="text-xs text-gray-500 block mb-1">Frase Superior:</span>
                            <input type="text" name="heroSplitTopPhrase" value={config.heroSplitTopPhrase} onChange={onChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-1" />
                            <div className="grid grid-cols-2 gap-2">
                                <input type="color" name="heroSplitTopPhraseColor" value={config.heroSplitTopPhraseColor} onChange={onChange} className="w-full h-6 border-none p-0 rounded" />
                                <select name="heroSplitTopPhraseFont" value={config.heroSplitTopPhraseFont} onChange={onChange} className="w-full border border-gray-300 rounded px-1 py-0 text-xs h-6">
                                    {FONT_OPTIONS.map((font) => (
                                        <option key={font.value} value={font.value}>{font.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Precio y CTA (Reutilizados pero en contexto Split) */}
                        <div className="border-t pt-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Precio y Botón:</h4>
                            <div className="grid grid-cols-2 gap-2 mb-2">
                                <div>
                                    <span className="text-xs text-gray-500 block mb-1">Precio:</span>
                                    <input type="text" name="heroPriceValue" value={config.heroPriceValue} onChange={onChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm" />
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 block mb-1">Color Precio:</span>
                                    <input type="color" name="heroPriceColor" value={config.heroPriceColor} onChange={onChange} className="w-full h-8 border-none p-0 rounded" />
                                </div>
                            </div>
                            <div className="mb-2">
                                <span className="text-xs text-gray-500 block mb-1">Texto Botón:</span>
                                <input type="text" name="heroCtaText" value={config.heroCtaText} onChange={onChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm" />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <span className="text-xs text-gray-500 block mb-1">Fondo Botón:</span>
                                    <input type="color" name="heroCtaBgColor" value={config.heroCtaBgColor} onChange={onChange} className="w-full h-8 border-none p-0 rounded" />
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 block mb-1">Texto Botón:</span>
                                    <input type="color" name="heroCtaTextColor" value={config.heroCtaTextColor} onChange={onChange} className="w-full h-8 border-none p-0 rounded" />
                                </div>
                            </div>
                        </div>

                        {/* Imagen Producto */}
                        <div className="border-t pt-4">
                            <span className="text-xs text-gray-500 block mb-1">Imagen Producto (URL o Subir):</span>
                            <input type="text" name="heroPriceImageUrl" value={config.heroPriceImageUrl} onChange={onChange} className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-2" />
                            <input type="file" accept="image/*" onChange={(e) => onImageUpload(e, 'heroPriceImageUrl')} className="block w-full text-xs text-gray-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200" />
                        </div>

                        {/* Beneficios Horizontales */}
                        <div className="border-t pt-4">
                            <span className="text-sm font-medium text-gray-700 block mb-2">Beneficios Horizontales:</span>
                            {config.heroAltBenefits.map((benefit, index) => (
                                <div key={index} className="flex items-center space-x-2 mb-2 bg-gray-50 p-2 rounded">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={benefit.text}
                                            onChange={(e) => {
                                                const newBenefits = [...config.heroAltBenefits];
                                                newBenefits[index].text = e.target.value;
                                                onChange({ target: { name: 'heroAltBenefits', value: newBenefits } } as any);
                                            }}
                                            className="w-full border border-gray-300 rounded px-2 py-1 text-xs mb-1"
                                            placeholder="Texto Beneficio"
                                        />
                                        <div className="flex items-center space-x-2">
                                            <select
                                                value={benefit.icon}
                                                onChange={(e) => {
                                                    const newBenefits = [...config.heroAltBenefits];
                                                    newBenefits[index].icon = e.target.value;
                                                    onChange({ target: { name: 'heroAltBenefits', value: newBenefits } } as any);
                                                }}
                                                className="flex-1 border border-gray-300 rounded px-1 py-0 text-xs h-6"
                                            >
                                                <option value="Rocket">Cohete</option>
                                                <option value="Shield">Escudo</option>
                                                <option value="Star">Estrella</option>
                                                <option value="Check">Check</option>
                                                <option value="Zap">Rayo</option>
                                                <option value="Heart">Corazón</option>
                                            </select>
                                            <input
                                                type="color"
                                                value={benefit.color}
                                                onChange={(e) => {
                                                    const newBenefits = [...config.heroAltBenefits];
                                                    newBenefits[index].color = e.target.value;
                                                    onChange({ target: { name: 'heroAltBenefits', value: newBenefits } } as any);
                                                }}
                                                className="h-6 w-8 border-none p-0 rounded"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Configuración de Fondo de Beneficios */}
                        <div className="border-t pt-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Fondo de Beneficios:</h4>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <span className="text-xs text-gray-500 block mb-1">Color Fondo:</span>
                                    <input type="color" name="heroAltBenefitsBgColor" value={config.heroAltBenefitsBgColor} onChange={onChange} className="w-full h-8 border-none p-0 rounded" />
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 block mb-1">Opacidad:</span>
                                    <input
                                        type="range"
                                        name="heroAltBenefitsBgOpacity"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={config.heroAltBenefitsBgOpacity}
                                        onChange={onChange}
                                        className="w-full"
                                    />
                                    <div className="text-right text-xs text-gray-500">{config.heroAltBenefitsBgOpacity}</div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={onDownload}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl mt-6 transition duration-150 shadow-md text-sm"
                        >
                            ⬇️ Descargar Imagen S1
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
