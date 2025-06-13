import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import "./styles/CreateAccount.scss"
import { Checkbox, FormControlLabel } from '@mui/material';


function CreateAccount () {
    
    const [name, setName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [checked, setChecked] = useState(true);
    
    return(
        <Box
              sx={{
                width: "50%",
                p: 8,
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                // justifyContent: "center",
                fontFamily: 'Poppins,sans-serif',
                mb: 1,
                alignItems: "flex-start",
              }}
            >
                <p className="welcome" style={{marginBottom: "7px"}}>Welcome to Contract Books</p>
                <p className="create" style={{marginTop: "0px"}}>Create your account</p>

                <div style={{width: "100%"}}>
                    <p style={{margin: 0, fontSize: "12px", color: "#606060"}}>Full Name</p>
                    <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Maria Gracia"
                    value={name}
                    onChange={(event) => {setName(event.target.value)}}
                    sx={{
                    color: "#42474E",
                    '& .MuiOutlinedInput-root': {
                    borderRadius: '4px',
                    fontSize: '16px', // input text font size
                    fontFamily: 'Poppins, sans-serif', // input font
                    '& fieldset': {
                        borderWidth: '0.5px', // controls the border thickness
                        borderColor: '#C4C4C4',
                    },
                    '&:hover fieldset': {
                        borderColor: '#999', // optional hover effect
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#000', // optional focus color
                    },
                    },
                    '& .MuiOutlinedInput-input::placeholder': {
                    color: '#42474E', // placeholder color
                    fontSize: '14px', // placeholder size
                    fontFamily: 'Poppins, sans-serif', // placeholder font
                    fontWeight: "400"
                    },
                    '& .MuiOutlinedInput-input': {
                    padding: '10px 12px', // inner padding for the text
                    fontSize: '14px',     // optional font size
                    },
                    }}
                    />

                    <p style={{margin: 0, fontSize: "12px", color: "#606060", marginTop: "15px"}}>Company Name</p>
                    <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Safe Net"
                    value={companyName}
                    onChange={(event) => {setCompanyName(event.target.value)}}
                    sx={{
                    color: "#42474E",
                    '& .MuiOutlinedInput-root': {
                    borderRadius: '4px',
                    fontSize: '16px', // input text font size
                    fontFamily: 'Poppins, sans-serif', // input font
                    '& fieldset': {
                        borderWidth: '0.5px', // controls the border thickness
                        borderColor: '#C4C4C4',
                    },
                    '&:hover fieldset': {
                        borderColor: '#999', // optional hover effect
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#000', // optional focus color
                    },
                    },
                    '& .MuiOutlinedInput-input::placeholder': {
                    color: '#42474E', // placeholder color
                    fontSize: '14px', // placeholder size
                    fontFamily: 'Poppins, sans-serif', // placeholder font
                    fontWeight: "400"
                    },
                    '& .MuiOutlinedInput-input': {
                    padding: '10px 12px', // inner padding for the text
                    fontSize: '14px',     // optional font size
                    },
                    }}
                    />

                    <p style={{margin: 0, fontSize: "12px", color: "#606060", marginTop: "15px"}}>Phone Number</p>
                    <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="+1 678 8956 678"
                    value={phoneNumber}
                    onChange={(event) => {setPhoneNumber(event.target.value)}}
                    sx={{
                    color: "#42474E",
                    '& .MuiOutlinedInput-root': {
                    borderRadius: '4px',
                    fontSize: '16px', // input text font size
                    fontFamily: 'Poppins, sans-serif', // input font
                    '& fieldset': {
                        borderWidth: '0.5px', // controls the border thickness
                        borderColor: '#C4C4C4',
                    },
                    '&:hover fieldset': {
                        borderColor: '#999', // optional hover effect
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#000', // optional focus color
                    },
                    },
                    '& .MuiOutlinedInput-input::placeholder': {
                    color: '#42474E', // placeholder color
                    fontSize: '14px', // placeholder size
                    fontFamily: 'Poppins, sans-serif', // placeholder font
                    fontWeight: "400"
                    },
                    '& .MuiOutlinedInput-input': {
                    padding: '10px 12px', // inner padding for the text
                    fontSize: '14px',     // optional font size
                    },
                    }}
                    />

                    <p style={{margin: 0, fontSize: "12px", color: "#606060", marginTop: "15px"}}>Email ID</p>
                    <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Gracia.m@safenet.com"
                    value={email}
                    onChange={(event) => {setEmail(event.target.value)}}
                    sx={{
                    color: "#42474E",
                    '& .MuiOutlinedInput-root': {
                    borderRadius: '4px',
                    fontSize: '16px', // input text font size
                    fontFamily: 'Poppins, sans-serif', // input font
                    '& fieldset': {
                        borderWidth: '0.5px', // controls the border thickness
                        borderColor: '#C4C4C4',
                    },
                    '&:hover fieldset': {
                        borderColor: '#999', // optional hover effect
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#000', // optional focus color
                    },
                    },
                    '& .MuiOutlinedInput-input::placeholder': {
                    color: '#42474E', // placeholder color
                    fontSize: '14px', // placeholder size
                    fontFamily: 'Poppins, sans-serif', // placeholder font
                    fontWeight: "400"
                    },
                    '& .MuiOutlinedInput-input': {
                    padding: '10px 12px', // inner padding for the text
                    fontSize: '14px',     // optional font size
                    },
                    }}
                    />
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
                    marginTop: "30px",
                    marginBottom: "25px",
                    py: "10px"}}>
                        Sign In
                </Button>

                <FormControlLabel
  sx={{
    alignItems: 'flex-start', // ✅ Aligns checkbox to top of label
    marginTop: '0px',
  }}
  control={
    <Checkbox
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
      name="terms"
      color="primary"
      sx={{ mt: '2px' }} // optional tweak to align checkbox better
    />
  }
  label={
    <span style={{
      fontFamily: 'Poppins, sans-serif',
      fontSize: '11px',
      color: '#808080',
      fontWeight: 400,
      lineHeight: '0.1',
    }}>
      Get the business security newsletter and emails from us with our latest announcements, product updates, events, and research opportunities. <a style={{color:"#1093FF"}}>Unsubscribe</a> any time.
    </span>
  }
/>

        </Box>
    );
}

export default CreateAccount;