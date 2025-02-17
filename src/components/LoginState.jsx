import { useState } from 'react';
import '../styles/LoginState.css'
import { useNavigate } from 'react-router-dom';

function LoginState() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const toggleUserInfo = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="login-state">
      <p>ROLE</p>
      <div className='login-state-nickname' onClick={toggleUserInfo}>
        닉네임 님
        <i className={`fa-solid fa-chevron-down ${isOpen ? 'open' : ''}`}></i>
      </div>
      <div className={`user-info-box ${isOpen ? 'show' : ''}`}>
        <div className="user-info-content">
          <i className="fa-solid fa-pen-to-square"></i>
          <span>회원정보수정</span>
        </div>
        <div className="user-info-content">
          <i className="fa-regular fa-comment fa-flip-horizontal"></i>
          <span>내가 남긴 댓글</span></div>
        <div className="user-info-content" onClick={handleLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span>로그아웃</span>
        </div>
      </div>
    </div>
  )
}
export default LoginState;