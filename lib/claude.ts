import Anthropic from "@anthropic-ai/sdk";
import { RawScores, TScores, Percentiles } from "./types";

// API 키 존재 여부 확인
if (!process.env.ANTHROPIC_API_KEY) {
  console.error("ANTHROPIC_API_KEY가 설정되지 않았습니다!");
}

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
    myPersonality?: string;
    childhoodEvent?: string;
    comfortableClients?: string;
    difficultClients?: string;
    recentStress?: string;
  };
}

export async function generateInterpretation(
  data: InterpretationRequest
): Promise<string> {
  const genderText = data.gender === 1 ? "남성" : "여성";

  const prompt = `당신은 임상심리학자로서 다크 테트라드(Dark Tetrad) 성격 검사 결과를 해석하는 전문가입니다.

## 상담자(검사 실시자) 정보
- 성별: ${genderText}
- 나이: ${data.age}세
${data.additionalInfo?.myPersonality ? `- 내가 생각하는 나의 성격: ${data.additionalInfo.myPersonality}` : ""}
${data.additionalInfo?.childhoodEvent ? `- 어린 시절 생각나는 중요한 사건: ${data.additionalInfo.childhoodEvent}` : ""}
${data.additionalInfo?.comfortableClients ? `- 나에게 잘 이해되는 내담자: ${data.additionalInfo.comfortableClients}` : ""}
${data.additionalInfo?.difficultClients ? `- 나에게 불편한, 또는 어려운 내담자: ${data.additionalInfo.difficultClients}` : ""}
${data.additionalInfo?.recentStress ? `- 나의 최근 스트레스: ${data.additionalInfo.recentStress}` : ""}

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
다음 구조로 상담자 교육을 위한 해석을 작성해주세요:

### 1. 전체적인 성격 프로필 (150-200자)
4가지 척도의 전반적인 패턴을 종합하여 검사 실시자(상담자)의 성격 특징을 요약해주세요.

### 2. 척도별 세부 해석 (각 척도당 100-150자)
각 척도별로 T점수와 실시자 정보를 고려한 구체적인 해석을 제공해주세요.

#### 마키아벨리즘
[해석]

#### 나르시시즘
[해석]

#### 사이코패시
[해석]

#### 사디즘
[해석]

### 3. 상담 관계에서의 시사점 (150-200자)
실시자의 성격 특성이 상담 관계와 치료적 접근에 어떤 영향을 미칠 수 있는지 설명해주세요. 특히 '잘 이해되는 내담자'와 '어려운 내담자' 정보를 고려하여 분석해주세요.

### 4. 자기 성찰과 발전 방향 (150-200자)
상담자로서 자기 인식과 전문성 발전을 위한 구체적인 제안을 해주세요. 최근 스트레스가 상담 수행에 미칠 수 있는 영향도 고려해주세요.

---

**중요**:
- 이것은 **상담자 자신을 위한 교육용 검사**입니다. 내담자가 아닌 상담자 본인의 성격 특성을 분석하는 것입니다.
- 진단적 표현은 지양하고, 자기 이해와 전문성 향상을 위한 통찰 중심으로 기술해주세요.
- 실시자가 제공한 정보(성격, 어린 시절 경험, 편한/어려운 내담자, 스트레스)를 최대한 활용하여 맥락화된 해석을 제공해주세요.
- 상담자의 강점을 인정하면서도 자기 성찰을 촉진하는 균형 잡힌 톤을 유지해주세요.
- 각 섹션의 제목은 그대로 유지하되, 내용만 작성해주세요.`;

  try {
    // Vercel 환경에서 fetch를 직접 사용
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API 응답 오류 (${response.status}): ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const textContent = data.content?.find((block: any) => block.type === "text");

    if (textContent && textContent.text) {
      return textContent.text;
    }

    throw new Error("AI 응답 형식 오류");
  } catch (error) {
    console.error("Claude API 오류:", error);
    // 더 자세한 에러 메시지 반환
    if (error instanceof Error) {
      throw new Error(`AI 해석 생성 중 오류: ${error.message}`);
    }
    throw new Error("AI 해석 생성 중 알 수 없는 오류가 발생했습니다.");
  }
}
