import '../../styles/common.css'

import Header from "../../components/Header";
import MainVisual from "../components/MainVisual";
import '../styles/Home.css'

import '../styles/Main-media.css'
import MainGoodPlace from '../components/MainGoodPlace';


function Home(){
  return(
    <main>
      <Header/>
      <MainVisual/>
      <MainGoodPlace/>
    </main>
  )
}

export default Home;