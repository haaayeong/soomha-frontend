import { useEffect, useRef } from "react";
import PlaceCard from "./PlaceCard";
import { handleHorizontalScroll } from "../../utils/wheelUtil";
import '../styles/MainGoodPlace.css'

function MainGoodPlace(){
  const mainPlaceCardsRef = useRef(null);

  useEffect(() => {
    const mainPlaceCards = mainPlaceCardsRef.current;

    const handleWheel = (event) => {
      handleHorizontalScroll(event, mainPlaceCardsRef);
    };

    mainPlaceCards.addEventListener('wheel', handleWheel);

    return () => {
      mainPlaceCards.removeEventListener('wheel', handleWheel);
    };
  }, []);


  return(
    <section className="main-good-place">
      <div className="main-place-top">
        <h2>오늘의 추천 장소</h2>
        <p></p>
      </div>
      <article className="main-place-cards" ref={mainPlaceCardsRef}>
        {[...Array(5)].map((_, index) => (
            <PlaceCard key={index} />
          ))}
      </article>
    </section>
  )
}

export default MainGoodPlace;