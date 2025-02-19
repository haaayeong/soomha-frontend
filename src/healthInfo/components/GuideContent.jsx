function GuideContent(){

  return(
    <article className="guide-content">
        <table className="guideline-table">
          <thead>
            <tr style={{ backgroundColor: '#ebeef2' }}>
              <th>등급</th>
              <th>미세먼지 [PM10]</th>
              <th>초미세먼지 (PM2.5)</th>
              <th>행동권장사항</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ backgroundColor: '#5c8cdd' }}>좋음</td>
              <td>0~30 미세먼지 단위</td>
              <td>0~15 초미세먼지 단위</td>
              <td>실외활동 자유롭게 가능</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: '#65b24b' }}>보통</td>
              <td>31~80 미세먼지 단위</td>
              <td>16~35 초미세먼지 단위</td>
              <td>장시간 야외활동 시 주의</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: '#e2d058' }}>나쁨</td>
              <td>81~150 미세먼지 단위</td>
              <td>36~75 초미세먼지 단위</td>
              <td>야외 활동 자제, 마스크 착용 권장</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: '#ec7a7a' }}>매우 나쁨</td>
              <td>151 이상 미세먼지 단위</td>
              <td>76 이상 초미세먼지 단위</td>
              <td>외출 자제, 건강 취약층은 실내 생활 권장</td>
            </tr>
          </tbody>
        </table>
      </article>
  )
}

export default GuideContent;