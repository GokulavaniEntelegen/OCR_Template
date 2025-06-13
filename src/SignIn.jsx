// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// // import axios from "axios"; // Still imported but not used for API calls in this static version
// import { toast, ToastContainer } from "react-toastify";
// import { Button, TextField, Typography } from "@mui/material";
// import "react-toastify/dist/ReactToastify.css";
// // import OtpInput from "react-otp-input"; // No longer needed
// import styles from './styles/SignIn.module.scss';

// // import { Circles } from "react-loader-spinner";

// import loginIllustration from "./assets/image-1.png";

// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const GoogleSignIn = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [step, setStep] = useState(1); // Keep step to manage email then password input
//   // const [fullName, setFullName] = useState("");
//   // const [companyName, setCompanyName] = useState("");
//   // const [phoneNumber, setPhoneNumber] = useState("");


//   // Static password
//   const STATIC_PASSWORD = "Test@1234";

//   // Regular Expressions for Validation
//   // Email regex to specifically check for '@gmail.com' at the end
//   const emailRegex = /^[^\s@]+@gmail\.com$/;
//   // This password regex requires at least 8 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character.
//   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (step === 1) {
//         if (!emailRegex.test(email)) {
//           toast.error("Invalid email format! Only @gmail.com addresses are allowed.");
//           return;
//         }

//         // Simulate API call for checking email
//         setLoading(true);
//         await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
//         setLoading(false);

//         // For any @gmail.com email, we'll now consider it a "User" role for this static flow.
//         // We're not setting `role` in state anymore because we're always navigating to UserDashboard.
//         setStep(2); // Move to password step
//       } else if (step === 2) {
//         if (!passwordRegex.test(password)) {
//           toast.error("Password must be at least 8 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character.");
//           return;
//         }

//         // Static password validation ( Password: Test@1234)
//         if (password !== STATIC_PASSWORD) {
//           toast.error("Incorrect password. Please try again");
//           return;
//         }

//         // Simulate successful login
//         setLoading(true);
//         await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
//         setLoading(false);

//         // Store a dummy token and navigate to UserDashboard
//         localStorage.setItem("token", "dummy-user-token"); // Changed token for clarity
//         localStorage.setItem("role", "User"); // Explicitly set role as User in localStorage
//         localStorage.setItem("email", email);
//         navigate("/UserDashboard"); // THIS IS THE KEY CHANGE!

//       }
//     } catch (err) {
//       setLoading(false); // Ensure loader is hidden on error
//       toast.error(err.message || "An unexpected error occurred. Please try again.");
//     }
//   };

//   if (loading) {
//     return (
//       <div
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: "rgba(255, 255, 255, 0.85)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           zIndex: 9999,
//         }}
//       >
//         {/* <Circles height="80" width="80" color="#1976d2" /> */}
//       </div>
//     );
//   }
//   return (
//     <div className={styles.loginpageLayout}>
//       <div className={styles.loginpagecontainer}>
//         <div className={styles.loginsection}>
//           <div className={styles.loginbox}>
//             <div>
//               <h2 className="login-title">Welcome to Translator App</h2>
//               <h1>Sign In</h1>
//             </div>
//             <form onSubmit={handleLoginSubmit}>
//               {step === 1 && (
//                 <div className={styles.emailcontainer}>
//                   <label>Enter your user email Address</label>
//                   <TextField
//                     id="emailinput"
//                     label="Email"
//                     value={email}
//                     variant="outlined"
//                     sx={{
//                       width: "350px",
//                       height: "35px",
//                       "& .MuiInputBase-root": {
//                         height: "50px",
//                       },
//                     }}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//               )}
//               {step === 2 && (
//                 <div className={styles.inputwrapper}>
//                   <div className={styles.inputFirstdiv}>
//                     <TextField
//                       label="Email"
//                       value={email}
//                       variant="outlined"
//                       disabled
//                       sx={{
//                         width: "350px",
//                         height: "35px",
//                         "& .MuiInputBase-root": {
//                           height: "50px",
//                         },
//                       }}
//                     />
//                   </div>
//                   <div className={styles.inputSeconddiv}>
//                     <label>Enter your user Password</label>
//                     <TextField
//                       id="outlined-basic"
//                       type={showPassword ? "text" : "password"}
//                       label="Password"
//                       value={password}
//                       variant="outlined"
//                       sx={{
//                         width: "350px",
//                         height: "35px",
//                         "& .MuiInputBase-root": {
//                           height: "50px",
//                         },
//                       }}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                       InputProps={{
//                         endAdornment: (
//                           <span
//                             style={{ cursor: 'pointer' }}
//                             onClick={() => setShowPassword(!showPassword)}
//                           >
//                             {showPassword ? <FaEyeSlash /> : <FaEye />}
//                           </span>
//                         ),
//                       }}
//                     />
//                   </div>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: "error.main",
//                       cursor: "pointer",
//                       alignSelf: "flex-end",
//                     }}
//                     onClick={() => navigate("/forget-password")}
//                   >
//                     Forget Password?
//                   </Typography>
//                 </div>
//               )}
//               <br /> <br />
//               <Button
//                 type="submit"
//                 variant="contained"
//                 size="medium"
//                 sx={{
//                   width: "350px",
//                   height: "40px",
//                   "& .MuiInputBase-root": {
//                     height: "50px",
//                   },
//                 }}
//               >
//                 {step === 1 ? "Login" : "Verify Password"}
//               </Button>
//             </form>
//           </div>
//         </div>

//         <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

//         <div className={styles.imageside}>
//           <img src={loginIllustration} alt="Login Illustration" />
//           <p>_____________  ____________  ___________</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GoogleSignIn;


// src/pages/Login.jsx
// src/SignIn.jsx
import React from "react";
import LoginLeft from "./LoginLeft";
import LoginRight from "./LoginRight";
import "./styles/loginLeft.scss";
import "./styles/loginRight.scss";
import {Outlet} from "react-router-dom"


const SignIn = () => {
  return (
    <div className="login-container">
      <div className="login-wrapper">
      {/* <LoginLeft /> */}
        <Outlet/>
      <LoginRight />
      </div>
    </div>
  );
};

export default SignIn;



