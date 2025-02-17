import { useEffect, useState } from 'react';
import '../styles/MobileNav.css'
import '../styles/MobileSidebar.css'
import LoginBtn from './LoginBtn';
import MobileState from './MobileState';


function MobileNav({handleNavigation}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // 로그인 상태를 로컬스토리지에서 확인하여 설정
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  },[]);

  // 로그아웃 후 상태 갱신 함수
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  return (
    <>
      <nav className='mobile-nav'>
        <ul className='hambuger' onClick={toggleSidebar}>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </nav>
      <div className={`mobile-sidebar mobile-nav ${isSidebarOpen ? 'open' : ''}`}>
        <i className="fa-solid fa-chevron-right" onClick={toggleSidebar}></i>
        <div className="mobile-sidebar-login">
          {/* 로그인 상태에 따라 컴포넌트 변경 */}
          {isLoggedIn ? <MobileState handleLogout={handleLogout}/> : <LoginBtn bool={true} /> }
        </div>
        <div className="mobile-nav-tab">
          <div className="user-info-content mobile-nav-content" onClick={()=>{handleNavigation('/whereToGo')}}>
            <i className="fa-solid fa-location-dot"></i>
            <span>어디갈까?</span>
          </div>
          <div className="user-info-content mobile-nav-content" onClick={()=>{handleNavigation('/quiz')}}>
            <i className="fa-solid fa-q"></i>
            <span>퀴즈</span></div>
          <div className="user-info-content mobile-nav-content" onClick={()=>{handleNavigation('/healthInfo')}}>
            <i className="fa-solid fa-person-running"></i>
            <span>건강정보</span>
          </div>
        </div>
        <div className="sidebar-weather">
          <span>서울</span>
          <p>
            <span>-5/ 6 도</span>
            <i className="fa-solid fa-sun"></i>
          </p>
        </div>
      </div>
    </>
  )
}

export default MobileNav;