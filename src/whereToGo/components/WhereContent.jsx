import { useEffect, useState } from "react";
import SelectFilter from "./SelectFilter";
import WhereCard from "./WhereCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchWeatherData } from "../../utils/weatherUtils"; // 날씨 정보를 가져오는 유틸리티 함수
import DummyWhereCard from "./DummyWhereCard";

function WhereContent() {
  const [isNextWeek, setIsNextWeek] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0); // 페이지네이션을 위한 offset 상태

  // 🔹 필터 상태 추가
  const [filters, setFilters] = useState({
    dust: "all",
    category: "all",
    indoorOutdoor: "all",
    date: "", // 다음 주 날짜 필터 (isNextWeek가 true일 때만 사용)
  });

  // 배치 크기 설정
  const BATCH_SIZE = 5; // 한 번에 처리할 데이터 개수

  // 데이터 로딩 함수
  const loadMoreData = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const count = 10;

      // ✅ 필터를 API 요청에 추가
      const queryParams = new URLSearchParams({
        count,
        offset,
        dust: filters.dust,
        category: filters.category,
        indoorOutdoor: filters.indoorOutdoor,
        date: filters.date,
        isNextWeek,
      }).toString();

      const response = await fetch(`http://localhost:5000/api/place-cards-scroll?${queryParams}`);
      const data = await response.json();

      if (data.length > 0) {
        // 배치 단위로 날씨 데이터 요청
        const batches = [];
        for (let i = 0; i < data.length; i += BATCH_SIZE) {
          const batch = data.slice(i, i + BATCH_SIZE); // 현재 배치 단위로 자르기
          batches.push(batch.map((place) => fetchWeatherData(place.latCrtsVl, place.lotCrtsVl)));
        }

        // 모든 배치가 완료되면 상태 업데이트
        const weatherData = await Promise.all(batches.map(batch => Promise.all(batch)));
        const placesWithWeather = data.map((place, index) => ({
          ...place,
          weather: weatherData.flat()[index], // 날씨 정보 병합
        }));

        setItems((prevItems) => [...prevItems, ...placesWithWeather]);
        setOffset((prevOffset) => prevOffset + count);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("데이터 로딩 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ 필터나 isNextWeek 변경 시 데이터 초기화 후 다시 로드
  useEffect(() => {
    setItems([]);
    setOffset(0);
    setHasMore(true);
    loadMoreData();
  }, [isNextWeek, filters]); // 필터 값이 바뀌면 다시 로드


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

      <SelectFilter isNextWeek={isNextWeek} filters={filters} setFilters={setFilters} />

      <InfiniteScroll
        dataLength={items.length} // 현재 로딩된 항목 개수
        next={loadMoreData} // 더 많은 데이터를 로드하는 함수
        hasMore={hasMore} // 더 이상 로드할 데이터가 있는지 여부
        loader={<DummyWhereCard isNextWeek={isNextWeek} />
        } // 로딩 중 표시
        endMessage={<p className="no-items-message">조회된 항목이 없습니다.</p>}
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
