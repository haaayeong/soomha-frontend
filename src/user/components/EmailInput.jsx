import { useState, useEffect } from "react";
import { isValidEmail } from "../util/validation"; // 이메일 유효성 검사 함수
import '../style/Signup.css';

function EmailInput({ setEmail, setEmailCode, setEmailValid, setEmailAvailable, setVerificationButton }) {
  const [localPart, setLocalPart] = useState(""); // 이메일 아이디 부분
  const [domain, setDomain] = useState(""); // 이메일 도메인
  const [customDomain, setCustomDomain] = useState(""); // 사용자가 입력한 도메인
  const [isCustom, setIsCustom] = useState(false); // "직접 입력" 선택 여부
  const [emailError, setEmailError] = useState(""); // 이메일 유효성 검사
  const [emailCode, setLocalEmailCode] = useState(""); // 인증 코드 상태를 관리
  const [emailCodeError, setEmailCodeError] = useState("") // 인증 코드 유효성 검사
  const [message, setMessage] = useState(""); // 상태 메시지
  const [isEmailAvailable, setIsEmailAvailable] = useState(null); // 이메일 중복 여부 상태

  // 이메일 주소 업데이트 함수
  const handleEmailChange = () => {
    const fullEmail = `${localPart.trim()}@${isCustom ? customDomain.trim() : domain.trim()}`;
    setEmail(fullEmail.trim());
  };

  // 이메일 변경될 때 자동으로 업데이트
  useEffect(() => {
    handleEmailChange();
  }, [localPart, domain, customDomain, isCustom]);

  // 이메일 유효성 검사 및 중복 확인
  const checkEmail = async () => {
    const fullEmail = `${localPart}@${isCustom ? customDomain : domain}`;

    const validationMessage = isValidEmail(fullEmail);
    if (validationMessage !== "") {
      setEmailError(validationMessage);
      setIsEmailAvailable(null);
      setMessage("");
      setEmailValid(false);
      return;
    }

    // 이메일 유효성 검사 통과 후 중복 확인
    setEmailError("");
    setEmailValid(true); // 유효성 검사 통과시 부모 컴포넌트로 전달

    try {
      // 이메일 중복 확인 API 호출
      const response = await fetch(`http://localhost:5000/crud/check-email?email=${fullEmail}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.status === 500) {
        throw new Error("서버 오류");
      }

      if (result.isAvailable) {
        setIsEmailAvailable(true);
        setMessage(result.message);
        setEmailAvailable(true); // 중복 확인 후 사용 가능한 상태 부모 컴포넌트로 전달
      } else {
        setIsEmailAvailable(false);
        setMessage(result.error);
        setEmailAvailable(false); // 이미 사용 중인 이메일 상태 부모 컴포넌트로 전달
      }
    } catch (error) {
      console.error("이메일 중복 확인 중 오류 발생 : ", error);
      setMessage("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  // 인증메일 발송
  const sendEmailVerification = async () => {
    const fullEmail = `${localPart}@${isCustom ? customDomain : domain}`;

    try {
      const response = await fetch("http://localhost:5000/crud/send_email_code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email:fullEmail }),
        credentials: "include",
      })

      const data = await response.json();

      if (response.ok) {
        alert("인증 메일이 발송되었습니다!");
      } else {
        alert("이메일 발송 실패 : " + data.error);
        setIsEmailAvailable(false);
        setMessage(data.error);
      }
    } catch (error) {
      console.error("이메일 발송 중 오류 발생 : ", error);
      setEmailError("서버 오류로 인해 이메일을 보낼 수 없습니다.")
    }
  }

  const handleEmailCodeChange = (e) => {
    setLocalEmailCode(e.target.value); // 입력된 인증 번호를 상태에 저장
    setEmailCode(e.target.value); // 부모 컴포넌트의 상태로 전달
  };

  // 인증번호 확인
  const handleCodeVerification = async () => {
    if (emailCode.length !== 6) {
      setEmailCodeError("인증번호는 6자리여야 합니다.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/crud/verify_email_code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailCode: emailCode }),
        credentials: "include",
      });

      const result = await response.json();
      if (response.ok) {
        setEmailValid(true);
        setVerificationButton(true);
        setEmailCodeError("인증 성공!");
        console.log(emailCode);
      } else {
        setEmailValid(false);
        setVerificationButton(false);
        setEmailCodeError(result.error || "인증번호가 틀렸습니다.");
      }
    } catch (error) {
      console.error("Error : ", error);
      setEmailCodeError("인증번호 확인 중 오류가 발생했습니다.");
    }
  };


  // 이메일 입력 변경 시마다 유효성 검사와 중복 확인 수행
  useEffect(() => {
    if(localPart && (isCustom ? customDomain : domain)) {
      const timer = setTimeout(() => {
        checkEmail();
      }, 500);

      return () => clearTimeout(timer);
    }

  }, [localPart, domain, customDomain, isCustom]);

  return (
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
            placeholder="이메일 아이디"
            id="email-id"
            required
          />
          @
          <input
            type="text"
            value={isCustom ? customDomain : domain}
            onChange={(e) => {
              if (isCustom) {
                setCustomDomain(e.target.value);
              } else {
                setDomain(e.target.value);
              }
              handleEmailChange();
            }}
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
        
        {/* 유효성 검사 및 중복 확인 메시지 표시 */}
        {emailError && <p className="error">{emailError}</p>}
        {message && (
          <p className={isEmailAvailable ? "valid" : "error"}>{message}</p>
        )}
        <button onClick={sendEmailVerification}>인증메일 발송</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="인증번호 입력"
          value={emailCode}
          onChange={handleEmailCodeChange}
        />
        {emailCodeError && <p className={emailCodeError.includes("인증 성공!") ? "valid" : "error"}>{emailCodeError}</p>}
        <button id="check" onClick={handleCodeVerification}>확인</button>
      </div>
    </div>
  );
}

export default EmailInput;
