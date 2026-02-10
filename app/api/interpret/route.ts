import { NextRequest, NextResponse } from "next/server";
import { generateInterpretation } from "@/lib/claude";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { age, gender, rawScores, tScores, percentiles, additionalInfo } =
      body;

    // 입력 검증
    if (!age || !gender || !rawScores || !tScores || !percentiles) {
      return NextResponse.json(
        { error: "필수 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    // Claude API 호출
    const interpretation = await generateInterpretation({
      age,
      gender,
      rawScores,
      tScores,
      percentiles,
      additionalInfo: additionalInfo || {},
    });

    return NextResponse.json({ interpretation });
  } catch (error) {
    console.error("API 오류:", error);
    return NextResponse.json(
      { error: "AI 해석 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
