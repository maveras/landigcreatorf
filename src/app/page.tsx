'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import html2canvas from 'html2canvas';

import { LandingConfig, BenefitItem, TestimonialItem } from '../types';
import { initialConfig, LOCAL_STORAGE_KEY } from '../constants';
import { debounce } from '../utils';

import { HeroControls } from '../components/controls/HeroControls';
import { BenefitsControls } from '../components/controls/BenefitsControls';
import { TestimonialsControls } from '../components/controls/TestimonialsControls';

import { HeroPreview } from '../components/preview/HeroPreview';
import { BenefitsPreview } from '../components/preview/BenefitsPreview';
import { TestimonialsPreview } from '../components/preview/TestimonialsPreview';

import QRCode from 'react-qr-code';
import { encodeState } from '../utils/compression';

// --- Componente Principal ---
const LandingPageSectionsGenerator = () => {
  const [state, setState] = useState<LandingConfig>(initialConfig);
  const [isReady, setIsReady] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const heroRef = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  // --------------------------------------------------------
  // 1. LOGICA DE PERSISTENCIA CON LOCALSTORAGE
  // --------------------------------------------------------

  // Efecto para cargar la configuración al inicio
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedConfig) {
        // Deserializar el JSON stringificado y cargar el estado
        const parsedConfig = JSON.parse(savedConfig);
        setState(prevConfig => ({ ...prevConfig, ...parsedConfig }));
        console.log('Configuración cargada desde localStorage.');
      }
    } catch (e) {
      console.error('Error al cargar la configuración desde localStorage:', e);
    }
    // Marcar como listo inmediatamente para el renderizado local
    setIsReady(true);
  }, []);

  // Función de guardado optimizada (Debounced)
  const saveConfigToLocalStorage = useCallback(debounce((newConfig: LandingConfig) => {
    try {
      // Serializar el estado a un JSON stringificado
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newConfig));
      // console.log('Configuración guardada automáticamente en localStorage.');
    } catch (e) {
      console.error('Error al guardar en localStorage:', e);
    }
  }, 500), []);

  // Efecto que se dispara al cambiar el estado para guardar
  useEffect(() => {
    if (isReady) {
      saveConfigToLocalStorage(state);
    }
  }, [state, isReady, saveConfigToLocalStorage]);
  // --------------------------------------------------------


  const handleShowPreview = () => {
    // SIEMPRE crear una versión "Lite" para asegurar que el QR funcione
    // Esto elimina las imágenes locales que causan problemas
    const liteState = {
      ...state,
      imageUrl: 'https://via.placeholder.com/800x1200?text=Fondo+No+Disponible',
      features: state.features.map(f => ({
        ...f,
        iconValue: f.iconType === 'image' ? 'https://via.placeholder.com/50?text=Img' : f.iconValue
      })),
      // Limpiar también iconos de beneficios (S2) por si pegaron imágenes base64
      section2Benefits: state.section2Benefits.map(b => ({
        ...b,
        icon: b.icon.length > 10 ? '✅' : b.icon
      })),
      // Limpiar avatares de testimonios (S3)
      section3Testimonials: state.section3Testimonials.map(t => ({
        ...t,
        avatarUrl: 'https://via.placeholder.com/40?text=Avatar'
      }))
    };

    const encoded = encodeState(liteState);
    // Usamos window.location.hostname para que funcione con la IP local si el usuario accede por IP
    const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/preview?data=${encoded}`;

    console.log('Preview URL Length:', url.length); // Debugging
    setPreviewUrl(url);
    setShowQR(true);
  };

  // Manejador genérico para los cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let newValue: string | number = value;

    if (type === 'number') {
      newValue = parseFloat(value);
    } else if (name === 'featureBgOpacity') {
      newValue = Math.max(0, Math.min(1, parseFloat(value)));
    } else if (name.includes('Height')) {
      newValue = Math.max(0, parseInt(value));
    }

    setState(prevState => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  // Manejador para la subida de imagen local (opcional)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof LandingConfig = 'imageUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState(prevState => ({ ...prevState, [fieldName]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejador para los cambios en los beneficios (Sección 2)
  const handleBenefitChange = (index: number, field: keyof BenefitItem, value: string) => {
    const newBenefits = [...state.section2Benefits];
    newBenefits[index] = { ...newBenefits[index], [field]: value };
    setState(prevState => ({ ...prevState, section2Benefits: newBenefits }));
  };

  // Manejador para los cambios en los features (Sección 1)
  const handleFeatureChange = (index: number, field: keyof import('../types').FeatureItem, value: string | number) => {
    const newFeatures = [...state.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setState(prevState => ({ ...prevState, features: newFeatures }));
  };

  // Manejador para los cambios en los testimonios (Sección 3)
  const handleTestimonialChange = (index: number, field: keyof TestimonialItem, value: string | number) => {
    const newTestimonials = [...state.section3Testimonials];
    const finalValue = (field === 'rating') ? Math.max(1, Math.min(5, Number(value))) : value;
    newTestimonials[index] = { ...newTestimonials[index], [field]: finalValue as any };
    setState(prevState => ({ ...prevState, section3Testimonials: newTestimonials }));
  };

  // Función para descargar la imagen generada (funciona 100% offline)
  const downloadImage = useCallback(async (ref: React.RefObject<HTMLDivElement | null>, filename: string) => {
    if (!ref.current) return;

    // Ocultar texto SEO solo si es la sección 1
    const isHero = ref.current.id === 'hero-section-to-capture';
    const titleElement = isHero ? ref.current.querySelector('.seo-text') : null;
    const phraseElement = isHero ? ref.current.querySelector('.seo-phrase') : null;

    if (titleElement) titleElement.setAttribute('style', 'visibility: hidden;');
    if (phraseElement) phraseElement.setAttribute('style', 'visibility: hidden;');

    try {
      const canvas = await html2canvas(ref.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      // Restaurar visibilidad
      if (titleElement) titleElement.setAttribute('style', 'visibility: visible;');
      if (phraseElement) phraseElement.setAttribute('style', 'visibility: visible;');

      const image = canvas.toDataURL('image/jpeg', 0.9);
      const link = document.createElement('a');
      link.href = image;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log(`¡Imagen ${filename} descargada! Ahora súbela a Gempages.`);

    } catch (error) {
      if (titleElement) titleElement.setAttribute('style', 'visibility: visible;');
      if (phraseElement) phraseElement.setAttribute('style', 'visibility: visible;');
      console.error('Error al generar la imagen:', error);
      console.error('Hubo un error al generar la imagen.');
    }
  }, []);


  if (!isReady) {
    return (
      <div className="p-8 text-center text-xl text-indigo-700 bg-gray-50 min-h-screen flex items-center justify-center">
        Cargando configuración... ⏳
      </div>
    );
  }

  return (
    <div className="bg-gray-100 h-screen font-sans relative overflow-hidden flex flex-col">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6 bg-white shadow-sm z-10 shrink-0">
        <h1 className="text-2xl md:text-3xl font-bold text-indigo-700 text-center md:text-left">🛠️ Generador Landing Pages</h1>
        <button
          onClick={handleShowPreview}
          className="mt-4 md:mt-0 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition flex items-center space-x-2"
        >
          <span>📱</span>
          <span>Ver en Móvil</span>
        </button>
      </div>

      {/* Modal QR Code */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={() => setShowQR(false)}>
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4 text-indigo-800">📱 Vista Previa Móvil</h3>

            <div className="bg-blue-50 p-3 rounded-lg mb-4 text-left text-xs text-blue-800 border border-blue-200">
              <p className="font-bold mb-1">💡 Para ver en tu celular:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Asegúrate de estar en la misma red WiFi.</li>
                <li>Si el QR no funciona, reemplaza <b>localhost</b> por la <b>IP de tu PC</b> (ej: 192.168.1.5).</li>
              </ol>
            </div>

            <div className="bg-white p-2 inline-block rounded mb-4 border">
              <QRCode value={previewUrl} size={200} />
            </div>

            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(previewUrl);
                  alert('Enlace copiado. Pégalo en tu celular o envíatelo por WhatsApp.');
                }}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm font-medium"
              >
                📋 Copiar Enlace
              </button>

              <button onClick={() => setShowQR(false)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 text-sm">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">

        {/* ======================================================= */}
        {/* --- Columna de Controles (Scrollable) --- */}
        {/* ======================================================= */}
        <div className="w-full lg:w-1/3 bg-gray-50 border-r border-gray-200 overflow-y-auto p-6">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600 sticky top-0 bg-gray-50 py-2 z-10">Controles de Diseño</h2>

          <HeroControls
            config={state}
            onChange={handleChange}
            onImageUpload={handleImageUpload}
            onDownload={() => downloadImage(heroRef, 'section-1-hero.jpg')}
            onFeatureChange={handleFeatureChange}
          />

          <BenefitsControls
            config={state}
            onChange={handleChange}
            onBenefitChange={handleBenefitChange}
            onDownload={() => downloadImage(section2Ref, 'section-2-benefits.jpg')}
          />

          <TestimonialsControls
            config={state}
            onChange={handleChange}
            onTestimonialChange={handleTestimonialChange}
            onDownload={() => downloadImage(section3Ref, 'section-3-testimonials.jpg')}
          />
        </div>

        {/* ======================================================= */}
        {/* --- Columna de Previsualización (Fija / Centrada) --- */}
        {/* ======================================================= */}
        <div className="w-full lg:w-2/3 bg-gray-200 flex flex-col items-center justify-center p-8 overflow-hidden">
          <h2 className="text-xl font-semibold mb-4 text-center text-green-600">Previsualización (Vista Móvil)</h2>
          <p className="text-center text-sm mb-4 text-gray-600 max-w-md">
            Descarga cada sección por separado para importarlas como imágenes de fondo en Gempages.
          </p>

          <div className="relative border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl overflow-hidden shrink-0">
            {/* Pantalla del Teléfono */}
            <div className="w-[272px] h-[572px] bg-white overflow-y-scroll no-scrollbar">

              <HeroPreview ref={heroRef} config={state} />

              <BenefitsPreview ref={section2Ref} config={state} />

              <TestimonialsPreview ref={section3Ref} config={state} />

              <div className="bg-white p-4 h-20 text-center text-sm text-gray-400 border-t border-dashed">
                Inicio de la Sección 4 (Aquí terminaría la imagen de S3)
              </div>

            </div>
          </div>
          <p className="text-center text-sm mt-4 text-red-500 font-medium">
            ⚠️ Recuerda que la URL de la imagen de fondo debe ser pública o debes usar la opción de subir archivo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPageSectionsGenerator;