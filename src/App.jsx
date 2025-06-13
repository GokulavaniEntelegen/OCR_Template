import GoogleSignIn from './SignIn'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginLeft from './LoginLeft';
function App() {

  return (
    <>
     <Router>
      <div className="call">
        <Routes>
          <Route path="/" element={<GoogleSignIn />}>
            <Route index element={<LoginLeft />} />
          </Route>
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
