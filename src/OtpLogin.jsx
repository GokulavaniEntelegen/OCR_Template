import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import "./styles/OtpLogin.scss"
import OtpInput from "react-otp-input";

function OtpLogin() {

    const [otp,setOtp] = useState(null);

    return(
        <Box
              sx={{
                width: "50%",
                p: 8,
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                fontFamily: 'Poppins,sans-serif',
                mb: 1,
                alignItems: "flex-start",
              }}
            >
                <p className="emailotp" style={{marginBottom: 3,marginTop: 3}}>Enter Email OTP</p>
                <p className="simple2step">Its a simple 2 step verification. Enter your 6 digit code sent to tyour registered email.</p>
                <div style={{marginTop: "7px"}}>
                <p className="enterotp">Enter OTP</p>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    inputStyle={{
                      width: "45px",
                      height: "45px",
                      margin: "0 8px",
                      fontSize: "18px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      textAlign: "center",
                      fontFamily:"Poppins"
                    }}
                    isInputNum
                    shouldAutoFocus
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginTop: "10px"}}>
                <p className="oopsmsg" style={{color: "#8D8D8D"}}>Hoops! you didn't recieve OTP yet ?</p>
                <p className="oopsmsg" style={{color: "#0000FF"}}>Resend OTP</p>
                </div>

                <Button variant="contained" sx = {{width: "100%",
                    bgcolor: "#1093FF", 
                    borderRadius: "4px", 
                    fontFamily:"Poppins", 
                    textTransform: "none",
                    fontSize: "14px",
                    lineHeight:"20px",
                    fontWeight:"500",
                    boxShadow: 'none',
                    marginTop: "18px"}}>
                        Login
                </Button>

        </Box>
    );
}

export default OtpLogin;