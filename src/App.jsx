import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import Dashboard from "./Components/UserDashboard/UserDashboard";
import ModalTrial from "./Components/ModalTrial/modaltr";


function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Dashboard/>}></Route>
        <Route path="/modal" element = {<ModalTrial/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
