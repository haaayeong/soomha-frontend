import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/SubNav.css';

function SubNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // 각 경로별로 표시할 항목들
  const navItems = [
    {
      path: '/whereToGo',
      items: [
        { title: '추천장소', path: '/whereToGo' },
        { title: '지역별 미세먼지', path: '/whereToGo/region' },
      ],
    },
    {
      path: '/quiz',
      items: [
        { title: '퀴즈', path: '/quiz' },
      ],
    },
    {
      path: '/healthInfo',
      items: [
        { title: '건강주의', path: '/healthInfo' },
        { title: '행동요령', path: '/healthInfo/actionGuidelines' },
      ],
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  // 현재 경로가 포함된 항목을 찾음
  const currentNavItems = navItems.find(nav => location.pathname.startsWith(nav.path))?.items || [];

  return (
    <div className="sub-nav">
      <ul>
        {currentNavItems.map((item) => (
          <li
            key={item.path}
            className={location.pathname === item.path ? 'active' : ''}
            onClick={() => handleNavigation(item.path)}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubNav;
