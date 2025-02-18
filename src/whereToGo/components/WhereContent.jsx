import { useEffect, useState } from "react";
import SelectFilter from "./SelectFilter";
import WhereCard from "./WhereCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchWeatherData } from "../../utils/weatherUtils"; // 날씨 정보를 가져오는 유틸리티 함수

function WhereContent() {
  const [isNextWeek, setIsNextWeek] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0); // 페이지네이션을 위한 offset 상태

  // 데이터 로딩 함수
  const loadMoreData = async () => {
    if (loading) return; // 이미 로딩 중이면 중복 요청 방지
    setLoading(true);

    try {
      const count = 10; // 한 번에 가져올 데이터 수
      const response = await fetch(`http://localhost:5000/api/place-cards-scroll?count=${count}&offset=${offset}`);
      const data = await response.json();

      if (data.length > 0) {
        // 각 장소에 대해 날씨 정보를 추가
        const placesWithWeather = await Promise.all(
          data.map(async (place) => {
            const weather = await fetchWeatherData(place.latCrtsVl, place.lotCrtsVl);
            return { ...place, weather }; // 날씨 정보 추가
          })
        );

        setItems((prevItems) => [...prevItems, ...placesWithWeather]); // 기존 데이터에 새로운 데이터 추가
        setOffset((prevOffset) => prevOffset + count); // offset 갱신
      } else {
        setHasMore(false); // 데이터가 더 이상 없으면 hasMore를 false로 설정
      }
    } catch (error) {
      console.error("데이터 로딩 중 오류 발생:", error);
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  // isNextWeek 값이 바뀔 때마다 items 초기화하고 데이터 로딩
  useEffect(() => {
    setItems([]); // isNextWeek가 바뀔 때마다 기존 items를 초기화
    setOffset(0); // offset도 초기화
    setHasMore(true); // 더 이상 데이터가 없으면 false로 설정
    loadMoreData(); // 새로운 데이터 로딩
  }, [isNextWeek]);

  return (
    <section className="where-content">
      <article className="where-tab">
        <button
          className={isNextWeek ? "" : "active"}
          onClick={() => setIsNextWeek(false)}
        >
          전체보기
        </button>
        <button
          className={isNextWeek ? "active" : ""}
          onClick={() => setIsNextWeek(true)}
        >
          다음주는 어때?
        </button>
      </article>

      <SelectFilter isNextWeek={isNextWeek} />

      <InfiniteScroll
        dataLength={items.length} // 현재 로딩된 항목 개수
        next={loadMoreData} // 더 많은 데이터를 로드하는 함수
        hasMore={hasMore} // 더 이상 로드할 데이터가 있는지 여부
        loader={<h4>Loading...</h4>} // 로딩 중 표시
        endMessage={<p>No more items to show</p>} // 끝에 도달했을 때 표시
      >
        <article className="where-cards">
          {items.map((item) => (
            <WhereCard key={item.id} place={item} isNextWeek={item.isNextWeek} />
          ))}
        </article>
      </InfiniteScroll>
    </section>
  );
}

export default WhereContent;
