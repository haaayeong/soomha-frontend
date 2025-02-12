
import '../styles/WindowNav.css'

function WindowNav({handleNavigation}) {


  return (
    <nav className='window-nav'>
      <ul>
        <li onClick={() => handleNavigation('/whereToGo')}>어디갈까?</li> 
        <li onClick={() => handleNavigation('/quiz')}>퀴즈</li>
        <li onClick={() => handleNavigation('/healthInfo')}>건강정보</li>
      </ul>
    </nav>
  )
}

export default WindowNav;
