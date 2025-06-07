export interface ConversationGuide {
  exploratoryQuestions: string[];
  validationPhrases: string[];
}

export interface SuggestedActivity {
  title: string;
  description: string;
  materials: string;
}

export interface MundoAssistantGuide {
  id: string;
  guideTitle: string;
  metaphorStory: string;
  conversationGuide: ConversationGuide;
  suggestedActivity: SuggestedActivity;
  tags: string[];
}
