import WhereCardInfo from './WhereCardInfo';
import usePageHandler from "../../utils/usePageHandler";


function WhereCard({isNextWeek}) {
  const pageHandler = usePageHandler();
  
  return (
    <div className="where-card" onClick={()=>pageHandler('1')}>
      <div className="where-thumb">
        <img src="/images/thumb.jpg" alt="" />
      </div>

      <WhereCardInfo isNextWeek={isNextWeek}/>

    </div>
  )
}


export default WhereCard;