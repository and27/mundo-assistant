"use client";

import { useMundoAssistant } from "@/hooks/useMundoAssistant";
import PageHeader from "@/components/PageHeader";
import InputForm from "@/components/InputForm";
import ResultsDisplay from "@/components/ResultsDisplay";

export default function HomePage() {
  const { isLoading, guide, error, generateGuide, loadingMessage } =
    useMundoAssistant();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1e1b4b] to-[#0c0a1d] text-white p-4">
      <div className="container mx-auto">
        <PageHeader />
        <InputForm isLoading={isLoading} onSubmit={generateGuide} />
        <div className="mt-20">
          <ResultsDisplay
            isLoading={isLoading}
            error={error}
            guide={guide}
            loadingMessage={loadingMessage}
          />
        </div>
      </div>
    </main>
  );
}
