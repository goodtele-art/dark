"use client";

import { Scale } from "@/lib/types";
import { scaleNames, scaleDescriptions } from "@/lib/questions";
import {
  baseInterpretations,
  counselorNotes,
  getInterpretationLevel,
  getLevelColor,
  getLevelLabel,
} from "@/lib/interpretations";

interface InterpretationSectionProps {
  scale: Scale;
  tScore: number;
  percentile: number;
}

export default function InterpretationSection({
  scale,
  tScore,
  percentile,
}: InterpretationSectionProps) {
  const level = getInterpretationLevel(tScore);
  const interpretation = baseInterpretations[scale][level];
  const note = counselorNotes[scale];

  // 다크 테마에 맞게 레벨 색상 조정
  const getDarkLevelColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-blue-500/20 text-blue-300 border border-blue-500/30";
      case "average":
        return "bg-green-500/20 text-green-300 border border-green-500/30";
      case "high":
        return "bg-red-500/20 text-red-300 border border-red-500/30";
      default:
        return "bg-stone-500/20 text-stone-300 border border-stone-500/30";
    }
  };

  return (
    <div className="bg-gradient-to-br from-stone-800/80 to-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-amber-500/20 p-6 space-y-4">
      {/* 헤더 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-amber-300 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></span>
            {scaleNames[scale]}
          </h3>
          <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getDarkLevelColor(level)}`}>
            {getLevelLabel(level)}
          </span>
        </div>
        <p className="text-sm text-stone-400">{scaleDescriptions[scale]}</p>
      </div>

      {/* 점수 정보 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-amber-900/30 to-amber-800/30 border border-amber-500/20 rounded-xl p-4">
          <div className="text-sm text-amber-400 font-medium mb-1">T점수</div>
          <div className="text-3xl font-bold text-amber-200">
            {tScore.toFixed(1)}
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-500/20 rounded-xl p-4">
          <div className="text-sm text-purple-400 font-medium mb-1">백분위</div>
          <div className="text-3xl font-bold text-purple-200">
            {percentile}%ile
          </div>
        </div>
      </div>

      {/* 해석 */}
      <div className="space-y-3">
        <div className="bg-stone-900/50 rounded-xl p-4 border border-stone-700">
          <h4 className="text-sm font-semibold text-amber-300 mb-2 flex items-center gap-2">
            <span className="text-amber-500">✦</span>
            해석
          </h4>
          <p className="text-stone-300 leading-relaxed">{interpretation}</p>
        </div>

        {/* 상담자 주의사항 */}
        <div className="bg-gradient-to-r from-amber-900/30 to-amber-800/30 rounded-xl p-4 border border-amber-500/30">
          <h4 className="text-sm font-semibold text-amber-300 mb-2 flex items-center gap-2">
            <span className="text-amber-400">⚠</span>
            상담자 주의사항
          </h4>
          <p className="text-sm text-amber-200/90 leading-relaxed">{note}</p>
        </div>
      </div>
    </div>
  );
}
