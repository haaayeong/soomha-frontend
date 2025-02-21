import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute ({ children }) {
  const [token] = useState(localStorage.getItem("token"));
  const alertShown = useRef(false);

  if (!token && !alertShown.current) {
    alert("로그인이 필요한 페이지입니다.");
    alertShown.current = true;
  }

  if (!token) {
    return <Navigate to="/login" />
  }

  return children;
};

export default ProtectedRoute;