import { useNavigate } from 'react-router-dom';
import '../styles/MobileState.css'

function MobileState({ handleLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
  }

  return (
    <div className="mobile-state">
      <div className="sidebar-user-info">
        <p>ROLE</p>
        <div className='login-state-nickname'>닉네임</div>
      </div>
      <div className='mobile-state-box mobile-state-tab'>
        <div className="user-info-content mobile-state-content">
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
    </div>
  )
}

export default MobileState;