import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import Dashboard from "./Components/UserDashBoard";


function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Dashboard/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
