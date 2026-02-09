import { Scale } from "./types";

/**
 * T점수 구간 정의 (5단계)
 */
export type TScoreLevel = "very_low" | "low" | "average" | "high" | "very_high";

/**
 * 성별 타입
 */
export type Gender = 1 | 2; // 1: 남성, 2: 여성

/**
 * 연령대 타입
 */
export type AgeGroup = "youth" | "young_adult" | "middle_age" | "senior";

/**
 * T점수로 수준 판단
 */
export function getTScoreLevel(tScore: number): TScoreLevel {
  if (tScore < 30) return "very_low";
  if (tScore < 40) return "low";
  if (tScore <= 60) return "average";
  if (tScore <= 70) return "high";
  return "very_high";
}

/**
 * 나이로 연령대 판단
 */
export function getAgeGroup(age: number): AgeGroup {
  if (age < 20) return "youth";
  if (age < 30) return "young_adult";
  if (age < 60) return "middle_age";
  return "senior";
}

/**
 * 연령대별 명칭
 */
export const ageGroupNames: Record<AgeGroup, string> = {
  youth: "청소년기",
  young_adult: "청년기",
  middle_age: "중년기",
  senior: "노년기",
};

/**
 * 척도별 T점수 수준별 일반 해석
 * 나이/성별을 고려한 맥락적 해석 제공
 */

// 마키아벨리즘 (Mach) 해석
export const machInterpretations: Record<
  TScoreLevel,
  { base: string; male: string; female: string; ageContext: Record<AgeGroup, string> }
> = {
  very_low: {
    base: "타인을 전략적으로 이용하거나 조작하는 경향이 매우 낮습니다. 대인관계에서 솔직하고 투명한 태도를 보이며, 정직과 신뢰를 중요시합니다.",
    male: "남성으로서 경쟁적 환경에서도 정직한 접근을 선호하며, 단기적 이득보다 장기적 신뢰 관계를 중시합니다.",
    female: "여성으로서 타인에 대한 공감과 배려가 높으며, 관계에서 진정성을 매우 중요하게 여깁니다.",
    ageContext: {
      youth: "이 시기에 형성된 정직한 가치관은 향후 대인관계의 튼튼한 기반이 됩니다.",
      young_adult: "사회 진출 초기 단계에서 정직한 태도는 장기적으로 신뢰받는 인재로 성장하는 데 도움이 됩니다.",
      middle_age: "조직과 관계에서 쌓아온 신뢰가 중요한 자산이 되는 시기입니다.",
      senior: "평생 유지해온 정직성과 진실성이 주변 사람들에게 존경받는 기반입니다.",
    },
  },
  low: {
    base: "타인을 조작하거나 이용하는 경향이 낮은 편입니다. 대체로 솔직하고 개방적인 태도로 관계를 맺으며, 전략적 계산보다는 진솔한 소통을 선호합니다.",
    male: "남성으로서 경쟁 상황에서도 공정한 방법을 중시하며, 수단과 방법을 가리지 않는 접근에 불편함을 느낍니다.",
    female: "여성으로서 관계에서 진심을 중시하며, 타인의 감정과 입장을 존중하는 태도를 보입니다.",
    ageContext: {
      youth: "진솔한 태도는 또래 관계에서 신뢰를 쌓는 기반이 됩니다.",
      young_adult: "직장과 사회생활에서 정직한 태도가 긍정적으로 평가될 수 있습니다.",
      middle_age: "쌓아온 신뢰가 리더십과 영향력의 원천이 되는 시기입니다.",
      senior: "진정성 있는 태도가 인생 경험과 결합하여 주변에 긍정적 영향을 줍니다.",
    },
  },
  average: {
    base: "상황에 따라 전략적 사고와 솔직한 태도를 적절히 조절할 수 있습니다. 필요시 영리하게 대처하되, 지나친 조작이나 기만은 피하는 균형잡힌 태도를 보입니다.",
    male: "남성으로서 경쟁과 협력 사이에서 상황에 맞는 전략을 구사할 수 있습니다.",
    female: "여성으로서 관계의 조화를 유지하면서도 필요시 자신의 이익을 적절히 추구할 수 있습니다.",
    ageContext: {
      youth: "사회적 기술을 배워가는 과정에서 적절한 균형감을 발달시키고 있습니다.",
      young_adult: "사회생활에서 필요한 전략적 사고와 진정성의 균형을 찾아가는 시기입니다.",
      middle_age: "경험을 바탕으로 상황에 맞는 유연한 대처가 가능한 시기입니다.",
      senior: "오랜 경험으로 상황에 맞는 지혜로운 판단이 가능합니다.",
    },
  },
  high: {
    base: "전략적이고 계산적인 사고 경향이 높은 편입니다. 목표 달성을 위해 타인을 설득하거나 상황을 조율하는 능력이 있으나, 과도한 경우 타인의 신뢰를 잃을 수 있습니다.",
    male: "남성으로서 경쟁 환경에서 전략적 우위를 추구하나, 관계의 진정성도 고려할 필요가 있습니다.",
    female: "여성으로서 영리한 대처 능력이 있으나, 지나친 계산은 관계에 부정적 영향을 줄 수 있습니다.",
    ageContext: {
      youth: "전략적 사고가 발달하는 시기로, 윤리적 기준도 함께 확립할 필요가 있습니다.",
      young_adult: "사회생활에서 전략적 접근이 유용하나, 장기적 신뢰 구축도 중요합니다.",
      middle_age: "전략적 능력과 관계의 진정성 사이의 균형을 재점검할 시기입니다.",
      senior: "오랜 경험상 전략과 진정성의 균형이 중요함을 인식할 필요가 있습니다.",
    },
  },
  very_high: {
    base: "타인을 조작하거나 이용하려는 경향이 매우 높습니다. 목표 달성을 위해 수단과 방법을 가리지 않을 수 있으며, 이는 장기적으로 신뢰 손상과 관계 단절을 초래할 위험이 있습니다.",
    male: "남성으로서 지나친 전략적 접근은 권력 지향적으로 보일 수 있으며, 진정한 협력 관계 형성에 어려움을 겪을 수 있습니다.",
    female: "여성으로서 과도한 조작적 태도는 주변의 경계심을 불러일으킬 수 있습니다.",
    ageContext: {
      youth: "이른 시기의 과도한 전략적 사고는 또래 관계에서 고립을 초래할 수 있습니다.",
      young_adult: "단기적 성과에 집중하다 장기적 신뢰를 잃을 위험이 있습니다.",
      middle_age: "관계의 질보다 이익을 우선시하는 패턴이 고착될 위험이 있습니다.",
      senior: "평생 쌓아온 관계 패턴을 재평가하고 진정성 회복이 필요한 시기입니다.",
    },
  },
};

