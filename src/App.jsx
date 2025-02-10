import { Route, Routes } from "react-router-dom"
import Home from "./main/pages/Home"
import WhereToGo from "./whereToGo/pages/WhereToGo"
import DustByRegion from "./whereToGo/components/DustByRegion"
import WhereContent from "./whereToGo/components/WhereContent"
import Quiz from "./quiz/pages/quiz"
import HealthInfo from "./healthInfo/pages/HealthInfo"


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/whereToGo' element={<WhereToGo />}>
          <Route path='' element={<WhereContent />} />
          <Route path="region" element={<DustByRegion />} />
        </Route>
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/healthInfo" element={<HealthInfo />} >
          <Route path="actionGuidelines" />
        </Route>
      </Routes>
    </>
  )
}

export default App
