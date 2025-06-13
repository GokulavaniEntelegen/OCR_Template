import GoogleSignIn from './SignIn'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginLeft from './LoginLeft';
import ResetPassword from './ResetPassword';

import OtpLogin from './OtpLogin';
function App() {

  return (
    <>
     <Router>
      <div className="call">
        <Routes>
          <Route path="/" element={<GoogleSignIn />}>
            <Route index element={<LoginLeft />} />
             <Route path="reset-password" element={<ResetPassword />} />
            <Route path='/otp-login' element={<OtpLogin></OtpLogin>}/>
          </Route>
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
