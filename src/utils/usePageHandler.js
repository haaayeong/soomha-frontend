
import { useNavigate } from "react-router-dom";

const usePageHandler = () => {
  const navigate = useNavigate();

  return (path) => {
    navigate(path);
  };
};

export default usePageHandler;
