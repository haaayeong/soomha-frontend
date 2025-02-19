// src/utils.js

export const getDustLevel = (pm) => {
  if (pm <= 30) return { level: '좋음', icon: 'fa-face-smile-beam', color: '#5c8cdd' };
  if (pm <= 80) return { level: '보통', icon: 'fa-face-smile', color: '#65b24b' };
  if (pm <= 150) return { level: '나쁨', icon: 'fa-face-sad-tear', color: '#e2d058' };
  if (pm <= 300) return { level: '매우나쁨', icon: 'fa-face-angry', color: '#ec7a7a' };
  return { level: '점검중', icon: 'fa-screwdriver-wrench', color: '#333' };
};

export const getUltraDustLevel = (pm) => {
  if (pm <= 15) return { level: '좋음', icon: 'fa-face-smile-beam', color: '#5c8cdd' };
  if (pm <= 35) return { level: '보통', icon: 'fa-face-smile', color: '#65b24b' };
  if (pm <= 75) return { level: '나쁨', icon: 'fa-face-sad-tear', color: '#e2d058' };
  if (pm <= 200) return { level: '매우나쁨', icon: 'fa-face-angry', color: '#ec7a7a' };
  return { level: '점검중', icon: 'fa-screwdriver-wrench', color: '#333' };
};

export const getDustBarWidth = (pm, maxValue) => {
  return (pm / maxValue) * 100; // 수치에 비례한 % 계산
};
