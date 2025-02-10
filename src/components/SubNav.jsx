import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/SubNav.css'
import { useState } from 'react';

function SubNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  }

  return (
    <div className="sub-nav">
      <ul>
        <li
            className={location.pathname === "/whereToGo" ? "active" : ""}
          onClick={() => {
            handleNavigation('/whereToGo')
          }}
        >
          추천장소
        </li>
        <li
          className={location.pathname === "/whereToGo/region" ? "active" : ""}
          onClick={() => {
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