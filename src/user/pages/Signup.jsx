import { useState } from "react";
import EmailInput from "../components/EmailInput";
import RegionSelect from "../components/RegionSelect";

function Signup() {
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");

  return(
    <div className="Signup">
      <div className="title-wrap">
        회원가입
      </div>

      <div className="content-wrap">
        <div id="id">
          <p>아이디</p>
          <input
          type="text" 
          name="username"
          placeholder="아이디 입력(소문자, 숫자 포함 6~20자)"
          />
          <button>중복 확인</button>
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
          <select>
            <option value="children">어린이</option>
            <option value="parent">학부모</option>
            <option value="teacher">선생님</option>
          </select>
        </div>

        <div id="kindergarten">
          <p>소속 유치원</p>
        </div>

        <RegionSelect setArea={setArea}/>

      </div>
    </div>
  )

}

export default Signup;