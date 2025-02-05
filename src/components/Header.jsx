import WindowNav from "./WindowNav";
import LoginBtn from "./LoginBtn";
import MobileNav from "./MobileNav";

import '../styles/Header.css'
import '../styles/Header-media.css'


function Header(){
  return(
    <header>
      <div className="nav-left">
        <h1>숨하</h1>
        <WindowNav/>
      </div>
      <div className="nav-right">
        <div className="search-box">
          <input type="search" name="search" id="all-search" placeholder="장소를 검색하세요." />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <LoginBtn/>
      </div>
      <MobileNav/>
    </header>
  )
}

export default Header;