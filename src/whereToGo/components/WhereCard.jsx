import WhereCardInfo from './WhereCardInfo';

import '../styles/WhereCard.css'

function WhereCard({isNextWeek}) {
  return (
    <div className="where-card">
      <div className="where-thumb">
        <img src="/images/thumb.jpg" alt="" />
      </div>

      <WhereCardInfo isNextWeek={isNextWeek}/>

    </div>
  )
}


export default WhereCard;