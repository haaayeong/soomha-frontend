import axios from 'axios';
import '../styles/HealthWarning.css'
import HealthDataTable from './HealthDataTable';
import { ManAllergy, WomanAllergy } from './ManAndWomanAllergy';
import { use, useEffect, useState } from 'react';
import LoadingSpinner from '../../utils/LoadingSpinner';
import { getHealthWarningData } from '../../utils/getHealthWarning'

function HealthWarning() {
  const [manData, setManData] = useState([]);
  const [womanData, setWomanData] = useState([]);
  const [mostPrevalentDisease, setMostPrevalentDisease] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const locationData = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const ageGroups = [0, 1, 2];
    const genders = [0, 1];
    let manResults = [];
    let womanResults = [];

    const promises = [];
    ageGroups.forEach((ageGroup) => {
      genders.forEach((gender) => {
        promises.push(
          getHealthWarningData(gender, 7, ageGroup, year, month, 30)  // pm25 값 예시
            .then((data) => {
              const prediction = {
                gender,
                ageGroup,
                rhinitis: data.rhinitis,
                asthma: data.asthma,
                atopy: data.atopy,
              };

              if (gender === 0) {
                manResults.push(prediction);
              } else {
                womanResults.push(prediction);
              }
            })
        );
      });
    });

    // 모든 요청이 완료된 후, 상태 업데이트
    Promise.all(promises).then(() => {
      const sortedManData = manResults.sort((a, b) => a.ageGroup - b.ageGroup);
      const sortedWomanData = womanResults.sort((a, b) => a.ageGroup - b.ageGroup);

      setManData(sortedManData);
      setWomanData(sortedWomanData);
      setIsLoading(false);  // 데이터가 다 받아졌으므로 로딩 완료
    });
  };

  const getMaxDisease = (data) => {
    const diseaseCounts = {
      rhinitis: data.rhinitis,
      asthma: data.asthma,
      atopy: data.atopy,
    };

    const maxDisease = Object.keys(diseaseCounts).reduce((a, b) =>
      diseaseCounts[a] > diseaseCounts[b] ? a : b
    );

    return maxDisease;
  };

  useEffect(() => {
    locationData();
  }, []);

  useEffect(() => {
    if (manData.length > 0) {
      const mostPrevalent = getMaxDisease(manData[0]);
      setMostPrevalentDisease(mostPrevalent);
    }
  }, [manData]);

  return (
    <section className="health-warning">
      <h3>이번달 건강 예측 정보</h3>
      <article className='today-health-warning main-health-box' >

        <div className="main-health-content">
          <p className="main-health-text-box">
            <span>이번달<strong>"서울"</strong>미세먼지 농도를 기반으로 예상되는<span className='br'></span> 비염,천식,아토피 환자 수를 확인하세요.</span> <br />
            <small>과거 데이터를 분석하여 지역별·연령대별 건강 영향을 예측합니다.</small>
          </p>

          <div className="main-health-count-box">
            <div>
              <p>비염</p>
              {isLoading ? (
                <LoadingSpinner /> // 로딩 스피너 표시
              ) : (
                <p>{manData.length > 0 && `${manData[0]?.rhinitis.toLocaleString()}명`}</p>
              )}
            </div>
            <div>
              <p>천식</p>
              {isLoading ? (
                <LoadingSpinner /> // 로딩 스피너 표시
              ) : (
                <p>{manData.length > 0 && `${manData[0]?.asthma.toLocaleString()}명`}</p>
              )}
            </div>
            <div>
              <p>아토피</p>
              {isLoading ? (
                <LoadingSpinner /> // 로딩 스피너 표시
              ) : (
                <p>{manData.length > 0 && `${manData[0]?.atopy.toLocaleString()}명`}</p>
              )}
            </div>
          </div>
          <div className='main-health-warning'>
            이번달 내 아이의 <span>"{mostPrevalentDisease === 'rhinitis' ? '비염' : mostPrevalentDisease === 'asthma' ? '천식' : mostPrevalentDisease === 'atopy' ? '아토피' : "예상중"}"</span> 주의해 주세요.
          </div>


        </div>
      </article>

      <h3>성별 / 나이별 환자 예측</h3>
      <article className="health-age-gender">
        <ManAllergy  manData={manData}/>
        <WomanAllergy womanData={womanData}/>
      </article>

      <h3>학습에 사용된 데이터</h3>
      <HealthDataTable />
    </section>
  )
}

export default HealthWarning;