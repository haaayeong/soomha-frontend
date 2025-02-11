
import { Outlet, useLocation } from "react-router-dom";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SubNav from "../../components/SubNav";


import '../styles/WhereToGo.css'
import '../styles/WhereCard.css'
import '../styles/WhereMedia.css'


function WhereToGo() {
  const location = useLocation();
  const isDetailPage = /^\/whereToGo\/\d+$/.test(location.pathname);

  return (
    <main className="where-to-go">
      <Header />
      <div className="ctrl-box">
        {!isDetailPage && <SubNav />}
        <Outlet/>
      </div>
      <Footer />
    </main>
  )
}

export default WhereToGo;