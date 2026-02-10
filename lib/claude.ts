import Anthropic from "@anthropic-ai/sdk";
import { RawScores, TScores, Percentiles } from "./types";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface InterpretationRequest {
  age: number;
  gender: 1 | 2;
  rawScores: RawScores;
  tScores: TScores;
  percentiles: Percentiles;
  additionalInfo?: {
    personality?: string;
    growthBackground?: string;
    stressFactors?: string;
    otherInfo?: string;
  };
}

export async function generateInterpretation(
  data: InterpretationRequest
): Promise<string> {
  const genderText = data.gender === 1 ? "남성" : "여성";

  const prompt = `당신은 임상심리학자로서 다크 테트라드(Dark Tetrad) 성격 검사 결과를 해석하는 전문가입니다.

## 내담자 정보
- 성별: ${genderText}
- 나이: ${data.age}세
${data.additionalInfo?.personality ? `- 성격 특성: ${data.additionalInfo.personality}` : ""}
${data.additionalInfo?.growthBackground ? `- 성장 과정: ${data.additionalInfo.growthBackground}` : ""}
${data.additionalInfo?.stressFactors ? `- 스트레스 요인: ${data.additionalInfo.stressFactors}` : ""}
${data.additionalInfo?.otherInfo ? `- 기타 정보: ${data.additionalInfo.otherInfo}` : ""}

## 검사 결과
### 원점수 (Raw Scores)
- 마키아벨리즘 (Mach): ${data.rawScores.mach}/30
- 나르시시즘 (Narc): ${data.rawScores.narc}/30
- 사이코패시 (Psyc): ${data.rawScores.psyc}/30
- 사디즘 (Sadi): ${data.rawScores.sadi}/25

### T점수 (표준화 점수, 평균=50, 표준편차=10)
- 마키아벨리즘: T=${data.tScores.mach.toFixed(1)} (${data.percentiles.mach}백분위)
- 나르시시즘: T=${data.tScores.narc.toFixed(1)} (${data.percentiles.narc}백분위)
- 사이코패시: T=${data.tScores.psyc.toFixed(1)} (${data.percentiles.psyc}백분위)
- 사디즘: T=${data.tScores.sadi.toFixed(1)} (${data.percentiles.sadi}백분위)

## 해석 가이드라인
- T점수 <40: 낮음
- T점수 40-60: 평균 범위
- T점수 >60: 높음

## 요청사항
다음 구조로 상담자를 위한 해석을 작성해주세요:

### 1. 전체적인 성격 프로필 (150-200자)
4가지 척도의 전반적인 패턴을 종합하여 내담자의 성격 특징을 요약해주세요.

### 2. 척도별 세부 해석 (각 척도당 100-150자)
각 척도별로 T점수와 내담자 정보를 고려한 구체적인 해석을 제공해주세요.

#### 마키아벨리즘
[해석]

#### 나르시시즘
[해석]

#### 사이코패시
[해석]

#### 사디즘
[해석]

### 3. 상담 시 고려사항 (150-200자)
상담자가 내담자를 만날 때 특별히 주의하거나 고려해야 할 점을 제시해주세요.

### 4. 강점과 발전 영역 (100-150자)
내담자의 잠재적 강점과 발전 가능한 영역을 균형있게 제시해주세요.

---

**중요**:
- 교육용 도구이므로 진단적 표현은 지양하고, 특성과 경향성 중심으로 기술해주세요.
- 내담자 정보를 최대한 활용하여 맥락화된 해석을 제공해주세요.
- 상담자가 이해하기 쉽고 실용적인 언어를 사용해주세요.
- 각 섹션의 제목은 그대로 유지하되, 내용만 작성해주세요.`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const textContent = message.content.find(
      (block) => block.type === "text"
    );

    if (textContent && textContent.type === "text") {
      return textContent.text;
    }

    throw new Error("AI 응답 형식 오류");
  } catch (error) {
    console.error("Claude API 오류:", error);
    throw new Error("AI 해석 생성 중 오류가 발생했습니다.");
  }
}
