import { MundoAssistantGuide } from "@/types";

const STORAGE_KEY = "mundoAssistant_savedGuides";

export function getSavedGuidesFromLocal(): MundoAssistantGuide[] {
  if (typeof window === "undefined") {
    return [];
  }
  const savedGuides = window.localStorage.getItem(STORAGE_KEY);
  return savedGuides ? JSON.parse(savedGuides) : [];
}

export function saveGuideToLocal(guideToSave: MundoAssistantGuide): void {
  if (typeof window === "undefined") {
    return;
  }
  const existingGuides = getSavedGuidesFromLocal();

  const isAlreadySaved = existingGuides.some((g) => g.id === guideToSave.id);

  if (!isAlreadySaved) {
    const updatedGuides = [...existingGuides, guideToSave];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGuides));
  }
}
