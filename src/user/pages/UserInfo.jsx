import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useUser } from "../util/UserContext";
import "../style/UserInfo.css";

function UserInfo() {
  const { userInfo, setUserInfo } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({ ...userInfo });

  if (!userInfo) {
    return <p>로딩 중...</p>;
  }

  // 사용자 정보 수정
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/auth/update-user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedInfo), // 수정된 정보를 보내
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserInfo(updatedUser); // 수정된 사용자 정보 업데이트
        setIsEditing(false); // 수정 완료 후 종료
      } else {
        console.error("수정 실패");
      }
    } catch (error) {
      console.error("수정 요청 실패", error);
    }
  };

  // 탈퇴하기
  const handleDelete = async () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      try {
        const response = await fetch("/auth/delete-account", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          alert("회원 탈퇴가 완료되었습니다.");
          // 로그아웃 후 리디렉션 등
          window.location.href = "/"; // 홈으로 리디렉션
        } else {
          console.error("탈퇴 실패");
        }
      } catch (error) {
        console.error("탈퇴 요청 실패", error);
      }
    }
  };

  // 수정된 정보 반영
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main className="user">
      <Header />
      <div className="user-info-page">
        <div className="user-info">
          <div className="profile-image">
            <img src={userInfo.profile_image} alt="프로필" className="userinfo-image" />
          </div>

          <h2 className="nickname">{userInfo.nickname}</h2>
          <br />
          <p><strong>아이디 : </strong> {userInfo.username}</p>
          <p><strong>이메일 : </strong>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedInfo.email}
                onChange={handleChange}
              />
            ) : (
              userInfo.email
            )}
          </p>
          <p><strong>가입 유형 : </strong> {userInfo.role}</p>

          {/* 어린이만 레벨 & 도장 개수 표시, 수정 불가 */}
          {userInfo.role === "CHILD" && (
            <>
              <p><strong>레벨 : </strong> {userInfo.level}</p>
              <p><strong>도장 개수 : </strong> {userInfo.stamp}</p>
            </>
          )}

          {/* 선생님만 소속 유치원 표시 (없으면 '없음') */}
          {userInfo.role === "TEACHER" && (
            <p><strong>소속 유치원 : </strong>
              {isEditing ? (
                <input
                  type="text"
                  name="kindergarten"
                  value={editedInfo.kindergarten || ""}
                  onChange={handleChange}
                />
              ) : (
                userInfo.kindergarten || "없음"
              )}
            </p>
          )}

          <p><strong>지역 : </strong>
            {isEditing ? (
              <input
                type="text"
                name="area"
                value={editedInfo.area}
                onChange={handleChange}
              />
            ) : (
              userInfo.area
            )}
          </p>

          <div className="buttons">
            {isEditing ? (
              <button onClick={handleSave} className="save-btn">저장하기</button>
            ) : (
              <button onClick={handleEdit} className="edit-btn">수정하기</button>
            )}
            <button onClick={handleDelete} className="delete-btn">탈퇴하기</button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default UserInfo;
