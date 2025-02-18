import { useEffect, useState } from 'react';
import '../styles/LoginState.css'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../user/util/UserContext';

function LoginState({ handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo, loading } = useUser();

  const navigate = useNavigate();

  const toggleUserInfo = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
  }

  const handleUserInfo = () => {
    navigate("/userInfo");
  }

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="login-state">
      {userInfo ? (
        <>
          <p>{userInfo.role === 'CHILD' ? userInfo.level : userInfo.role}</p>
          <div className='login-state-nickname' onClick={toggleUserInfo}>
            {userInfo.nickname} 님
            <i className={`fa-solid fa-chevron-down ${isOpen ? 'open' : ''}`}></i>
          </div>
          <div className={`user-info-box ${isOpen ? 'show' : ''}`}>
            <div className="user-info-content" onClick={handleUserInfo}>
              <i className="fa-solid fa-pen-to-square"></i>
              <span>회원정보수정</span>
            </div>
            <div className="user-info-content">
              <i className="fa-regular fa-comment fa-flip-horizontal"></i>
              <span>내가 남긴 댓글</span></div>
            <div className="user-info-content" onClick={handleLogoutClick}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <span>로그아웃</span>
            </div>
          </div>
        </>
      ) : (
        <div>로그인 필요</div> // 사용자 정보 로드 중일 때
      )}
    </div>
  )
}
export default LoginState;