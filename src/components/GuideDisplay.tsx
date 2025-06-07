import { MundoAssistantGuide } from "@/types";
import PillarCard from "./PillarCard";
import { FaBookOpen, FaComments, FaLightbulb } from "react-icons/fa";

interface GuideDisplayProps {
  guide: MundoAssistantGuide;
}

const GuideDisplay: React.FC<GuideDisplayProps> = ({ guide }) => {
  return (
    <div className="max-w-3xl mx-auto mt-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white">{guide.guideTitle}</h2>
        <div className="mt-2 flex justify-center gap-2">
          {guide.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-500/20 text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <PillarCard icon={<FaBookOpen />} title="La Metáfora (El Cuento)">
          <p>{guide.metaphorStory}</p>
        </PillarCard>

        <PillarCard icon={<FaComments />} title="La Conversación (Tu Guía)">
          <div>
            <h4 className="font-semibold text-white mb-2">
              Preguntas para Explorar:
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              {guide.conversationGuide.exploratoryQuestions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold text-white mb-2">
              Frases para Validar:
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              {guide.conversationGuide.validationPhrases.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        </PillarCard>

        <PillarCard
          icon={<FaLightbulb />}
          title="La Actividad (Manos a la Obra)"
        >
          <div>
            <h4 className="font-semibold text-white mb-2">
              {guide.suggestedActivity.title}
            </h4>
            <p>{guide.suggestedActivity.description}</p>
            <div className="mt-3">
              <p>
                <strong className="text-white">Materiales:</strong>{" "}
                {guide.suggestedActivity.materials}
              </p>
            </div>
          </div>
        </PillarCard>
      </div>
    </div>
  );
};

export default GuideDisplay;
