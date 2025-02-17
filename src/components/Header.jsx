import WindowNav from "./WindowNav";
import LoginBtn from "./LoginBtn";
import MobileNav from "./MobileNav";
import LoginState from "./LoginState";


import '../styles/Header.css'
import '../styles/Header-media.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


function Header(){
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // 토큰이 있으면 true, 없으면 false
  }, []);

  const handleNavigation = (path) => {
    navigate(path);  
  };

  return(
    <header>
      <div className="nav-left">
        <h1 onClick={()=>{handleNavigation('/')}}>숨하</h1>
        <WindowNav handleNavigation={handleNavigation}/>
      </div>
      <div className="nav-right">
        <div className="search-box">
          <input type="search" name="search" id="all-search" placeholder="장소를 검색하세요." />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>

        {/* 로그인 상태에 따라 컴포넌트 변경 */}
        {isLoggedIn ? <LoginState /> : <LoginBtn />}
        
      </div>
      
      <MobileNav handleNavigation={handleNavigation}/>
    </header>
  )
}

export default Header;