import '../styles/Comment.css'

function Comment({ text, user, date, likes }) {
  return (
    <div className="comment">
      <div className="comment-top">
        <div className="comment-top-left">
          <span className="user-thumb"><img src="/images/user-common.png" alt="" /></span>
          {likes >= 10 ?
            <span className='best-label'>BEST</span>
            : ''
          }
          <span className='role-level-label'>선생님</span>
          <span className='user-nickname'>{user}</span>
          <span className="comment-date">{date}</span>
          <span className='comment-report'> <img src="/images/report.png" alt="" /></span>
        </div>
        <div className="comment-top-right">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
      </div>
      <div className='comment-text'>
        <span>{text}</span>
        <button>
          <span>추천</span>
          <span>{likes}</span>
        </button>
      </div>
    </div>
  )
}

export default Comment;