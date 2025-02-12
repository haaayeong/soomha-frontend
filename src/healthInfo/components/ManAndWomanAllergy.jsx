import React from 'react';
import AllergyData from './AllergyData';

// 남자 데이터를 예시로 설정
const manData = [
  {
    ageRange: "0~6세",
    allergyTypes: [
      { name: "비염", count: 10 },
      { name: "천식", count: 8 },
      { name: "아토피", count: 5 },
    ],
  },
  {
    ageRange: "6~11세",
    allergyTypes: [
      { name: "비염", count: 12 },
      { name: "천식", count: 9 },
      { name: "아토피", count: 7 },
    ],
  },
  {
    ageRange: "12~17세",
    allergyTypes: [
      { name: "비염", count: 15 },
      { name: "천식", count: 10 },
      { name: "아토피", count: 6 },
    ],
  },
];

// 여자 데이터를 예시로 설정
const womanData = [
  {
    ageRange: "0~6세",
    allergyTypes: [
      { name: "비염", count: 8 },
      { name: "천식", count: 5 },
      { name: "아토피", count: 4 },
    ],
  },
  {
    ageRange: "6~11세",
    allergyTypes: [
      { name: "비염", count: 10 },
      { name: "천식", count: 6 },
      { name: "아토피", count: 5 },
    ],
  },
  {
    ageRange: "12~17세",
    allergyTypes: [
      { name: "비염", count: 13 },
      { name: "천식", count: 7 },
      { name: "아토피", count: 6 },
    ],
  },
];

function ManAllergy() {
  return <AllergyData gender="man" data={manData} />;
}

function WomanAllergy() {
  return <AllergyData gender="woman" data={womanData} />;
}

export { ManAllergy, WomanAllergy };
