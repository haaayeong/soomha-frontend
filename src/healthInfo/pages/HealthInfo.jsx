import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SubNav from '../../components/SubNav';
import HealthWarning from '../components/HealthWarning';
import '../styles/healthInfo.css'


function HealthInfo() {
  return (
    <main className="health-info">
      <Header />
      <div className="ctrl-box">
        <SubNav />
        <Outlet/>
      </div>
      <Footer />
    </main>
  )
}

export default HealthInfo;