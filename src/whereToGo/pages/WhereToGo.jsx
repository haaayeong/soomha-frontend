
import { Outlet } from "react-router-dom";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SubNav from "../../components/SubNav";


import '../styles/WhereToGo.css'
import '../styles/WhereCard.css'
import '../styles/WhereMedia.css'


function WhereToGo() {
  return (
    <main className="where-to-go">
      <Header />
      <div className="ctrl-box">
        <SubNav />
        <Outlet/>
      </div>
      <Footer />
    </main>
  )
}

export default WhereToGo;