function SelectFilter({ isNextWeek, filters, setFilters }) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // 내일 날짜
  const minDate = tomorrow.toISOString().split("T")[0]; // YYYY-MM-DD 포맷 변환

  // 🔹 필터 변경 핸들러
  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: value,
    }));
  };
  return (
    <>
      <article className="where-filter-box">
        <div className="filter-group">
          <label htmlFor="dust">미세먼지 농도</label>
          <select id="dust" className="filter-select" value={filters.dust} onChange={handleFilterChange}>
            <option value="all">전체</option>
            <option value="good">좋음</option>
            <option value="normal">보통</option>
            <option value="bad">나쁨</option>
            <option value="very-bad">매우 나쁨</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="category">카테고리</label>
          <select id="category" className="filter-select"  value={filters.category} onChange={handleFilterChange}>
            <option value="all">전체</option>
            <option value="목욕장업소">목욕장업소</option>
            <option value="도로휴게시설">도로휴게시설</option>
            <option value="도시공원">도시공원</option>
            <option value="식품접객업소">식품접객업소</option>
            <option value="아동복지시설">아동복지시설</option>
            <option value="어린이집">어린이집</option>
            <option value="유치원">유치원</option>
            <option value="대규모점포">대규모점포</option>
            <option value="의료기관">의료기관</option>
            <option value="주택단지">주택단지</option>
            <option value="학교">학교</option>
            <option value="학원">학원</option>
            <option value="놀이제공영업소">놀이제공영업소</option>
            <option value="주상복합">주상복합</option>
            <option value="도서관">도서관</option>
            <option value="박물관">박물관</option>
            <option value="종교시설">종교시설</option>
            <option value="자연마을">자연마을</option>
            <option value="영화관">영화관</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="indoorOutdoor">실내/실외</label>
          <select id="indoorOutdoor" className="filter-select" value={filters.indoorOutdoor} onChange={handleFilterChange}>
            <option value="all">전체</option>
            <option value="실내">실내</option>
            <option value="실외">실외</option>
          </select>
        </div>
        {/* 다음주는 어때? 선택 시 날짜 필터 추가 */}
        {isNextWeek && (
          <div className="filter-group">
            <label htmlFor="date">기간</label>
            <input
              type="date"
              id="date"
              className="filter-select"
              min={minDate} // 내일부터 선택 가능
              value={filters.date}
              onChange={handleFilterChange}
            />
          </div>
        )}
      </article>
      {isNextWeek && (
        <div className="next-search-box">
          <div>
            <input
              type="search"
              id="next-week-search"
              placeholder="서울 장소를 검색하세요.."
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <span>*해당 예측은 서울만 검색이 가능합니다.</span>
        </div>
      )}
    </>
  );
}

export default SelectFilter;
