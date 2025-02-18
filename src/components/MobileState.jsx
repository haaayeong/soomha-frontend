import { useNavigate } from 'react-router-dom';
import '../styles/MobileState.css'
import { useEffect, useState } from 'react';
import { useUser } from '../user/util/UserContext';

function MobileState({ handleLogout }) {
  const { userInfo, loading } = useUser();

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
  }

  const handleUserInfo = () => {
    navigate("/userInfo");
  }


  return (
    <div className="mobile-state">
      {userInfo ? (
        <>
          <div className="sidebar-user-info">
            <p>{userInfo.role === 'CHILD' ? userInfo.level : userInfo.role}</p>
            <div className='login-state-nickname'>{userInfo.nickname} 님</div>
          </div>
          <div className='mobile-state-box mobile-state-tab'>
            <div className="user-info-content mobile-state-content" onClick={handleUserInfo}>
              <i className="fa-solid fa-pen-to-square"></i>
              <span>회원정보수정</span>
            </div>
            <div className="user-info-content mobile-state-content">
              <i className="fa-regular fa-comment fa-flip-horizontal"></i>
              <span>내가 남긴 댓글</span></div>
            <div className="user-info-content mobile-state-content" onClick={handleLogoutClick}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <span>로그아웃</span>
            </div>
          </div>
        </>
      ) : (
        <div>로딩 중...</div> // 사용자 정보 로드 중일 때
      )}
    </div>
  )
}

export default MobileState;