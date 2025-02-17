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
import { useQuery } from '@tanstack/react-query';

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

    return placesWithWeather;
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
};


function Home() {
  const navigate = useNavigate();

  const pageHandler = (path) => {
    navigate(path)
  }
  // useQuery 사용 시 객체 형식으로 호출 (v5 이상에서는 반드시 객체 형식)
  const { data: places = [] } = useQuery({
    queryKey: ['places'],  // 쿼리 키는 배열이지만 객체 안에서 사용
    queryFn: fetchRandomPlaces,  // 데이터를 가져올 함수
    staleTime: 1000 * 60 * 5,  // 5분 동안 데이터 캐시 유지
    cacheTime: 1000 * 60 * 10, // 10분 동안 캐시 유지
  });



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