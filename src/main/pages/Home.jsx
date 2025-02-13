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
import { useState } from 'react';
import axios from 'axios';


function Home() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);

  const pageHandler = (path) => {
    navigate(path)
  }

  console.log('front')
  // 한 번에 10개 랜덤 장소를 가져오는 함수
  const fetchRandomPlaces = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/place-cards?count=10');
      console.log('랜덤 시설 리스트:', response.data);
      setPlaces(response.data);  // 받은 데이터를 상태에 저장
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  useEffect(() => {
    fetchRandomPlaces();
  }, []);

  // places가 없으면 로딩 상태를 표시
  if (!places.length) {
    return <div>로딩 중...</div>;
  }

  return (
    <main>
      <Header />
      <MainVisual />
      <MainGoodPlace pageHandler={pageHandler} places={places.slice(0, 5)} />
      <MainAllPlace pageHandler={pageHandler} places={places.slice(5, 10)} />
      <DustBoard pageHandler={pageHandler} />
      <MainHealth pageHandler={pageHandler} />
      <MainQuiz pageHandler={pageHandler} />
      <Footer />
    </main>
  )
}

export default Home;