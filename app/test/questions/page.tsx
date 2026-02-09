"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions, likertOptions } from "@/lib/questions";
import { Responses } from "@/lib/types";

// 페이지별 문항 수 (6, 6, 6, 5)
const questionsPerPage = [6, 6, 6, 5];

export default function TestQuestions() {
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(0);
  const [responses, setResponses] = useState<Partial<Responses>>({});
  const [testData, setTestData] = useState<any>(null);

  useEffect(() => {
    // 세션 스토리지에서 기본 정보 가져오기
    const stored = sessionStorage.getItem("testData");
    if (!stored) {
      router.push("/test");
      return;
    }
    setTestData(JSON.parse(stored));

    // 저장된 응답 복원 (페이지 새로고침 대비)
    const storedResponses = sessionStorage.getItem("testResponses");
    if (storedResponses) {
      setResponses(JSON.parse(storedResponses));
    }
  }, [router]);

  // 현재 페이지의 문항 범위 계산
  const getPageQuestions = (page: number) => {
    let startIdx = 0;
    for (let i = 0; i < page; i++) {
      startIdx += questionsPerPage[i];
    }
    const endIdx = startIdx + questionsPerPage[page];
    return questions.slice(startIdx, endIdx);
  };

  const currentPageQuestions = getPageQuestions(pageIndex);
  const totalPages = questionsPerPage.length;

  // 전체 진행률 계산
  const answeredCount = Object.keys(responses).length;
  const progress = (answeredCount / questions.length) * 100;

  const handleAnswer = (questionId: string, value: number) => {
    const newResponses = {
      ...responses,
      [questionId]: value,
    };
    setResponses(newResponses);
    sessionStorage.setItem("testResponses", JSON.stringify(newResponses));
  };

  const handlePrevious = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    // 현재 페이지의 모든 문항에 응답했는지 확인
    const allAnswered = currentPageQuestions.every(
      (q) => responses[q.id as keyof Responses] !== undefined
    );

    if (!allAnswered) {
      alert("현재 페이지의 모든 문항에 응답해주세요.");
      return;
    }

    if (pageIndex < totalPages - 1) {
      setPageIndex(pageIndex + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    // 모든 문항에 응답했는지 확인
    const allAnswered = questions.every(
      (q) => responses[q.id as keyof Responses] !== undefined
    );

    if (!allAnswered) {
      alert("모든 문항에 응답해주세요.");
      return;
    }

    // 응답 데이터 저장
    sessionStorage.setItem("testResponses", JSON.stringify(responses));

    // 추가 정보 입력 페이지로 이동
    router.push("/information");
  };

  if (!testData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-neutral-900 to-stone-900">
      {/* 진행률 바 */}
      <div className="sticky top-0 bg-gradient-to-r from-stone-900/95 to-neutral-900/95 backdrop-blur-md shadow-lg border-b border-amber-500/20 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-amber-300">
              {answeredCount} / {questions.length} 응답 완료
            </span>
            <span className="text-sm text-stone-400">
              페이지 {pageIndex + 1} / {totalPages}
            </span>
          </div>
          <div className="w-full bg-stone-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-600 to-amber-400 h-2 rounded-full transition-all duration-300 shadow-lg shadow-amber-500/50"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 문항 목록 */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {currentPageQuestions.map((question, idx) => {
            const questionNumber = questions.findIndex(q => q.id === question.id) + 1;
            const selectedValue = responses[question.id as keyof Responses];

            return (
              <div
                key={question.id}
                className="bg-gradient-to-br from-stone-800/80 to-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-amber-500/20 p-6 md:p-8 space-y-6"
              >
                {/* 문항 번호 및 텍스트 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold text-sm shadow-lg shadow-amber-500/30">
                      {questionNumber}
                    </span>
                    {selectedValue !== undefined && (
                      <span className="text-green-400 text-2xl">✓</span>
                    )}
                  </div>
                  <h2 className="text-lg md:text-xl font-semibold text-stone-100 leading-relaxed">
                    {question.text}
                  </h2>
                </div>

                {/* 응답 옵션 */}
                <div className="grid grid-cols-5 gap-2 md:gap-3">
                  {likertOptions.map((option) => {
                    const selected = selectedValue === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer(question.id, option.value)}
                        className={`py-3 px-2 rounded-lg border-2 font-medium text-sm md:text-base transition-all ${
                          selected
                            ? "border-amber-500 bg-gradient-to-br from-amber-600 to-amber-500 text-white shadow-xl shadow-amber-500/40"
                            : "border-stone-600 text-stone-300 hover:border-amber-500/50 hover:bg-stone-700/50 bg-stone-900/50"
                        }`}
                      >
                        <div className="text-center">
                          <div className="font-bold mb-1">{option.value}</div>
                          <div className="text-xs leading-tight">{option.label}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* 네비게이션 버튼 */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={handlePrevious}
            disabled={pageIndex === 0}
            className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all ${
              pageIndex === 0
                ? "bg-stone-900/50 text-stone-600 cursor-not-allowed border-2 border-stone-700"
                : "bg-stone-800/80 text-stone-200 hover:bg-stone-700/80 shadow-lg border-2 border-stone-600 hover:border-amber-500/50"
            }`}
          >
            ← 이전 페이지
          </button>

          {pageIndex < totalPages - 1 ? (
            <button
              onClick={handleNext}
              className="flex-1 py-4 px-6 rounded-xl font-semibold bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white shadow-2xl transition-all border border-amber-400/50"
            >
              다음 페이지 →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 py-4 px-6 rounded-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-2xl transition-all border border-green-400/50"
            >
              완료 →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
