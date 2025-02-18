import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useUser } from "../util/UserContext";
import "../style/UserInfo.css";

function UserInfo() {
  const { userInfo } = useUser();

  if (!userInfo) {
    return <p>로딩 중...</p>
  }

  return (
    <main className="user">
      <Header />
      <div className="user-info-page">
        <div className="user-info">
          <div className="profile-image">
            <img src={userInfo.profile_image} alt="프로필" className="userinfo-image"/>
          </div>

          <h2 className="nickname">{userInfo.nickname}</h2>
          <br />
          <p><strong>아이디 : </strong> {userInfo.username}</p>
          <p><strong>이메일 : </strong> {userInfo.email}</p>
          <p><strong>가입 유형 : </strong> {userInfo.role}</p>

          {/* 어린이만 레벨 & 도장 개수 표시 */}
          {userInfo.role === "CHILD" && (
            <>
              <p><strong>레벨 : </strong> {userInfo.level}</p>
              <p><strong>도장 개수 : </strong> {userInfo.stamp}</p>
            </>
          )}

          {/* 선생님만 소속 유치원 표시 (없으면 '없음') */}
          {userInfo.role === "TEACHER" && (
            <p><strong>소속 유치원 : </strong> {userInfo.kendergarten || "없음"}</p>
          )}

          <p><strong>지역 : </strong> {userInfo.area}</p>
          <div className="buttons">
            <button className="edit-btn">수정하기</button>
            <button className="delete-btn">탈퇴하기</button>
          </div>
        </div>

      </div>
      <Footer />
    </main>
  )
}

export default UserInfo;