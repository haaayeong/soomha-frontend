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

    // 배치 크기 설정
    const BATCH_SIZE = 5; // 한 번에 처리할 데이터 개수

    // 배치 단위로 날씨 데이터 요청
    const batches = [];
    for (let i = 0; i < placeData.length; i += BATCH_SIZE) {
      const batch = placeData.slice(i, i + BATCH_SIZE); // 현재 배치 단위로 자르기
      batches.push(batch.map((place) => fetchWeatherData(place.latCrtsVl, place.lotCrtsVl)));
    }

    // 모든 배치가 완료되면 상태 업데이트
    const weatherData = await Promise.all(batches.map(batch => Promise.all(batch)));
    const placesWithWeather = placeData.map((place, index) => ({
      ...place,
      weather: weatherData.flat()[index], // 날씨 정보 병합
    }));

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
    staleTime: 10000 * 60 * 5,  // 5분 동안 데이터 캐시 유지
    cacheTime: 10000 * 60 * 10, // 10분 동안 캐시 유지
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