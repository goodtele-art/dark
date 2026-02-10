"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdditionalInformation() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    myPersonality: "",
    childhoodEvent: "",
    comfortableClients: "",
    difficultClients: "",
    recentStress: "",
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

  // 간단한 ID 생성 (SD-001 ~ SD-999 형식)
  const generateResultId = () => {
    // 현재 타임스탬프 기반으로 3자리 숫자 생성
    const timestamp = Date.now();
    const randomNum = (timestamp % 999) + 1; // 1~999
    const paddedNum = String(randomNum).padStart(3, "0");
    return `SD-${paddedNum}`;
  };

  const handleAiInterpretation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 간단한 결과 ID 생성
      const resultId = generateResultId();

      // AI 해석 타입 저장
      sessionStorage.setItem("interpretationType", "ai");
      sessionStorage.setItem("additionalInfo", JSON.stringify(formData));
      sessionStorage.setItem("resultId", resultId);

      // 결과 페이지로 이동
      router.push(`/result/${resultId}`);
    } catch (error) {
      console.error("제출 오류:", error);
      alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
      setIsSubmitting(false);
    }
  };

  const handleGeneralInterpretation = () => {
    // 간단한 결과 ID 생성
    const resultId = generateResultId();

    // 일반 해석 타입 저장
    sessionStorage.setItem("interpretationType", "general");
    sessionStorage.setItem("additionalInfo", JSON.stringify({}));
    sessionStorage.setItem("resultId", resultId);

    router.push(`/result/${resultId}`);
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

          {/* 내가 생각하는 나의 성격 */}
          <div className="space-y-3">
            <label htmlFor="myPersonality" className="block text-sm font-semibold text-amber-300">
              내가 생각하는 나의 성격
            </label>
            <textarea
              id="myPersonality"
              value={formData.myPersonality}
              onChange={(e) => setFormData({ ...formData, myPersonality: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-stone-600 bg-stone-900/50 text-stone-200 placeholder-stone-500 focus:border-amber-500 focus:outline-none transition-colors resize-none"
              rows={3}
              placeholder="예: 내향적, 신중함, 완벽주의 등"
            />
          </div>

          {/* 어린 시절 생각나는 중요한 사건 */}
          <div className="space-y-3">
            <label htmlFor="childhoodEvent" className="block text-sm font-semibold text-amber-300">
              어린 시절 생각나는 중요한 사건
            </label>
            <textarea
              id="childhoodEvent"
              value={formData.childhoodEvent}
              onChange={(e) => setFormData({ ...formData, childhoodEvent: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-stone-600 bg-stone-900/50 text-stone-200 placeholder-stone-500 focus:border-amber-500 focus:outline-none transition-colors resize-none"
              rows={3}
              placeholder="예: 가족 환경, 주요 경험 등"
            />
          </div>

          {/* 나에게 잘 이해되는 내담자 */}
          <div className="space-y-3">
            <label htmlFor="comfortableClients" className="block text-sm font-semibold text-amber-300">
              나에게 잘 이해되는 내담자
            </label>
            <textarea
              id="comfortableClients"
              value={formData.comfortableClients}
              onChange={(e) => setFormData({ ...formData, comfortableClients: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-stone-600 bg-stone-900/50 text-stone-200 placeholder-stone-500 focus:border-amber-500 focus:outline-none transition-colors resize-none"
              rows={3}
              placeholder="예: 불안한 내담자, 우울한 내담자 등"
            />
          </div>

          {/* 나에게 불편한, 또는 어려운 내담자 */}
          <div className="space-y-3">
            <label htmlFor="difficultClients" className="block text-sm font-semibold text-amber-300">
              나에게 불편한, 또는 어려운 내담자
            </label>
            <textarea
              id="difficultClients"
              value={formData.difficultClients}
              onChange={(e) => setFormData({ ...formData, difficultClients: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-stone-600 bg-stone-900/50 text-stone-200 placeholder-stone-500 focus:border-amber-500 focus:outline-none transition-colors resize-none"
              rows={3}
              placeholder="예: 공격적인 내담자, 경계선 성격장애 내담자 등"
            />
          </div>

          {/* 나의 최근 스트레스 */}
          <div className="space-y-3">
            <label htmlFor="recentStress" className="block text-sm font-semibold text-amber-300">
              나의 최근 스트레스
            </label>
            <textarea
              id="recentStress"
              value={formData.recentStress}
              onChange={(e) => setFormData({ ...formData, recentStress: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-stone-600 bg-stone-900/50 text-stone-200 placeholder-stone-500 focus:border-amber-500 focus:outline-none transition-colors resize-none"
              rows={3}
              placeholder="예: 업무 압박, 대인관계 문제 등"
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
