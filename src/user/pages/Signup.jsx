import { useState } from "react";
import { isValidUsername, isValidPassword, isValidPasswordMatch, isValidNickname } from "../util/validation";
import EmailInput from "../components/EmailInput";
import RegionSelect from "../components/RegionSelect";
import '../style/Signup.css'
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
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

  // 입력값이 변경될 때 유효성 검사 실행
  const handleChange = (setter, validator, setError) => (e) => {
    const value = e.target.value;
    setter(value);
    setError(validator(value));
  }

  // 가입 유형이 바뀔 때마다 세팅.
  const handleRolechange = (e) => {
    setRole(e.target.value);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      const response = await fetch('/crud/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const result = await response.json();

      if(response.ok) {
        alert(result.message);
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
      alert("회원가입에 실패했습니다.")
    }
    setLoading(false);
  };

  return(
    <div className="Signup">
      <div className="content-wrap">
        <form onSubmit={handleSubmit}>
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
            <button id="id-check">중복 확인</button>
            </div>
            {usernameError && <p className="error">{usernameError}</p>}
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
            onChange={handleChange(setConfirmPassword, isValidPasswordMatch, setConfirmPasswordError)}
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
            onChange={handleChange(setNickname, isValidNickname, setNicknameError)}
            required
            />
          </div>

          <EmailInput setEmail={setEmail} setEmailcode={setEmailCode} />

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

          <button type="submit" disabled={loading}>
            {loading ? "회원가입 중..." : "회원가입"}
          </button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  )

}

export default Signup;