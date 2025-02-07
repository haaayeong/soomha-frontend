function SelectFilter() {
  return (
    <article className="where-filter-box">
      <div className="filter-group">
        <label htmlFor="dust">미세먼지 농도</label>
        <select id="dust" className="filter-select">
          <option value="all">전체</option>
          <option value="good">좋음</option>
          <option value="normal">보통</option>
          <option value="bad">나쁨</option>
          <option value="very-bad">매우 나쁨</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="category">카테고리</label>
        <select id="category" className="filter-select">
          <option value="all">전체</option>
          <option value="bathhouse">목욕장업소</option>
          <option value="rest-area">도로휴게시설</option>
          <option value="park">도시공원</option>
          <option value="restaurant">식품접객업소</option>
          <option value="child-welfare">아동복지시설</option>
          <option value="daycare">어린이집</option>
          <option value="kindergarten">유치원</option>
          <option value="mall">대규모점포</option>
          <option value="hospital">의료기관</option>
          <option value="residential">주택단지</option>
          <option value="school">학교</option>
          <option value="academy">학원</option>
          <option value="playground">놀이제공영업소</option>
          <option value="mixed-building">주상복합</option>
          <option value="library">도서관</option>
          <option value="museum">박물관</option>
          <option value="religious">종교시설</option>
          <option value="village">자연마을</option>
          <option value="cinema">영화관</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="indoor-outdoor">실내/실외</label>
        <select id="indoor-outdoor" className="filter-select">
          <option value="all">전체</option>
          <option value="indoor">실내</option>
          <option value="outdoor">실외</option>
        </select>
      </div>
    </article>
  );
}

export default SelectFilter;
