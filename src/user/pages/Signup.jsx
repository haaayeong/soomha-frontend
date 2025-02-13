import { useState } from "react";
import { isValidUsername, isValidPassword, isValidPasswordMatch, isValidNickname } from "../util/validation";
import EmailInput from "../components/EmailInput";
import RegionSelect from "../components/RegionSelect";
import '../style/Signup.css'
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [emailValid, setEmailValid] = useState(false); // 이메일 유효성
  const [emailAvailable, setEmailAvailable] = useState(null); // 이메일 중복 여부
  const [area, setArea] = useState("");
  const [role, setRole] = useState(""); // 가입 유형 상태 저장
  const [kindergarten, setKindergarten] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 에러 메세지 상태 관리
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nicknameError, setNicknameError] = useState("");

  const navigate = useNavigate();

  // 아이디 중복 확인
  const handleUsernameCheck = async () => {

    // 먼저 유효성 검사 확인
    const validationMessage = isValidUsername(username);
    if (validationMessage) {
      setUsernameError(validationMessage);  // 유효성 검사에서 오류가 있다면 바로 반환
      return;
    }
  
    try {
      const response = await fetch(`http://127.0.0.1:5000/crud/check-username?username=${username}`);
      const result = await response.json();
  
      if (response.ok) {
        setUsernameError("사용 가능한 아이디입니다.");
      } else {
        setUsernameError(result.error || "아이디 중복 확인 실패");
      }
    } catch (error) {
      console.error("Error : ", error);
      setUsernameError("아이디 중복 확인 중 오류가 발생했습니다.");
    }
  };

  // 닉네임 검사
  const handleNicknameChange = async (e) => {
    const nicknameValue = e.target.value;
    setNickname(nicknameValue);

    // 유효성 검사
    const validationMessage = isValidNickname(nicknameValue);
    setNicknameError(validationMessage);

    // 닉네임 중복 검사
    if (nicknameValue && !validationMessage) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/crud/check-nickname?nickname=${nicknameValue}`);
        const result = await response.json();

        if(response.ok) {
          setNicknameError("사용 가능한 닉네임입니다.");
        } else {
          setNicknameError(result.error || "닉네임 중복 확인 실패");
        }
      } catch (error) {
        console.error("Error : ", error);
        setNicknameError("닉네임 중복 확인 중 오류가 발생했습니다.");
      }
    }
  }

  // 비밀번호 확인 필드의 변경 시 유효성 검사 안함
  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);

    if (confirmPasswordValue !== password) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
  };

  // 입력값이 변경될 때 유효성 검사 실행(닉네임 제외)
  const handleChange = (setter, validator, setError) => (e) => {
    const value = e.target.value;
    setter(value);
    setError(validator(value));
  }

  // 가입 유형이 바뀔 때마다 세팅.
  const handleRolechange = (e) => {
    setRole(e.target.value);
  };


  // 회원가입 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (password.trim() !== confirmPassword.trim()) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      setLoading(false);
      return;
    }

    if(!emailValid || !emailAvailable) {
      alert("유효한 이메일을 입력하세요.");
      setLoading(false);
      return;
    }

    const userData = {
      username,
      password,
      confirmPassword,
      nickname,
      email,
      emailCode,
      role,
      area,
      // 선생님일 경우 유치원 이름 포함
      kindergarten: role === "teacher" ? kindergarten : undefined,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/crud/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const result = await response.json();

      if(response.ok) {
        alert("회원가입이 완료되었습니다.");
        navigate("/login")
      } else {
        if (Array.isArray(result.error)){
          result.error.forEach((err) => {
            if (err.includes("username")) setUsernameError(err);
            if (err.includes("password")) setPasswordError(err);
            if (err.includes("confirmPassword")) setConfirmPassword(err);
            if (err.includes("nickname")) setNicknameError(err);
          });
        } else {
          setError(result.error || "회원가입에 실패했습니다.");
        }
      }
    } catch(error) {
      console.error("Error : ", error);
      alert("회원가입 중 오류가 발생했습니다.")
    }
    setLoading(false);
  };

  return(
    <main>
      <Header />
      <div className="Signup">
        <div className="content-wrap">
          <h3>회원가입</h3>
          <div id="id">
            <p>아이디</p>
            <div className="input-container">
            <input
            type="text" 
            name="username"
            placeholder="아이디 입력(4~20자)"
            value={username}
            onChange={handleChange(setUsername, isValidUsername, setUsernameError)}
            required
            />
            <button id="id-check" onClick={handleUsernameCheck}>중복 확인</button>
            </div>
            {usernameError && <p className={usernameError.includes("사용 가능한") ? "valid" : "error"}>{usernameError}</p>}
          </div>

          <div id="password">
            <p>비밀번호</p>
            <input
            type="password"
            name="password"
            placeholder="비밀번호 입력(소문자, 숫자, 특수문자 포함 4~20자)"
            value={password}
            onChange={handleChange(setPassword, isValidPassword, setPasswordError)}
            required
            />
            {passwordError && <p className="error">{passwordError}</p>}
          </div>

          <div id="confirm-password">
            <p>비밀번호 확인</p>
            <input
            type="password" 
            name="confirmPassword" 
            placeholder="비밀번호 재입력"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            />
            {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
          </div>

          <div id="nickname">
            <p>닉네임</p>
            <input
            type="text"
            name="nickname"
            placeholder="닉네임 입력"
            value={nickname}
            onChange={handleNicknameChange}
            required
            />
            {nicknameError && <p className={nicknameError.includes("사용 가능한") ? "valid" : "error"}>{nicknameError}</p>}
          </div>

          <EmailInput setEmail={setEmail} setEmailCode={setEmailCode} setEmailValid={setEmailValid} setEmailAvailable={setEmailAvailable}/>

          <div id="role">
            <p>가입 유형</p>
            <select value={role} onChange={handleRolechange}>
              <option value="">가입 유형 선택</option>
              <option value="child">어린이</option>
              <option value="parent">학부모</option>
              <option value="teacher">선생님</option>
            </select>
          </div>

          {/* role이 'teacher'일 때만 소속 유치원 입력창 표시 */}
          {role === "teacher" && (
            <div id="kindergarten">
            <p>소속 유치원</p>
            <input 
            type="text"
            name="kindergarten"
            placeholder="소속 유치원 이름 입력"
            value={kindergarten}
            onChange={(e) => setKindergarten(e.target.value)}
            />
          </div>
          )} 

          <RegionSelect setArea={setArea}/>

          <button type="submit" disabled={loading} onClick={handleSubmit}>
            {loading ? "회원가입 중..." : "회원가입"}
          </button>
          {error && <p>{error}</p>}
        </div>
      </div>
      <Footer />
    </main>
  )

}

export default Signup;