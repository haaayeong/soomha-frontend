import '../styles/LoginBtn.css'

function LoginBtn({bool}){
  return(
    <div className={`login-btn ${bool ? 'mobile-login-btn' : ''}`}>
      <button>로그인</button>
    </div>
  )
}

export default LoginBtn;