"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { scaleNames } from "@/lib/questions";

interface ScoreChartProps {
  scores: {
    mach: { norm: number; cumulative: number };
    narc: { norm: number; cumulative: number };
    psyc: { norm: number; cumulative: number };
    sadi: { norm: number; cumulative: number };
  };
}

export default function ScoreChart({ scores }: ScoreChartProps) {
  // 차트 데이터 변환
  const chartData = [
    {
      name: scaleNames.mach,
      규준: scores.mach.norm,
      누적: scores.mach.cumulative,
    },
    {
      name: scaleNames.narc,
      규준: scores.narc.norm,
      누적: scores.narc.cumulative,
    },
    {
      name: scaleNames.psyc,
      규준: scores.psyc.norm,
      누적: scores.psyc.cumulative,
    },
    {
      name: scaleNames.sadi,
      규준: scores.sadi.norm,
      누적: scores.sadi.cumulative,
    },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-stone-800/80 to-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-amber-500/20 p-6">
      <h3 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></span>
        T점수 비교 그래프
      </h3>

      <div className="w-full" style={{ height: "400px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#44403c" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#d6d3d1", fontSize: 12 }}
              stroke="#57534e"
              interval={0}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 50, 60, 80, 100]}
              tick={{ fill: "#d6d3d1", fontSize: 12 }}
              stroke="#57534e"
              label={{
                value: "T점수",
                angle: -90,
                position: "insideLeft",
                style: { fill: "#a8a29e", fontSize: 14 },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#292524",
                border: "1px solid #f59e0b40",
                borderRadius: "8px",
                padding: "12px",
                color: "#d6d3d1",
              }}
              labelStyle={{ fontWeight: "600", marginBottom: "8px", color: "#fbbf24" }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
              }}
            />

            {/* 기준선 */}
            <ReferenceLine
              y={40}
              stroke="#3b82f6"
              strokeDasharray="3 3"
              strokeWidth={1}
              label={{
                value: "낮음",
                position: "right",
                fill: "#60a5fa",
                fontSize: 10,
              }}
            />
            <ReferenceLine
              y={50}
              stroke="#10b981"
              strokeWidth={2}
              label={{
                value: "평균",
                position: "right",
                fill: "#34d399",
                fontSize: 10,
              }}
            />
            <ReferenceLine
              y={60}
              stroke="#ef4444"
              strokeDasharray="3 3"
              strokeWidth={1}
              label={{
                value: "높음",
                position: "right",
                fill: "#f87171",
                fontSize: 10,
              }}
            />

            <Bar
              dataKey="규준"
              fill="#f59e0b"
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            />
            <Bar
              dataKey="누적"
              fill="#d97706"
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 설명 */}
      <div className="mt-4 text-sm text-stone-400 space-y-1.5">
        <p className="flex items-center gap-2">
          <span className="w-3 h-3 bg-amber-500 rounded"></span>
          <span className="font-semibold text-amber-400">규준</span>: 기존 규준 데이터 기반 T점수
        </p>
        <p className="flex items-center gap-2">
          <span className="w-3 h-3 bg-amber-600 rounded"></span>
          <span className="font-semibold text-amber-500">누적</span>: 실시자 누적 데이터 기반 T점수
        </p>
        <p className="flex items-center gap-2">
          <span className="text-amber-500">✦</span>
          T점수 평균 = 50, 표준편차 = 10
        </p>
      </div>
    </div>
  );
}