// 나르시시즘 (Narc) 해석
export const narcInterpretations: Record<
  TScoreLevel,
  { base: string; male: string; female: string; ageContext: Record<AgeGroup, string> }
> = {
  very_low: {
    base: "자기 자신에 대한 평가가 낮거나 겸손한 편입니다. 자신의 능력을 과소평가할 수 있으며, 때로는 자신감 부족으로 기회를 놓칠 수 있습니다.",
    male: "남성으로서 자신의 능력과 가치를 더 인정하고 표현할 필요가 있습니다.",
    female: "여성으로서 겸손함이 미덕이 될 수 있으나, 자기 가치를 적절히 인식하는 것도 중요합니다.",
    ageContext: {
      youth: "자아 정체성 형성기에 긍정적 자아상 발달이 필요합니다.",
      young_adult: "사회 진출 시 자신의 강점을 적절히 표현하는 연습이 필요합니다.",
      middle_age: "축적된 경험과 능력에 대한 자신감 회복이 필요한 시기입니다.",
      senior: "인생 경험과 지혜에 대한 자긍심을 가질 필요가 있습니다.",
    },
  },
  low: {
    base: "자기 자신에 대한 평가가 겸손한 편입니다. 자신의 성취를 과시하지 않으며, 타인의 공헌을 인정하는 태도를 보입니다.",
    male: "남성으로서 겸손함이 장점이나, 필요시 자신의 능력을 적절히 드러낼 필요도 있습니다.",
    female: "여성으로서 타인을 배려하는 태도가 긍정적이나, 자신의 가치도 존중할 필요가 있습니다.",
    ageContext: {
      youth: "겸손한 태도는 좋으나, 자신감도 함께 키울 필요가 있습니다.",
      young_adult: "경력 개발 시 자신의 성과를 적절히 어필하는 것도 중요합니다.",
      middle_age: "쌓아온 성취에 대해 적절한 자긍심을 가질 수 있습니다.",
      senior: "인생의 성취를 인정하고 긍정적으로 평가할 수 있습니다.",
    },
  },
  average: {
    base: "자기 자신에 대한 평가가 균형잡혀 있습니다. 자신의 강점을 인식하되 과대평가하지 않으며, 타인의 피드백을 수용할 수 있습니다.",
    male: "남성으로서 자신감과 겸손함의 균형이 잘 잡혀 있습니다.",
    female: "여성으로서 자기 가치 인식과 타인 배려가 조화를 이룹니다.",
    ageContext: {
      youth: "건강한 자아상을 형성해가는 과정입니다.",
      young_adult: "사회생활에서 필요한 적절한 자신감을 갖추고 있습니다.",
      middle_age: "경험과 능력에 대한 현실적 평가가 가능합니다.",
      senior: "인생 경험을 바탕으로 균형잡힌 자아상을 유지하고 있습니다.",
    },
  },
  high: {
    base: "자기 자신에 대한 평가가 높은 편입니다. 자신의 능력과 가치를 강하게 인식하며, 주목받고 인정받기를 원합니다. 과도할 경우 타인과의 관계에서 어려움을 겪을 수 있습니다.",
    male: "남성으로서 강한 자신감은 리더십으로 발현될 수 있으나, 타인의 의견도 경청할 필요가 있습니다.",
    female: "여성으로서 자신감은 긍정적이나, 협력적 관계 유지에도 관심을 가질 필요가 있습니다.",
    ageContext: {
      youth: "자신감은 좋으나, 타인의 피드백을 수용하는 태도도 필요합니다.",
      young_adult: "자신감을 바탕으로 성과를 내되, 팀워크도 중요함을 인식해야 합니다.",
      middle_age: "성취에 대한 자신감과 겸손함의 균형을 점검할 시기입니다.",
      senior: "오랜 경험에서 나온 자신감을 지혜롭게 표현할 필요가 있습니다.",
    },
  },
  very_high: {
    base: "자기 자신에 대한 평가가 매우 높으며, 과대한 자기상을 가지고 있습니다. 끊임없이 주목과 찬사를 원하며, 비판에 민감하게 반응할 수 있습니다. 이는 대인관계에서 갈등을 유발할 수 있습니다.",
    male: "남성으로서 과도한 자기중심성은 협력 관계 형성에 큰 걸림돌이 됩니다.",
    female: "여성으로서 지나친 자기 과시는 주변과의 관계를 어렵게 만들 수 있습니다.",
    ageContext: {
      youth: "과대한 자아상은 또래 관계와 성장에 부정적 영향을 줄 수 있습니다.",
      young_adult: "팀워크와 협력이 중요한 시기에 자기중심성을 조절할 필요가 있습니다.",
      middle_age: "관계의 질을 위해 자기 인식을 재평가할 필요가 있습니다.",
      senior: "인생 경험을 바탕으로 겸손함을 배울 기회입니다.",
    },
  },
};

