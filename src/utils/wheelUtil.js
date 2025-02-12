export const handleHorizontalScroll = (event, ref) => {
  // 세로 스크롤 (deltaY)로 수평 스크롤 (scrollLeft)을 변경
  if (event.deltaY !== 0) {
    event.preventDefault(); // 기본 세로 스크롤 방지
    ref.current.scrollLeft += event.deltaY; // 수평 스크롤로 이동
  }
};
