import { useState } from 'react';

function CommentInput({ onSubmitComment }) {
  const [commentText, setCommentText] = useState(''); // 댓글 입력 상태

  // 입력 값 변경 핸들러
  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  // 댓글 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로 고침 방지
    if (commentText.trim()) {  // 공백이 아닌 경우만 제출
      onSubmitComment(commentText);  // 부모 컴포넌트로 댓글 전달
      setCommentText('');  // 입력 필드 초기화
    }
  };
  // Enter 키로 댓글 제출
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {  // Enter 키, Shift 없이
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="comment comment-input">
      <div className="comment-top">
        <div className="comment-top-left">
          <span className="user-thumb">
            <img src="/images/user-common.png" alt="" />
          </span>
          <span className='role-level-label'>선생님</span>
          <span className='user-nickname'>햇님반어른이</span>
        </div>
      </div>

      <div className='comment-text'>
        {/* 댓글을 입력받을 수 있는 textarea */}
        <textarea
          className="comment-input"
          value={commentText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="이곳을 방문해보셨나요? 경험을 공유하거나 궁금한 점을 남겨주세요! 😊"
          rows="4"
          cols={90}
        />
        <button onClick={handleSubmit} className='comment-add'>
          등록
        </button>
      </div>
    </div>
  );
}

export default CommentInput;
