import { useEffect, useRef } from "react";
import { handleHorizontalScroll } from "../../utils/wheelUtil";
import '../styles/MainAllPlace.css'
import PlaceCard from "./PlaceCard";

function MainAllPlace({pageHandler}){
  const bool = true;
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
    <section className="main-all-place">
      <div className="main-place-top">
        <h2>자녀와 함께놀기</h2>
        <p onClick={()=>pageHandler('/whereToGo')}></p>
      </div>
      <article className="main-place-cards" ref={mainPlaceCardsRef}>
        {[...Array(5)].map((_, index) => (
            <PlaceCard key={index} bool={bool} pageHandler={pageHandler} />
          ))}
      </article>
    </section>
  )
}

export default MainAllPlace;