import { useEffect, useState } from 'react';
import '../styles/LoginState.css'
import { useNavigate } from 'react-router-dom';

function LoginState({ handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

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

  // 사용자 정보 로드
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await fetch("http://localhost:5000/auth/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error}`);
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error("사용자 정보 로드 오류:", error.message);
      }
    }

    fetchUserData();
  }, []);

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
        <div>로딩 중...</div> // 사용자 정보 로드 중일 때
      )}
    </div>
  )
}
export default LoginState;