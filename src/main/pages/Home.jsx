import '../../styles/common.css'

import Header from "../../components/Header";
import MainVisual from "../components/MainVisual";
import MainGoodPlace from '../components/MainGoodPlace';
import MainAllPlace from '../components/MainAllPlace';
import DustBoard from '../components/DustBoard';
import MainHealth from '../components/MainHealth';
import MainQuiz from '../components/MainQuiz';
import Footer from '../../components/Footer';


import '../styles/Home.css'
import '../styles/Main-media.css'
import { useNavigate } from 'react-router-dom';


function Home(){
  const navigate = useNavigate();
  const pageHandler = (path) =>{
    navigate(path)
  }
  return(
    <main>
      <Header/>
      <MainVisual/>
      <MainGoodPlace pageHandler={pageHandler}/>
      <MainAllPlace pageHandler={pageHandler}/>
      <DustBoard pageHandler={pageHandler}/>
      <MainHealth pageHandler={pageHandler}/>
      <MainQuiz pageHandler={pageHandler}/>
      <Footer/>
    </main>
  )
}

export default Home;