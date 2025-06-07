import React from "react";

interface PillarCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const PillarCard: React.FC<PillarCardProps> = ({ icon, title, children }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-blue-400 text-2xl">{icon}</div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <div className="text-slate-300 space-y-4 prose prose-invert prose-p:text-slate-300 prose-li:text-slate-300">
        {children}
      </div>
    </div>
  );
};

export default PillarCard;
