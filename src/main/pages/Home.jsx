import '../../styles/common.css'

import Header from "../../components/Header";
import MainVisual from "../components/MainVisual";
import MainGoodPlace from '../components/MainGoodPlace';
import MainAllPlace from '../components/MainAllPlace';

import '../styles/Home.css'
import '../styles/Main-media.css'


function Home(){
  return(
    <main>
      <Header/>
      <MainVisual/>
      <MainGoodPlace/>
      <MainAllPlace/>
    </main>
  )
}

export default Home;