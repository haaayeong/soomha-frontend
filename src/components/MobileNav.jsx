import { useState } from 'react';
import '../styles/MobileNav.css'
import '../styles/MobileSidebar.css'
import LoginBtn from './LoginBtn';
import MobileState from './MobileState';


function MobileNav() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

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
          {/* 로그인 안했을때 */}
          {/* <LoginBtn bool={true} /> */}
          {/* 로그인했을때 */}
          <MobileState/>
        </div>
        <div className="mobile-nav-tab">
          <div className="user-info-content mobile-nav-content">
            <i className="fa-solid fa-location-dot"></i>
            <span>어디갈까?</span>
          </div>
          <div className="user-info-content mobile-nav-content">
            <i className="fa-solid fa-q"></i>
            <span>퀴즈</span></div>
          <div className="user-info-content mobile-nav-content">
            <i className="fa-solid fa-person-running"></i>
            <span>건강정보</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileNav;