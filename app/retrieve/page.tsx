"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RetrievePage() {
  const router = useRouter();
  const [resultId, setResultId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!resultId.trim()) {
      setError("결과 ID를 입력해주세요.");
      return;
    }

    if (!password.trim()) {
      setError("암호를 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      // TODO: 나중에 API로 DB 조회
      // 현재는 세션 스토리지에서 확인
      const storedPassword = sessionStorage.getItem("testPassword");

      if (storedPassword !== password) {
        setError("암호가 일치하지 않습니다.");
        setLoading(false);
        return;
      }

      // 결과 페이지로 이동
      router.push(`/result/${resultId}`);
    } catch (err) {
      setError("결과를 불러오는 중 오류가 발생했습니다.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-neutral-900 to-stone-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* 헤더 */}
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-full border border-amber-500/30 mb-2">
            <span className="text-amber-400 text-sm font-medium">Result Retrieval</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-200 via-amber-100 to-stone-200 bg-clip-text text-transparent">
            이전 결과 조회
          </h1>
          <p className="text-stone-400">
            저장된 결과 ID와 암호를 입력하세요
          </p>
        </div>

        {/* 폼 */}
        <div className="bg-gradient-to-br from-stone-800/80 to-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-amber-500/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 결과 ID 입력 */}
            <div className="space-y-2">
              <label htmlFor="resultId" className="block text-sm font-medium text-amber-400">
                결과 ID
              </label>
              <input
                type="text"
                id="resultId"
                value={resultId}
                onChange={(e) => setResultId(e.target.value)}
                className="w-full px-4 py-3 bg-stone-900/50 border border-stone-600 rounded-xl text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                placeholder="예: dt_20260210_123456"
              />
            </div>

            {/* 암호 입력 */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-amber-400">
                암호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-stone-900/50 border border-stone-600 rounded-xl text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                placeholder="결과 저장 시 설정한 암호"
              />
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-4">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold rounded-xl shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 border border-amber-400/50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  조회 중...
                </span>
              ) : (
                "결과 조회하기"
              )}
            </button>
          </form>

          {/* 주의사항 */}
          <div className="mt-6 pt-6 border-t border-stone-700">
            <p className="text-sm text-stone-400 text-center">
              결과 ID와 암호를 분실한 경우, 다시 검사를 진행해주세요.
            </p>
          </div>
        </div>

        {/* 돌아가기 버튼 */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-stone-800/80 hover:bg-stone-700/80 text-stone-200 font-semibold rounded-xl shadow-lg border-2 border-stone-600 hover:border-amber-500/50 transition-all"
          >
            처음으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
