"use client";

import { useState, useEffect } from "react";
import { MundoAssistantGuide } from "@/types";
import { saveGuideToLocal, getSavedGuidesFromLocal } from "@/lib/storage";
import { FaHeart, FaCheckCircle, FaDownload, FaShareAlt } from "react-icons/fa";

interface GuideActionsProps {
  guide: MundoAssistantGuide;
}

export default function GuideActions({ guide }: GuideActionsProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [showAccountPrompt, setShowAccountPrompt] = useState(false);
  const [shareStatus, setShareStatus] = useState<string>("");

  useEffect(() => {
    const savedGuides = getSavedGuidesFromLocal();
    const alreadySaved = savedGuides.some((g) => g.id === guide.id);
    setIsSaved(alreadySaved);
    setShowAccountPrompt(false);
  }, [guide.id]);

  const handleSave = () => {
    saveGuideToLocal(guide);
    setIsSaved(true);
    setShowAccountPrompt(true);
  };

  const handleDownload = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareData = {
      title: `Guía de Aynia: ${guide.guideTitle}`,
      text: `He generado una guía útil sobre "${guide.guideTitle}" con Aynia. ¡Échale un vistazo!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus("¡Compartido!");
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setShareStatus("¡Enlace copiado!");
      }
    } catch (error) {
      console.error("Error al compartir:", error);
      setShareStatus("No se pudo compartir");
    }

    setTimeout(() => setShareStatus(""), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto my-5 text-center">
      <div className="grid md:grid-cols-3 gap-2 flex-wrap">
        <button
          onClick={handleSave}
          disabled={isSaved}
          className="inline-flex items-center gap-2 text-sm px-6 py-2 font-semibold bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isSaved ? <FaCheckCircle className="text-green-400" /> : <FaHeart />}
          {isSaved ? "Guía Guardada" : "Guardar Guía"}
        </button>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 text-sm px-6 py-2 font-semibold bg-gray-600/50 border border-white/20 text-white rounded-lg hover:bg-gray-600/80 transition-all"
        >
          <FaDownload />
          Descargar / Imprimir
        </button>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 text-sm px-6 py-2 font-semibold bg-gray-600/50 border border-white/20 text-white rounded-lg hover:bg-gray-600/80 transition-all"
        >
          <FaShareAlt />
          Compartir
        </button>
      </div>

      {shareStatus && (
        <p className="mt-4 text-green-400 animate-fade-in">{shareStatus}</p>
      )}

      {showAccountPrompt && (
        <div className="mt-6 p-4 bg-blue-900/50 border border-blue-500/50 rounded-lg max-w-lg mx-auto animate-fade-in">
          <p className="text-blue-200">
            ¡Guardado! Para acceder a tus guías desde cualquier dispositivo,
            crea una cuenta.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <button className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
              Crear Cuenta y Sincronizar
            </button>
            <button
              onClick={() => setShowAccountPrompt(false)}
              className="px-5 py-2 text-slate-300 hover:text-white transition"
            >
              Más tarde
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
