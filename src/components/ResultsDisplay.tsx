import { MundoAssistantGuide } from "@/types";
import GuideDisplay from "@/components/GuideDisplay";
import ErrorMessage from "./ErrorMessage";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";

interface ResultsDisplayProps {
  isLoading: boolean;
  error: string | null;
  guide: MundoAssistantGuide | null;
  loadingMessage: string;
}

export default function ResultsDisplay({
  isLoading,
  error,
  guide,
  loadingMessage,
}: ResultsDisplayProps) {
  if (isLoading) {
    return <LoadingState message={loadingMessage} />;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }
  if (guide) {
    return (
      <>
        <GuideDisplay guide={guide} />
      </>
    );
  }
  return <EmptyState />;
}
