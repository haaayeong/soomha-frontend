import { useState } from "react";
import { MapContainer, TileLayer, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import '../styles/DustByRegion.css';

function DustByRegion() {
  const [dustType, setDustType] = useState("미세먼지");

  // 팝업이 겹치지 않도록 좌표를 미세하게 조정한 데이터
  const regions = [
    { name: "서울", lat: 37.0645, lon: 126.9750, dust: 10, ultrafine: 15 },
    { name: "부산", lat: 34.6740, lon: 129.0660, dust: 60, ultrafine: 30 },
    { name: "대구", lat: 35.7140, lon: 128.5230, dust: 55, ultrafine: 28 },
    { name: "인천", lat: 37.0415, lon: 126.0145, dust: 50, ultrafine: 25 },
    { name: "광주", lat: 35.0370, lon: 127.0510, dust: 47, ultrafine: 23 },
    { name: "대전", lat: 35.7605, lon: 127.5780, dust: 65, ultrafine: 32 },
    { name: "울산", lat: 35.5020, lon: 129.7690, dust: 76, ultrafine: 22 },
    { name: "세종", lat: 36.2800, lon: 126.9970, dust: '점검', ultrafine: 22 },
    { name: "경기", lat: 37.1845, lon: 127.8915, dust: 10, ultrafine: 35 },
    { name: "강원", lat: 37.1285, lon: 129.0120, dust: 40, ultrafine: 20 },
    { name: "충북", lat: 36.6220, lon: 127.8845, dust: 55, ultrafine: 27 },
    { name: "충남", lat: 36.2680, lon: 125.9420, dust: 60, ultrafine: 30 },
    { name: "전북", lat: 35.7140, lon: 126.5710, dust: 38, ultrafine: 19 },
    { name: "전남", lat: 34.7070, lon: 126.1940, dust: 41, ultrafine: 21 },
    { name: "경북", lat: 36.2495, lon: 129.2215, dust: 48, ultrafine: 24 },
    { name: "경남", lat: 35.2085, lon: 128.3975, dust: 52, ultrafine: 26 },
    { name: "제주", lat: 33.0280, lon: 126.5245, dust: 30, ultrafine: 18 },
  ];

  // 미세먼지 색상 결정 함수
  const getPopupColor = (value) => {
    if (value <= 15) return "#5c8cdd"; // 좋음: 파랑 계열
    if (value <= 35) return "#65b24b"; // 보통: 초록 계열
    if (value <= 75) return "#e2d058"; // 나쁨: 노랑 계열
    if (value >= 75) return "#ec7a7a";
    return "#717b84";
  };

  return (
    <section className="dust-by-region where-content">
      <div className="dust-map-container">
        <div className="map-wrapper">
          <MapContainer
            center={[36.5, 128]} // 한국 중심 위치
            zoom={7}
            style={{ width: "100%", height: "100%" }}
            className="map-container"
            scrollWheelZoom={false} // 마우스 휠 확대 금지
            dragging={false} // 지도 드래그 금지
            zoomControl={false} // 확대/축소 버튼 제거
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {regions.map((region, index) => (
              <Popup
                key={index}
                position={[region.lat, region.lon]}
                autoClose={false}
                closeOnClick={false}
                closeButton={false}
                className="custom-popup"
              >
                <div
                  style={{
                    backgroundColor: getPopupColor(dustType === "미세먼지" ? region.dust : region.ultrafine),
                    padding: "6px 5px",
                    borderRadius: "8px",
                    color: "#fff",
                    width: "100%"
                  }}
                >
                  <strong>{region.name}</strong>
                  <p>{dustType === "미세먼지" ? `${region.dust} µg/m³` : `${region.ultrafine} µg/m³`}</p>
                </div>
              </Popup>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* 미세먼지 및 초미세먼지 버튼과 표 */}
      <div className="dust-info-table">
        <div className="dust-buttons">
          <button
            className={dustType === "미세먼지" ? "active" : ""}
            onClick={() => setDustType("미세먼지")}
          >
            미세먼지
          </button>
          <button
            className={dustType === "초미세먼지" ? "active" : ""}
            onClick={() => setDustType("초미세먼지")}
          >
            초미세먼지
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>등급</th>
              <th>지수범위</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ backgroundColor: "#5c8cdd" }}>좋음</td>
              <td>0~15</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: "#65b24b" }}>보통</td>
              <td>16~35</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: "#e2d058" }}>나쁨</td>
              <td>36~75</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: "#ec7a7a" }}>매우 나쁨</td>
              <td>76~</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: "#717b84" }}>점검중</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default DustByRegion;
