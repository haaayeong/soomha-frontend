import React, { useState } from "react";
import axios from "axios";

function InsertDB() {
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const [message, setMessage] = useState(""); // 메시지 상태 관리

  const handleButtonClick = async () => {
    try {
      // 요청 시작: 버튼 비활성화, 메시지 초기화
      setIsLoading(true);
      setMessage("");

      // Flask API 호출
      const response = await axios.get('http://localhost:5000/api/insertDB');
      console.log("데이터 호출 성공", response.data);

      // 요청 성공 시 메시지 업데이트
      setMessage("데이터 삽입 완료!");
    } catch (error) {
      console.error("API 호출 실패:", error.response ? error.response.data : error.message);

      // 요청 실패 시 메시지 업데이트
      setMessage("데이터 삽입 실패!");
    } finally {
      // 요청 완료 후 버튼을 다시 활성화
      setIsLoading(false);
    }
  };

  const dustTest = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/place-dust');
      console.log("데이터 호출 성공", response.data.items);  // 수정된 부분: response.data.items로 접근
    } catch (error) {
      console.error("API 호출 실패:", error.response ? error.response.data : error.message);
    }
  };

    return (
      <div style={{ width: '500px', height: '500px', margin: 'auto' }}>
        <button
          style={{ width: '100%', height: 100, marginTop: 50 }}
          onClick={handleButtonClick}
          disabled={isLoading} // 로딩 중이면 버튼 비활성화
        >
          {isLoading ? "데이터 삽입 중..." : "장소 데이터 삽입"}
        </button>

        {message && (
          <div style={{ marginTop: 20, fontSize: '18px', fontWeight: 'bold' }}>
            {message}
          </div>
        )}

        <button onClick={dustTest} style={{marginTop: 50}}>
          미세먼지 호출 테스트
        </button>
      </div>
    );
  }

  export default InsertDB;
