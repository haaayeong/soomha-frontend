import { useState } from "react";
import EmailInput from "../components/EmailInput";
import RegionSelect from "../components/RegionSelect";
import '../style/Signup.css'

function Signup() {
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [role, setRole] = useState(""); // 가입 유형 상태 저장

  const handleRolechange = (e) => {
    setRole(e.target.value);
  }

  return(
    <div className="Signup">
      <div className="content-wrap">
        <h3>회원가입</h3>
        <div id="id">
          <p>아이디</p>
          <div className="input-container">
          <input
          type="text" 
          name="username"
          placeholder="아이디 입력(6~20자)"
          />
          <button id="id-check">중복 확인</button>
          </div>
        </div>

        <div id="password">
          <p>비밀번호</p>
          <input
          type="password"
          name="password"
          placeholder="비밀번호 입력(소문자, 숫자, 특수문자 포함 6~20자)"
          />
        </div>

        <div id="confirm-password">
          <p>비밀번호 확인</p>
          <input
          type="password" 
          name="confirmPassword" 
          placeholder="비밀번호 재입력"
          />
        </div>

        <div id="nickname">
          <p>닉네임</p>
          <input
          type="text"
          name="nickname"
          placeholder="닉네임 입력" 
          />
        </div>

        <EmailInput setEmail={setEmail}/>

        <div id="role">
          <p>가입 유형</p>
          <select value={role} onChange={handleRolechange}>
            <option value="">가입 유형 선택</option>
            <option value="child">어린이</option>
            <option value="parent">학부모</option>
            <option value="teacher">선생님</option>
          </select>
        </div>

        {/* role이 'teacher'일 때만 소속 유치원 입력창 표시 */}
        {role === "teacher" && (
          <div id="kindergarten">
          <p>소속 유치원</p>
          <input 
          type="text"
          name="kindergarten"
          placeholder="소속 유치원 이름 입력" />
        </div>
        )} 

        <RegionSelect setArea={setArea}/>

        <button>회원가입</button>

      </div>
    </div>
  )

}

export default Signup;