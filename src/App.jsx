import { useEffect, useState } from "react";
import Login from "./user/pages/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./user/pages/Signup";

function App() {

  return (
    <main>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    </main>
  )
}

export default App
