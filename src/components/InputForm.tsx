import { useState } from "react";

interface InputFormProps {
  isLoading: boolean;
  onSubmit: (query: string) => void;
}

export default function InputForm({ isLoading, onSubmit }: InputFormProps) {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(query);
  };

  return (
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
  );
}
