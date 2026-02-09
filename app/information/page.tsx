"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdditionalInformation() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    personality: "",
    growthBackground: "",
    stressFactors: "",
    otherInfo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // 이전 단계 데이터 확인
    const testData = sessionStorage.getItem("testData");
    const testResponses = sessionStorage.getItem("testResponses");

    if (!testData || !testResponses) {
      router.push("/test");
      return;
    }
  }, [router]);

  const handleAiInterpretation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // AI 해석 타입 저장
      sessionStorage.setItem("interpretationType", "ai");
      sessionStorage.setItem("additionalInfo", JSON.stringify(formData));

      // 임시 결과 페이지 (ID 1로 하드코딩)
      router.push("/result/1");
    } catch (error) {
      console.error("제출 오류:", error);
      alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
      setIsSubmitting(false);
    }
  };

  const handleGeneralInterpretation = () => {
    // 일반 해석 타입 저장
    sessionStorage.setItem("interpretationType", "general");
    sessionStorage.setItem("additionalInfo", JSON.stringify({}));
    router.push("/result/1");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-neutral-900 to-stone-900 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-60 h-60 bg-amber-600/10 rounded-full blur-3xl"></div>
      </div>

      <main className="max-w-2xl w-full space-y-6 relative z-10">
        {/* 헤더 */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-200 to-stone-200 bg-clip-text text-transparent">
            추가 정보 입력
          </h1>
          <p className="text-stone-400">
            AI 맞춤 해석을 위한 정보를 입력해주세요 (선택사항)
          </p>
        </div>

        {/* 폼 */}
        <form onSubmit={handleAiInterpretation} className="bg-gradient-to-br from-stone-800/80 to-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-amber-500/20 p-6 md:p-8 space-y-6">
          {/* 안내 문구 */}
          <div className="bg-gradient-to-r from-amber-900/30 to-amber-800/30 rounded-xl p-4 border border-amber-500/20">
            <p className="text-sm text-amber-200 leading-relaxed">
              입력하신 정보는 AI가 검사 결과를 해석하는 데 활용됩니다.
              더 상세한 정보를 제공할수록 맞춤형 해석을 받을 수 있습니다.
            </p>
          </div>

          {/* 성격 특성 */}
          <div className="space-y-3">
            <label htmlFor="personality" className="block text-sm font-semibold text-amber-300">
              성격 특성
            </label>
            <textarea
              id="personality"
              value={formData.personality}
              onChange={(e) => setFormData({ ...formData, personality: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-stone-600 bg-stone-900/50 text-stone-200 placeholder-stone-500 focus:border-amber-500 focus:outline-none transition-colors resize-none"
              rows={3}
              placeholder="예: 내향적, 신중함, 완벽주의 등"
            />
          </div>

          {/* 성장 과정 */}
          <div className="space-y-3">
            <label htmlFor="growthBackground" className="block text-sm font-semibold text-amber-300">
              성장 과정
            </label>
            <textarea
              id="growthBackground"
              value={formData.growthBackground}
              onChange={(e) => setFormData({ ...formData, growthBackground: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-stone-600 bg-stone-900/50 text-stone-200 placeholder-stone-500 focus:border-amber-500 focus:outline-none transition-colors resize-none"
              rows={3}
              placeholder="예: 가족 환경, 주요 경험 등"
            />
          </div>

          {/* 스트레스 요인 */}
          <div className="space-y-3">
            <label htmlFor="stressFactors" className="block text-sm font-semibold text-amber-300">
              스트레스 요인
            </label>
            <textarea
              id="stressFactors"
              value={formData.stressFactors}
              onChange={(e) => setFormData({ ...formData, stressFactors: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-stone-600 bg-stone-900/50 text-stone-200 placeholder-stone-500 focus:border-amber-500 focus:outline-none transition-colors resize-none"
              rows={3}
              placeholder="예: 업무 압박, 대인관계 문제 등"
            />
          </div>

          {/* 기타 정보 */}
          <div className="space-y-3">
            <label htmlFor="otherInfo" className="block text-sm font-semibold text-amber-300">
              기타 정보
            </label>
            <textarea
              id="otherInfo"
              value={formData.otherInfo}
              onChange={(e) => setFormData({ ...formData, otherInfo: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-stone-600 bg-stone-900/50 text-stone-200 placeholder-stone-500 focus:border-amber-500 focus:outline-none transition-colors resize-none"
              rows={3}
              placeholder="상담자에게 알리고 싶은 추가 정보"
            />
          </div>

          {/* 버튼 */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-bold shadow-2xl transition-all ${
                isSubmitting
                  ? "bg-stone-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 active:scale-98 border border-purple-400/50"
              } text-white`}
            >
              {isSubmitting ? "제출 중..." : "🤖 내 정보로 해석하기"}
            </button>

            <button
              type="button"
              onClick={handleGeneralInterpretation}
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl font-bold border-2 border-amber-500 bg-stone-900/50 hover:bg-amber-500/10 text-amber-300 hover:text-amber-200 transition-all active:scale-98 shadow-lg"
            >
              📊 일반적인 해석하기
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
