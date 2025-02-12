import axios from "axios";

const KAKAO_API_KEY = '4007f233ac9ef230c1805573cdf02722';

const searchAddress = async (query) => {
  try {
    const response = await axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
      params: {
        query, // 검색할 주소
      },
    });

    const data = response.data;
    if (data && data.documents.length > 0) {
      const { x, y } = data.documents[0]; // API 결과에서 x(경도), y(위도) 가져오기
      return {
        lat: parseFloat(y), // 위도
        lng: parseFloat(x), // 경도
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('주소 검색 실패:', error);
    return null;
  }
};

const createMap = (lat, lng) => {
  if (!window.kakao || !window.kakao.maps) return;

  const container = document.getElementById('detail-map');
  if (!container) return;

  const options = {
    center: new kakao.maps.LatLng(lat, lng), // 검색된 주소의 좌표로 지도 중심 설정
    level: 3,
  };

  // 지도 객체 생성
  const map = new kakao.maps.Map(container, options);

  // 마커 생성
  const markerPosition = new kakao.maps.LatLng(lat, lng);  // 마커 좌표
  const marker = new kakao.maps.Marker({
    position: markerPosition,
  });
  marker.setMap(map);  // 마커를 지도에 표시
};

// 사용 예시: 주소를 보내면 지도를 생성
const setupMap = async (address) => {
  const coordinates = await searchAddress(address);
  if (coordinates) {
    createMap(coordinates.lat, coordinates.lng);
  } else {
    console.error('위치를 찾을 수 없습니다.');
  }
};

export { setupMap };
