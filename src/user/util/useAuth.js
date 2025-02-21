import { useState, useEffect } from "react";
import axios from "axios";

// 로그인 상태 관리
function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data.user))
        .catch(() => setUser(null));
    }
  }, []);

  return user;

}

export default useAuth;