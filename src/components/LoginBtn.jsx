import { useNavigate } from 'react-router-dom';
import '../styles/LoginBtn.css'

function LoginBtn({bool}){
  const navigate = useNavigate()

  return(
    <div className={`login-btn ${bool ? 'mobile-login-btn' : ''}`}>
      <button onClick={() => navigate('/login')}>로그인</button>
    </div>
  )
}

export default LoginBtn;