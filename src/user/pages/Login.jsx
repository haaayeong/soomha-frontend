import { useNavigate } from "react-router-dom";
import "../style/Login.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { isValidLogin } from "../util/validation";
import axios from "axios";
import { useState } from "react";
import { useUser } from "../util/UserContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUserInfo } = useUser();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // 유효성 검사
    const validationError = isValidLogin(username, password);
    if (validationError) {
      setError(validationError);
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });
  
      // 토큰 저장
      const token = response.data.token;
      localStorage.setItem("token", token);
  
      // 🔹 로그인 성공 후, 유저 정보 요청해서 UserContext 업데이트
      const userResponse = await axios.get("http://localhost:5000/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setUserInfo(userResponse.data); // 🔥 UserContext 업데이트
  
      alert("로그인 성공!");
      navigate("/");
    } catch (err) {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  // 엔터 키로 로그인 처리
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <main>
      <Header />
      <div className="login">
        <div className="content-wrap">
          <h3>로그인</h3>
          <input
           type="text" 
           name="username" 
           placeholder="아이디를 입력하세요" 
           value={username} 
           onChange={(e) => setUsername(e.target.value)}
           onKeyDown={handleKeyDown}
          />

          <input
           type="password" 
           name="password" 
           placeholder="비밀번호를 입력하세요"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           onKeyDown={handleKeyDown}
          />
          {error && <p className="error">{error}</p>}
          <button onClick={handleLogin}>로그인</button>

          <div className="content-footer">
            <p>아직 회원이 아니신가요?</p>
            <p onClick={() => navigate('/signup')}>회원가입</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default Login;