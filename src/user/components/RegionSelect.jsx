import { useState } from "react";
import regionsData from '../../data/regions.json';
import '../style/Signup.css';

function RegionSelect({ setArea }) {
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [cityOptions, setCityOptions] = useState([]);

  const handleProvinceChange = (e) => {
    // 시/도 선택
    const selectedProvince = e.target.value;
    setProvince(selectedProvince);

    // 해당 시/도에 맞는 시/군/구 리스트 추출
    setCityOptions(regionsData[selectedProvince] || []);
    setCity(''); // 새로 변경된 시/도에 맞춰 도시 초기화
    setArea(selectedProvince);
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    setArea(province + " " + selectedCity); // "시/도 시/군/구" 형식으로 저장
  };

  return (
    <div className="RegionSelect">
      <p>사는 지역</p>
      <div>
        <select value={province} onChange={handleProvinceChange}>
          <option value="">시도</option>
          {Object.keys(regionsData).map((province, index) => (
            <option key={index} value={province}>
              {province}
            </option>
          ))}
        </select>
  
        <select value={city} onChange={handleCityChange}>
          <option value="">시군구</option>
          {cityOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RegionSelect;