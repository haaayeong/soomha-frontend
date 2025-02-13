import axios from "axios";

const API_KEY = "5CQeftawhDwl1cz9L0RxxMn8mjHETjXzCuHxHgteyt%2FvAK1i50baokozMpWbrG%2FEb2yMXkwSwn18uBEylgUk0g%3D%3D"; // 본인 API 키 사용

// 위도/경도 -> 격자 변환 함수
function latLonToGrid(lat, lon) {
  const RE = 6371.00877;
  const GRID = 5.0;
  const SLAT1 = 30.0;
  const SLAT2 = 60.0;
  const OLON = 126.0;
  const OLAT = 38.0;
  const XO = 43;
  const YO = 136;
  const DEGRAD = Math.PI / 180.0;
  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = re * sf / Math.pow(ro, sn);

  let ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
  ra = re * sf / Math.pow(ra, sn);
  let theta = lon * DEGRAD - olon;

  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= sn;

  let x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
  let y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

  return { nx: x, ny: y };
}

function getBaseTime() {
  const now = new Date();
  let hours = now.getHours();

  // 예보 발표시각에 맞는 base_time을 계산
  const baseTimes = [2, 5, 8, 11, 14, 17, 20, 23];
  
  // 현재 시간보다 과거 예보 시각으로 설정
  let closestBaseTime = baseTimes.reverse().find((time) => time <= hours);

  if (!closestBaseTime) {
    // 가장 가까운 base_time이 없으면, 그 이전 가장 마지막 값으로 설정
    closestBaseTime = baseTimes[baseTimes.length - 1];
  }

  return `${closestBaseTime.toString().padStart(2, '0')}00`; // 예시: 0200, 0500
}


// 날씨 상태 코드 -> 폰트어썸 아이콘 매핑
const weatherIcons = {
  1: "fa-solid fa-sun",       // 맑음
  2: "fa-solid fa-cloud-sun", // 구름 조금
  3: "fa-solid fa-cloud",      // 구름 많음
  4: "fa-solid fa-cloud-rain", // 흐림
  5: "fa-solid fa-cloud-showers-heavy", // 비
  6: "fa-solid fa-snowflake",  // 눈
  7: "fa-solid fa-bolt",       // 천둥번개
};

const fetchWeatherData = async (lat, lon) => {
  const { nx, ny } = latLonToGrid(lat, lon);
  const now = new Date();
  const base_date = now.toISOString().split("T")[0].replace(/-/g, "");
  const base_time = getBaseTime();
  console.log(base_time);

  const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?`
    + `serviceKey=${API_KEY}&dataType=JSON&numOfRows=300&pageNo=1`
    + `&base_date=${base_date}&base_time=${base_time}&nx=${nx}&ny=${ny}`;

  try {
    const response = await axios.get(url);

    // 응답 데이터 구조가 예상대로인지 확인
    if (!response.data || !response.data.response || !response.data.response.body) {
      throw new Error("API 응답 형식이 올바르지 않습니다.");
    }

    return parseWeatherData(response.data);
  } catch (error) {
    console.error("날씨 API 요청 실패:", error.message);
    return null;
  }
};


const parseWeatherData = (data) => {
  const items = data.response.body.items.item;

  let weatherInfo = {
    tempMin: null,
    tempMax: null,
    weatherState: null,
    icon: "fa-solid fa-question", // 기본값
    pop: null,
  };

  let tempValues = [];  // 기온 값을 저장할 배열

  items.forEach((item) => {
    // 기온(TMP) 카테고리 처리
    if (item.category === "TMP") {
      const temp = parseInt(item.fcstValue, 10);
      tempValues.push(temp);  // 기온값을 배열에 추가
    }

    // 날씨 상태(SKY) 처리
    if (item.category === "SKY") {
      const state = parseInt(item.fcstValue, 10);
      weatherInfo.weatherState = state;
      weatherInfo.icon = weatherIcons[state] || "fa-solid fa-question";  // 아이콘 설정
    }

    // 강수확률(POP) 처리
    if (item.category === "POP") {
      weatherInfo.pop = item.fcstValue + "%";  // 강수확률을 퍼센트로 반환
    }
  });

  // 최저/최고 기온 계산 (배열에서 최소값과 최대값을 구함)
  if (tempValues.length > 0) {
    weatherInfo.tempMin = Math.min(...tempValues);  // 최소 기온
    weatherInfo.tempMax = Math.max(...tempValues);  // 최고 기온
  } else {
    weatherInfo.tempMin = "정보 없음";
    weatherInfo.tempMax = "정보 없음";
  }

  // 강수확률 정보가 없을 경우 기본값 설정
  weatherInfo.pop = weatherInfo.pop || "정보 없음";

  return weatherInfo;
};

export { fetchWeatherData, latLonToGrid, weatherIcons };
