import { Question } from "./types";

// 다크 테트라드 검사 문항 (23문항)
// 각 영역에서 번갈아가면서 출제되도록 순서 섞기
export const questions: Question[] = [
  // Round 1
  {
    id: "dtmc1",
    scale: "mach",
    order: 1,
    text: "남에게 자신의 비밀을 알리는 것은 현명하지 못하다.",
  },
  {
    id: "dtnc1",
    scale: "narc",
    order: 2,
    text: "사람들은 나를 타고난 리더로 본다.",
  },
  {
    id: "dtps1",
    scale: "psyc",
    order: 3,
    text: "사람들은 종종 내가 통제 불능이라고 말한다.",
  },
  {
    id: "dtsd1",
    scale: "sadi",
    order: 4,
    text: "주먹다짐을 보는 것은 나를 흥분시킨다.",
  },

  // Round 2
  {
    id: "dtmc2",
    scale: "mach",
    order: 5,
    text: "무슨 수를 써서라도 중요한 사람들을 자기편으로 끌어들여야 한다.",
  },
  {
    id: "dtnc2",
    scale: "narc",
    order: 6,
    text: "나는 사람들을 설득하는 독특한 재능을 가지고 있다.",
  },
  {
    id: "dtps2",
    scale: "psyc",
    order: 7,
    text: "나는 권위와 그들의 규칙에 맞서 싸우는 경향이 있다.",
  },
  {
    id: "dtsd2",
    scale: "sadi",
    order: 8,
    text: "나는 격렬한 영화와 비디오 게임을 정말 즐긴다.",
  },

  // Round 3
  {
    id: "dtmc3",
    scale: "mach",
    order: 9,
    text: "나에게 도움이 될 수 있는 타인과의 직접적인 충돌은 피해야 한다.",
  },
  {
    id: "dtnc3",
    scale: "narc",
    order: 10,
    text: "내가 없으면 그룹 활동은 무미건조해지는 경향이 있다.",
  },
  {
    id: "dtps3",
    scale: "psyc",
    order: 11,
    text: "나는 나와 같은 성별과 연령의 사람들보다 많이 싸웠다.",
  },
  {
    id: "dtsd3",
    scale: "sadi",
    order: 12,
    text: "바보들이 실수 하는 걸 보면 재밌다.",
  },

  // Round 4
  {
    id: "dtmc4",
    scale: "mach",
    order: 13,
    text: "뜻대로 하기 위해서는 저자세를 취해야 한다.",
  },
  {
    id: "dtnc4",
    scale: "narc",
    order: 14,
    text: "언제나 사람들이 알아주기 때문에 내가 특별하다는 것을 안다.",
  },
  {
    id: "dtps5",
    scale: "psyc",
    order: 15,
    text: "그동안 법률문제로 골머리를 앓아왔다.",
  },
  {
    id: "dtsd5",
    scale: "sadi",
    order: 16,
    text: "나는 격렬한 스포츠를 즐겨 본다.",
  },

  // Round 5
  {
    id: "dtmc5",
    scale: "mach",
    order: 17,
    text: "상황을 조종하는 것은 계획을 세워야 한다.",
  },
  {
    id: "dtnc5",
    scale: "narc",
    order: 18,
    text: "나는 몇 가지 특출한 자질을 가지고 있다.",
  },
  {
    id: "dtps6",
    scale: "psyc",
    order: 19,
    text: "나는 가끔 위험한 상황에 빠진다.",
  },

  // Round 6
  {
    id: "dtmc6",
    scale: "mach",
    order: 20,
    text: "아첨은 타인을 내 편으로 만드는 좋은 방법이다.",
  },
  {
    id: "dtnc6",
    scale: "narc",
    order: 21,
    text: "나는 특정 분야에서 영향력 있는 사람이 될 것 같다.",
  },
  {
    id: "dtps7",
    scale: "psyc",
    order: 22,
    text: "나를 괴롭히는 사람들은 항상 후회한다.",
  },
  {
    id: "dtsd6",
    scale: "sadi",
    order: 23,
    text: "나는 SNS에서 단지 재미를 위해 나쁜 말을 했었다.",
  },
];

// 척도별 이름
export const scaleNames: Record<string, string> = {
  mach: "마키아벨리즘",
  narc: "나르시시즘",
  psyc: "사이코패시",
  sadi: "사디즘",
};

// 척도별 설명
export const scaleDescriptions: Record<string, string> = {
  mach: "타인을 조작하거나 전략적으로 이용하는 경향",
  narc: "자기중심적 성향과 과대한 자기상",
  psyc: "충동성과 낮은 공감 능력",
  sadi: "타인의 고통에서 즐거움을 느끼는 경향",
};

// 리커트 척도 옵션
export const likertOptions = [
  { value: 1, label: "전혀 아니다" },
  { value: 2, label: "아니다" },
  { value: 3, label: "보통이다" },
  { value: 4, label: "그렇다" },
  { value: 5, label: "매우 그렇다" },
];
