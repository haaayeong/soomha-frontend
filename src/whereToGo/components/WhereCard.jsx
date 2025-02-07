import WhereCardInfo from './WhereCardInfo';

import '../styles/WhereCard.css'

function WhereCard() {
  return (
    <div className="where-card">
      <div className="where-thumb">
        <img src="/images/thumb.jpg" alt="" />
      </div>

      <WhereCardInfo />

    </div>
  )
}


export default WhereCard;