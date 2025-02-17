import { Route, Routes } from "react-router-dom"
import Home from "./main/pages/Home"
import WhereToGo from "./whereToGo/pages/WhereToGo"
import DustByRegion from "./whereToGo/components/DustByRegion"
import WhereContent from "./whereToGo/components/WhereContent"
import Quiz from "./quiz/pages/quiz"
import HealthInfo from "./healthInfo/pages/HealthInfo"
import HealthWarning from "./healthInfo/components/HealthWarning"
import ActionGuidelines from "./healthInfo/components/ActionGuidelines"
import DetailWhere from "./whereToGo/components/DetailWhere"
import Login from "./user/pages/Login";
import Signup from "./user/pages/Signup";
import ProtectedRoute from "./user/components/ProtectedRoute"
import UserInfo from "./user/pages/UserInfo";


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path="/userInfo" element={<UserInfo />}/>
        <Route path='/whereToGo' element={<WhereToGo />}>
          <Route path='' element={<WhereContent />} />
          <Route path="region" element={<DustByRegion />} />
          <Route path=":pageNumber" element={<DetailWhere />} />
        </Route>
        <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
        <Route path="/healthInfo" element={<HealthInfo />} >
          <Route path="" element={<HealthWarning />} />
          <Route path="actionGuidelines" element={<ActionGuidelines />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
