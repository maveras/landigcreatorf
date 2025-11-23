import React, { useState, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';

interface IconSelectorProps {
    selectedIcon: string;
    onSelect: (iconName: string) => void;
}

export const IconSelector: React.FC<IconSelectorProps> = ({ selectedIcon, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Obtener todos los nombres de iconos disponibles en lucide-react
    const allIconNames = useMemo(() => Object.keys(LucideIcons).filter(key => key !== 'icons' && key !== 'createLucideIcon'), []);

    // Filtrar iconos basado en la búsqueda
    const filteredIcons = useMemo(() => {
        if (!searchTerm) return allIconNames.slice(0, 48); // Mostrar primeros 48 por defecto para rendimiento
        return allIconNames.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 48);
    }, [searchTerm, allIconNames]);

    return (
        <div className="p-2 border rounded-md bg-gray-50">
            <input
                type="text"
                placeholder="Buscar icono (ej: user, cart, star)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full mb-2 p-1 text-xs border rounded"
                autoFocus
            />
            <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto">
                {filteredIcons.map((iconName) => {
                    // @ts-ignore
                    const IconComponent = LucideIcons[iconName];
                    if (!IconComponent) return null;

                    return (
                        <button
                            key={iconName}
                            onClick={() => onSelect(iconName)}
                            className={`p-2 rounded flex items-center justify-center hover:bg-indigo-100 transition-colors ${selectedIcon === iconName ? 'bg-indigo-200 ring-2 ring-indigo-500' : 'bg-white border'}`}
                            title={iconName}
                        >
                            <IconComponent size={16} />
                        </button>
                    );
                })}
            </div>
            {filteredIcons.length === 0 && (
                <p className="text-xs text-center text-gray-500 py-2">No se encontraron iconos.</p>
            )}
        </div>
    );
};
