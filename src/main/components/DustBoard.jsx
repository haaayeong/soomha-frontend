import '../styles/DustBoard.css'

function DustBoard({pageHandler}){
  return(
    <div className="dust-board">
        <div className="dust-board-nav-box">
          <h2>지역별 미세먼지 현황</h2>
          <button onClick={()=>pageHandler('/whereToGo/region')}>자세히보기</button>
          <div className='dust-board-back'></div>
        </div>
    </div>
  )
}

export default DustBoard;