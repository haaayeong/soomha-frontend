import WhereCardInfo from './WhereCardInfo';
import usePageHandler from "../../utils/usePageHandler";


function WhereCard({isNextWeek, place}) {
  const pageHandler = usePageHandler();
  return (
    <div className="where-card" onClick={()=>pageHandler(`/whereToGo/${place.id}`)}>
      <div className="where-thumb">
        <img src={place.thumbnail} alt="" loading='lazy'/>
      </div>

      <WhereCardInfo isNextWeek={isNextWeek} place={place}/>

    </div>
  )
}


export default WhereCard;