// 사이코패시 (Psyc) 해석
export const psycInterpretations: Record<
  TScoreLevel,
  { base: string; male: string; female: string; ageContext: Record<AgeGroup, string> }
> = {
  very_low: {
    base: "충동 조절이 매우 잘 되며, 규칙과 권위를 존중합니다. 신중하고 계획적으로 행동하며, 타인과의 충돌을 피하려고 노력합니다.",
    male: "남성으로서 안정적이고 책임감 있는 태도를 보입니다.",
    female: "여성으로서 조화롭고 질서를 중시하는 성향을 보입니다.",
    ageContext: {
      youth: "규칙을 잘 따르고 안정적인 생활 패턴을 보입니다.",
      young_adult: "사회생활에서 책임감 있고 신뢰받는 사람으로 인식됩니다.",
      middle_age: "안정적인 생활 태도가 사회적 신뢰의 기반이 됩니다.",
      senior: "평생 유지해온 절제력이 주변의 모범이 됩니다.",
    },
  },
  low: {
    base: "충동 조절이 잘 되는 편이며, 사회적 규범을 대체로 준수합니다. 갈등 상황에서도 이성적으로 대처하려 노력합니다.",
    male: "남성으로서 자제력과 책임감을 갖춘 모습을 보입니다.",
    female: "여성으로서 안정적이고 예측 가능한 행동 패턴을 보입니다.",
    ageContext: {
      youth: "자기 조절 능력이 발달하고 있는 긍정적 시기입니다.",
      young_adult: "사회생활에 필요한 자제력을 잘 갖추고 있습니다.",
      middle_age: "안정적인 생활 태도가 확립된 시기입니다.",
      senior: "절제력과 지혜가 조화를 이루는 시기입니다.",
    },
  },
  average: {
    base: "충동성과 자제력이 균형을 이룹니다. 대부분의 상황에서 적절히 행동하나, 스트레스 상황에서 가끔 충동적일 수 있습니다.",
    male: "남성으로서 일반적 수준의 충동 조절 능력을 보입니다.",
    female: "여성으로서 상황에 따라 감정과 이성의 균형을 유지합니다.",
    ageContext: {
      youth: "충동 조절 능력을 발달시켜가는 정상적 과정입니다.",
      young_adult: "사회생활에 필요한 기본적 자제력을 갖추고 있습니다.",
      middle_age: "경험을 통해 충동 조절 능력이 안정화되는 시기입니다.",
      senior: "인생 경험으로 대부분의 상황을 침착하게 다룰 수 있습니다.",
    },
  },
  high: {
    base: "충동성이 높고 자제력이 부족한 편입니다. 규칙에 저항하거나 위험한 행동을 할 수 있으며, 결과를 충분히 고려하지 않고 행동할 수 있습니다. 대인관계에서 갈등이 잦을 수 있습니다.",
    male: "남성으로서 충동적 행동이 법적, 사회적 문제로 이어질 수 있어 주의가 필요합니다.",
    female: "여성으로서 감정 조절의 어려움이 관계에 부정적 영향을 줄 수 있습니다.",
    ageContext: {
      youth: "충동 조절 능력 향상을 위한 개입이 필요한 시기입니다.",
      young_adult: "사회생활에서 자제력 부족이 문제가 될 수 있어 조절 훈련이 필요합니다.",
      middle_age: "지속된 충동성이 삶의 안정성을 해칠 수 있어 전문적 도움이 필요합니다.",
      senior: "오랜 행동 패턴을 개선하기 위한 노력이 필요합니다.",
    },
  },
  very_high: {
    base: "충동성이 매우 높고 자제력이 현저히 부족합니다. 권위와 규칙에 강하게 반발하며, 위험하고 반사회적 행동을 할 위험이 높습니다. 법적 문제나 대인관계 단절의 위험이 있어 전문가의 도움이 필요합니다.",
    male: "남성으로서 공격성과 충동성이 심각한 문제를 초래할 수 있어 즉각적 개입이 필요합니다.",
    female: "여성으로서 극심한 감정 조절 실패가 자신과 타인에게 해를 끼칠 수 있습니다.",
    ageContext: {
      youth: "조기 개입과 집중적 치료가 시급한 상황입니다.",
      young_adult: "반사회적 행동 패턴이 고착되기 전에 전문적 치료가 필수적입니다.",
      middle_age: "장기간 지속된 문제 행동에 대한 종합적 개입이 필요합니다.",
      senior: "평생의 행동 패턴이지만, 치료를 통한 개선 가능성은 여전히 존재합니다.",
    },
  },
};

