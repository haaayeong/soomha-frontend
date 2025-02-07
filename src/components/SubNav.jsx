import { useNavigate } from 'react-router-dom';
import '../styles/SubNav.css'
import { useState } from 'react';

function SubNav() {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  }

  return (
    <div className="sub-nav">
      <ul>
        <li
          className={isActive ? "" : "active"}
          onClick={() => {
            setIsActive(false);
            handleNavigation('/whereToGo')
          }}
        >
          추천장소
        </li>
        <li
          className={isActive ? "active" : ""}
          onClick={() => {
            setIsActive(true);
            handleNavigation('/whereToGo/region')
          }}
        >
          지역별 미세먼지
        </li>
      </ul>
    </div>
  )
}

export default SubNav;