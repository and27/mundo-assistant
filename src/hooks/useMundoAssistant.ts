import { useState, useEffect } from "react";
import { MundoAssistantGuide } from "@/types";

const loadingMessages = [
  "Contactando a Mundo Assistant...",
  "Analizando tu consulta...",
  "Paso 1: Generando el borrador creativo...",
  "Consultando el libro de sabiduría...",
  "Paso 2: Auditando con Ayni Guard...",
  "Verificando la calidad y seguridad...",
  "¡Casi listo! Preparando tu guía...",
];

export function useMundoAssistant() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [guide, setGuide] = useState<MundoAssistantGuide | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>(
    loadingMessages[0]
  );

  useEffect(() => {
    if (isLoading) {
      let messageIndex = 0;
      const interval = setInterval(() => {
        if (loadingMessages.length <= messageIndex) {
          messageIndex = messageIndex + 1;
          setLoadingMessage(loadingMessages[messageIndex]);
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const generateGuide = async (query: string) => {
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setGuide(null);
    setError(null);
    setLoadingMessage(loadingMessages[0]);

    try {
      const response = await fetch("/api/generate-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(
          errorResult.error || `An error occurred: ${response.statusText}`
        );
      }

      const data: MundoAssistantGuide = await response.json();
      setGuide(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, guide, error, loadingMessage, generateGuide };
}
