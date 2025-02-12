import WindowNav from "./WindowNav";
import LoginBtn from "./LoginBtn";
import MobileNav from "./MobileNav";
import LoginState from "./LoginState";


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

        {/* 로그인 안했을 때 */}
        <LoginBtn/>

        {/* 로그인 했을 때 */}
        {/* <LoginState/> */}
        
      </div>
      
      <MobileNav/>
    </header>
  )
}

export default Header;