import '../../styles/common.css'

import Header from "../../components/Header";
import MainVisual from "../components/MainVisual";
import MainGoodPlace from '../components/MainGoodPlace';
import MainAllPlace from '../components/MainAllPlace';
import DustBoard from '../components/DustBoard';

import '../styles/Home.css'
import '../styles/Main-media.css'


function Home(){
  return(
    <main>
      <Header/>
      <MainVisual/>
      <MainGoodPlace/>
      <MainAllPlace/>
      <DustBoard/>
    </main>
  )
}

export default Home;