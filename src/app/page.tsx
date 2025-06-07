"use client";

import { useState } from "react";
import { MundoAssistantGuide } from "@/types";
import GuideDisplay from "@/components/GuideDisplay";

export default function HomePage() {
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [guide, setGuide] = useState<MundoAssistantGuide | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setGuide(null);
    setError(null);

    try {
      const response = await fetch("/api/generate-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || `Error: ${response.statusText}`);
      }

      const data: MundoAssistantGuide = await response.json();
      setGuide(data);
    } catch (err) {
      if (err instanceof Error)
        setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1e1b4b] to-[#0c0a1d] text-white p-4">
      <div className="container mx-auto">
        <div className="text-center my-8 sm:my-12">
          <h1 className="text-4xl sm:text-5xl font-bold">Mundo Assistant</h1>
          <p className="text-lg text-slate-300 mt-2">
            Tu guía para acompañar las emociones de los más pequeños.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="¿Sobre qué emoción o situación necesitas orientación hoy? Ej: mi hijo tiene miedo a la oscuridad..."
            className="w-full p-4 bg-slate-800/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 transition text-white placeholder:text-slate-400"
            rows={3}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="w-full mt-4 p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed transition-all duration-300"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? "Generando guía..." : "Generar Guía"}
          </button>
        </form>

        <div className="mt-12">
          {isLoading && (
            <div className="flex justify-center items-center">
              <div className="w-8 h-8 border-4 border-slate-500 border-t-white rounded-full animate-spin"></div>
            </div>
          )}

          {error && <p className="text-red-400 text-center">{error}</p>}

          {!guide && !isLoading && !error && (
            <div className="text-center p-8 border-2 border-dashed border-slate-700 rounded-lg max-w-3xl mx-auto">
              <p className="text-slate-500">
                Tu guía personalizada con los tres pilares aparecerá aquí.
              </p>
            </div>
          )}

          {guide && <GuideDisplay guide={guide} />}
        </div>
      </div>
    </main>
  );
}
