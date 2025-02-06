import { Route, Routes } from "react-router-dom"
import Home from "./main/pages/Home"
import WhereToGo from "./whereToGo/pages/WhereToGo"


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/whereToGo' element={<WhereToGo />} />
      </Routes>
    </>
  )
}

export default App