// 사디즘 (Sadi) 해석
export const sadiInterpretations: Record<
  TScoreLevel,
  { base: string; male: string; female: string; ageContext: Record<AgeGroup, string> }
> = {
  very_low: {
    base: "타인의 고통이나 폭력에 대한 흥미가 전혀 없습니다. 공감 능력이 높으며, 타인의 아픔에 민감하게 반응합니다. 갈등과 폭력을 피하고 평화를 추구합니다.",
    male: "남성으로서 비폭력적이고 공감적인 태도를 보입니다.",
    female: "여성으로서 타인의 감정에 깊이 공감하고 배려하는 성향을 보입니다.",
    ageContext: {
      youth: "공감 능력과 친사회적 태도가 잘 발달하고 있습니다.",
      young_adult: "타인을 배려하는 성숙한 태도를 보입니다.",
      middle_age: "평화롭고 조화로운 관계를 중시하는 성향이 확립되어 있습니다.",
      senior: "평생 유지해온 공감과 배려가 주변에 긍정적 영향을 줍니다.",
    },
  },
  low: {
    base: "타인의 고통에서 즐거움을 느끼지 않으며, 폭력적 콘텐츠에 큰 관심이 없습니다. 대체로 공감적이고 친사회적인 태도를 보입니다.",
    male: "남성으로서 비공격적이고 평화적인 성향을 보입니다.",
    female: "여성으로서 타인의 감정을 존중하고 배려하는 태도를 보입니다.",
    ageContext: {
      youth: "건강한 공감 능력을 발달시키고 있습니다.",
      young_adult: "대인관계에서 배려심 있는 모습을 보입니다.",
      middle_age: "조화롭고 평화로운 관계를 유지하는 성향입니다.",
      senior: "삶의 경험을 통해 더욱 공감적이 되었습니다.",
    },
  },
  average: {
    base: "일반적인 수준의 자극 추구와 경쟁 선호를 보입니다. 격렬한 스포츠나 게임을 즐길 수 있으나, 타인에게 실제 해를 가하는 것은 원하지 않습니다.",
    male: "남성으로서 경쟁과 스릴을 즐기되, 타인을 해치지 않는 범위 내에서 행동합니다.",
    female: "여성으로서 적절한 수준의 자극 추구와 공감 능력을 균형있게 보입니다.",
    ageContext: {
      youth: "정상적인 수준의 경쟁심과 자극 추구를 보입니다.",
      young_adult: "사회적으로 용인되는 범위 내에서 자극을 추구합니다.",
      middle_age: "경험을 통해 적절한 자극 추구 방법을 알고 있습니다.",
      senior: "인생 경험으로 건전한 흥미 추구 방법을 터득했습니다.",
    },
  },
  high: {
    base: "타인의 고통이나 실수에서 즐거움을 느끼는 경향이 있습니다. 폭력적이거나 격렬한 콘텐츠를 선호하며, 때로 타인을 놀리거나 괴롭히는 행동을 할 수 있습니다. 이는 대인관계에 부정적 영향을 줄 수 있습니다.",
    male: "남성으로서 공격성이 높아 관계에서 갈등을 유발할 수 있습니다.",
    female: "여성으로서 관계적 공격성(험담, 따돌림 등)이 나타날 수 있습니다.",
    ageContext: {
      youth: "또래 괴롭힘 등의 문제 행동으로 이어질 수 있어 주의가 필요합니다.",
      young_adult: "직장이나 관계에서 공격적 행동이 문제가 될 수 있습니다.",
      middle_age: "타인에 대한 공감 능력 향상이 필요한 시기입니다.",
      senior: "오랜 행동 패턴을 재평가하고 공감 능력을 키울 필요가 있습니다.",
    },
  },
  very_high: {
    base: "타인의 고통에서 강한 즐거움을 느낍니다. 의도적으로 타인에게 고통을 주거나 굴욕감을 느끼게 하는 행동을 할 위험이 높습니다. 이는 심각한 대인관계 문제와 법적 문제를 초래할 수 있어 전문가의 도움이 필요합니다.",
    male: "남성으로서 신체적, 언어적 폭력 위험이 높아 즉각적 개입이 필요합니다.",
    female: "여성으로서 관계적 폭력(사이버 괴롭힘, 집단 따돌림 등) 위험이 높습니다.",
    ageContext: {
      youth: "심각한 괴롭힘 행동으로 이어질 수 있어 조기 개입이 시급합니다.",
      young_adult: "반사회적 행동 패턴이 고착되기 전에 치료가 필요합니다.",
      middle_age: "장기간의 가해 행동 패턴을 변화시키기 위한 전문적 치료가 필수적입니다.",
      senior: "평생의 행동 패턴이지만, 전문적 도움을 통한 변화 가능성은 있습니다.",
    },
  },
};

/**
 * 종합 해석 생성 함수
 */
export function generateGeneralInterpretation(
  scale: Scale,
  tScore: number,
  gender: Gender,
  age: number
): string {
  const level = getTScoreLevel(tScore);
  const ageGroup = getAgeGroup(age);
  const genderText = gender === 1 ? "male" : "female";

  let interpretation = "";

  // 척도별 해석 선택
  let scaleInterpretation;
  switch (scale) {
    case "mach":
      scaleInterpretation = machInterpretations[level];
      break;
    case "narc":
      scaleInterpretation = narcInterpretations[level];
      break;
    case "psyc":
      scaleInterpretation = psycInterpretations[level];
      break;
    case "sadi":
      scaleInterpretation = sadiInterpretations[level];
      break;
  }

  // 기본 해석
  interpretation += scaleInterpretation.base + "\n\n";

  // 성별 맥락
  interpretation += scaleInterpretation[genderText] + "\n\n";

  // 연령대 맥락
  interpretation += scaleInterpretation.ageContext[ageGroup];

  return interpretation;
}
