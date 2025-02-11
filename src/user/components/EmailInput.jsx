import { useState } from "react";
import { isValidEmail } from "../util/validation";
import '../style/Signup.css';

function EmailInput({ setEmail, setEmailCode }) {
  const [ localPart, setLocalPart ] = useState(""); // 이메일의 아이디 부분 저장
  const [ domain, setDomain ] = useState(""); // 선택한 도메인
  const [ customDomain, setCustomDomain ] = useState(""); // 사용자가 직접 입력한 도메인
  const [ isCustom, setIsCustom ] = useState(false); // "직접 입력" 선택 여부
  const [ emailError, setEmailError ] = useState("");
  const [ emailCode, setLocalEmailCode ] = useState("");
  const [ message, setMessage ] = useState(""); // 상태 메세지

  // 이메일 주소 업데이트 함수
  const handleEmailChange = () => {
    const fullEmail = `${localPart}@${isCustom ? customDomain : domain}`;
    setEmail(fullEmail);
  };

  // 이메일 유효성 검사
  const handleEmailBlur = () => {
    const fullmail = `${localPart}@${isCustom ? customDomain : domain}`;
    setEmailError(isValidEmail(fullemail));
  }

  return(
    <div className="EmailInput">
      <div id="Email">
        <p>이메일</p>
        <div className="input-container">
          <input
          type="text"
          value={localPart}
          onChange={(e) => {
            setLocalPart(e.target.value);
            handleEmailChange();
          }}
          onBlur={handleEmailBlur}
          placeholder="이메일 아이디"
          id="email-id"
          required
          />
          @
          <input
            type="text"
            value={domain}
            onChange={(e) => {
              setDomain(e.target.value);
              handleEmailChange();
            }}
            onBlur={handleEmailBlur}
            required
            disabled={!isCustom} // 직접 입력을 선택하면 활성화, 아니면 비활성화
          />
          <select
            onChange={(e) => {
              setIsCustom(e.target.value === "custom");
              setDomain(e.target.value === "custom" ? "" : e.target.value);
              handleEmailChange();
            }}
            id="email-select"
            value={isCustom ? "custom" : domain}
          >
            <option value="">선택</option>
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="daum.net">daum.net</option>
            <option value="custom">직접 입력</option>
          </select>
          
        </div>
          {emailError && <p className="error">{emailError}</p>}
          <button>인증메일 발송</button>
      </div>
      <div>
        <input
        type="text"
        placeholder="인증번호 입력"
        value={emailCode}
        onChange={(e) => {
          setLocalEmailCode(e.target.value);
          setEmailCode(e.target.value);
        }}
        />
        <button id="check">확인</button>
      </div>
    </div>
  )
}

export default EmailInput;