import '../styles/HealthDataTable.css';

function HealthDataTable() {
  return (
    <div className="table-container">
      <table className="health-data-table">
        <thead>
          <tr>
            <th rowSpan="2">날짜</th>
            <th rowSpan="2">미세먼지 및 온도 등</th>
            <th rowSpan="2">해당지역</th>
            <th rowSpan="2">성별</th>
            <th rowSpan="2">나이</th>
            <th colSpan="3">진료 환자 수</th>
          </tr>
          <tr>
            <th>비염</th>
            <th>천식</th>
            <th>아토피</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan="6" colSpan="2">
              2018년~2023년 중 <br/>
              오늘날짜에 해당하는 데이터
            </td>
            <td rowSpan="6">내 지역에 해당하는 시/군/구</td>
            <td rowSpan="3" className='table-white'>남</td>
            <td>0~5세</td>
            <td rowSpan="6" colSpan="3">해당 날짜의 병원 방문 환자 수</td>
          </tr>
          <tr>
            <td>6~11세</td>
          </tr>
          <tr>
            <td>12~17세</td>
          </tr>
          <tr>
            <td rowSpan="3" className='table-white'>여</td>
            <td>0~5세</td>
          </tr>
          <tr>
            <td>6~11세</td>
          </tr>
          <tr>
            <td>12~17세</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default HealthDataTable;
