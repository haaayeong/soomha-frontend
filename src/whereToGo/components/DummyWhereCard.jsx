
function DummyWhereCard({ isNextWeek }) {
  return (
    <article className="where-cards">
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="where-card" key={index} style={{ opacity: 0.7, pointerEvents: "none", backgroundColor: "#f9f9f9" }}>
          <div className="where-thumb" style={{ backgroundColor: "#e9e9e9",border:'none' }}>
          </div>
          <div className="where-card-info">
            <p className="card-title" style={{backgroundColor: "#e9e9e9"}}>&nbsp;</p>
            <p className="card-addr">&nbsp;</p>
            <div className="card-filter">
              <span style={{backgroundColor:'#d9d9d9'}}>&nbsp;</span>
              <span style={{backgroundColor:'#d9d9d9'}}>&nbsp;</span>
              <span style={{backgroundColor:'#d9d9d9'}}>&nbsp;</span>
            </div>

            <div className="card-weather-box">
              {!isNextWeek && (
                <>
                  <div className="card-weather card-weather-temp" style={{backgroundColor:'#d9d9d9'}}>
                    <p>&nbsp;</p>
                    <i></i>
                    <p>&nbsp;</p>
                  </div>
                  <div className="card-weather card-weather-precip" style={{backgroundColor:'#d9d9d9'}}>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                  </div>
                </>
              )}

              <div className="card-weather card-weather-dust" style={{backgroundColor:'#d9d9d9'}}>
                <div className="dust-index">
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                </div>
                <div className="dust-icon">
                  <p>&nbsp;</p>
                  <i></i>
                </div>
                <div className="dust-line" style={{backgroundColor:'#d9d9d9'}}>
                  
                </div>
              </div>
              <div className="card-weather card-weather-dust" style={{backgroundColor:'#d9d9d9'}}>
                <div className="dust-index">
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                </div>
                <div className="dust-icon">
                  <p>&nbsp;</p>
                  <i></i>
                </div>
                <div className="dust-line" style={{backgroundColor:'#d9d9d9'}}>

                </div>
              </div>
            </div>

            <div className="comment-like where-cl">
              <div className="main-comment-box">
                <i style={{backgroundColor:'#d9d9d9'}}></i>
                <span style={{backgroundColor:'#d9d9d9'}}>　　　</span>
              </div>
              <div className="main-like-box">
                <i style={{backgroundColor:'#d9d9d9'}}></i>
                <span style={{backgroundColor:'#d9d9d9'}}>　　　</span>
              </div>
            </div>

          </div>

        </div>
      ))}
    </article>
  );
}

export default DummyWhereCard;