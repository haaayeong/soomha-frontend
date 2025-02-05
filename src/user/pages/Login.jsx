import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return(
    <div className="login">
      <div className="title-wrap">
        <h2>로그인</h2>
      </div>

      <div className="content-wrap">
        <input type="text" name="username" placeholder="아이디를 입력하세요"/>
        <input type="text" name="password" placeholder="비밀번호를 입력하세요"/>
        <button>로그인</button>
        
        <div className="content-footer">
          <p>아직 회원이 아니신가요?</p>
          <p onClick={() => navigate('/signup')}>회원가입</p>
        </div>
      </div>

    </div>
  )
}

export default Login;