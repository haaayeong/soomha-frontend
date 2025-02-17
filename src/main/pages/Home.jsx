import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../../utils/weatherUtils';
import axios from 'axios';


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


function Home() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);


  const pageHandler = (path) => {
    navigate(path)
  }

  // 한 번에 10개 랜덤 장소를 가져오는 함수
  const fetchRandomPlaces = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/place-cards?count=10');
      const placeData = response.data;
      const placesWithWeather = await Promise.all(
        placeData.map(async (place) => {
          const weather = await fetchWeatherData(place.latCrtsVl, place.lotCrtsVl);
          return { ...place, weather };
        })
      );

      setPlaces(placesWithWeather);
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  useEffect(() => {
    fetchRandomPlaces();
  }, []);

  return (
    <main>
      <Header />
      <MainVisual />
      <MainHealth pageHandler={pageHandler} />
      <MainGoodPlace pageHandler={pageHandler} places={places.slice(0, 5)} />
      <MainAllPlace pageHandler={pageHandler} places={places.slice(5, 10)} />
      <DustBoard pageHandler={pageHandler} />
      <MainQuiz pageHandler={pageHandler} />
      <Footer />
    </main>
  )
}

export default Home;