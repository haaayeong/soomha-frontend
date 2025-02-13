
function DummyCard({ bool }) {


  return (
    // 나중에 pageHandler 각 장소의 아이디로 변경
    <div className="place-card" onClick={() => pageHandler('/whereToGo/1')} style={{ backgroundColor: '#fafafa' }}>
      <div className="place-card-img-box" style={{ backgroundColor: '#f0f0f0' }}>
      </div>
      <h3 style={{ backgroundColor: '#f1f1f1',borderRadius:5 }}>　</h3>
      <div className="main-weather-box" >
        <div className="weather-box" style={{ backgroundColor: '#f0f0f0' }}>
          <div className="temp-box">
            <p style={{ backgroundColor: '#e1e1e1', borderRadius: 5 }}>　</p>
            <p style={{ backgroundColor: '#e1e1e1', borderRadius: 5, marginTop: 5 }}>　　　</p>
          </div>
          <i style={{ backgroundColor: '#e1e1e1', borderRadius: 5 }}>　</i>
        </div>
        <div className="weather-box" style={{ backgroundColor: '#f0f0f0' }}>
          <p style={{ backgroundColor: '#e1e1e1', borderRadius: 5 }}>　</p>
          <p style={{ backgroundColor: '#e1e1e1', borderRadius: 5, marginTop: 5 }}>　　　</p>
        </div>
      </div>

      {bool && (
        <div className="main-dust-box" >
          <div className="fine-dust-box" style={{ backgroundColor: '#f0f0f0'}}>
            <div className='dust-text-box' style={{ backgroundColor: '#e1e1e1', borderRadius: 5 }}>
              <p></p>
              <p></p>
            </div>
            <div className="dust-icon-box">
              <p></p>
              <p><i style={{ backgroundColor: '#e1e1e1'}}>　</i></p>
            </div>
            <div className="dust-line-box">
            </div>
          </div>
          <div className="ultra-fine-dust-box" style={{ backgroundColor: '#f0f0f0'}}>
            <div className='dust-text-box' style={{ backgroundColor: '#e1e1e1', borderRadius: 5 }}>
              <p></p>
              <p></p>
            </div>
            <div className="dust-icon-box">
              <p></p>
              <p><i style={{ backgroundColor: '#e1e1e1'}}>　</i></p>
            </div>
            <div className="dust-line-box">
            </div>
          </div>
        </div>
      )}

      <div className="comment-like">
        <div className="main-comment-box" style={{ backgroundColor: '#e1e1e1', borderRadius: 5 }}>
          <i >　</i>
          <span>　</span>
        </div>
        <div className="main-like-box" style={{ backgroundColor: '#e1e1e1', borderRadius: 5 }}>
          <i >　</i>
          <span>　</span>
        </div>
      </div>
    </div>
  )
}

export default DummyCard;