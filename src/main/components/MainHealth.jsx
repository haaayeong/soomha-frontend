import { useEffect, useState } from 'react';

import '../styles/MainHealth.css'
import { getHealthWarningData } from '../../utils/getHealthWarning';  // 유틸 함수 임포트
import LoadingSpinner from '../../utils/LoadingSpinner';


function MainHealth({ pageHandler }) {
  const [healthData, setHealthData] = useState({
    rhinitis: null,
    asthma: null,
    atopy: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchHealthData = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const region = 7;  // 서울 예시
    const pm25 = 30;   // 예시 미세먼지 농도

    try {
      const data = await getHealthWarningData(0, region, 0, year, month, pm25);  // 남성, 0~6세 예시
      setHealthData({
        rhinitis: data.rhinitis,
        asthma: data.asthma,
        atopy: data.atopy,
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching health data:', error);
      setIsLoading(false);  // 에러 발생 시에도 로딩 끝
    }
  };

  useEffect(() => {
    fetchHealthData();
  }, []);  // 컴포넌트 마운트 시 한 번 호출

  return (
    <section className="main-health">
      <div className="main-place-top main-health-top">
        <h2>이번달 건강 예측 정보</h2>
        <p onClick={() => pageHandler('/healthInfo')}></p>
      </div>
      <article className="main-health-box">
        <div className="main-health-content">
          <p className="main-health-text-box">
            <span>이번달의<strong>"서울"</strong>미세먼지 농도를 기반으로 예상되는<span className='br'></span> 비염,천식,아토피 환자 수를 확인하세요.</span> <br />
            <small>과거 데이터를 분석하여 지역별·연령대별 건강 영향을 예측합니다.</small>
          </p>
          <div className="main-health-count-box">
            <div>
              <p>비염</p>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <p>{healthData.rhinitis ? `${healthData.rhinitis.toLocaleString()}명` : '데이터 없음'}</p>
              )}
            </div>
            <div>
              <p>천식</p>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <p>{healthData.asthma ? `${healthData.asthma.toLocaleString()}명` : '데이터 없음'}</p>
              )}
            </div>
            <div>
              <p>아토피</p>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <p>{healthData.atopy ? `${healthData.atopy.toLocaleString()}명` : '데이터 없음'}</p>
              )}
            </div>
          </div>
          <div className='main-health-warning'>
          이번달은 내 아이의 <span>"{healthData.rhinitis ? '비염' : healthData.asthma ? '천식' : healthData.atopy ? '아토피' : '예상 중'}"</span> 주의해 주세요.
          </div>
        </div>
      </article>
    </section>
  )
}


export default MainHealth;