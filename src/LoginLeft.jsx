import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import GoogleIcon from "./assets/leading icon.svg"; // Optional: Or use image if needed
const LoginLeft = () => {
  return (
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
      }}
    >
      <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    mb: "28px",
  }}
>
  <Box>
  <Typography
    variant="h6"
    fontWeight={500}
    sx={{ fontFamily: "Poppins, sans-serif" }}
  >
    Welcome to Lorem
    
  </Typography>
  <Typography variant="h4" fontWeight="500" sx={{ fontFamily: 'Poppins, sans-serif' }}>
        Sign in
    </Typography>
  </Box>

  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
    <Typography sx={{ fontWeight: 400 }}>No Account?</Typography>
    <Typography
      sx={{ color: "#1a73e8", fontWeight: 500, cursor: "pointer" }}
    >
      Sign up
    </Typography>
  </Box>
</Box>


      {/* <Typography variant="h4" fontWeight="500" mb={1} sx={{ fontFamily: 'Poppins, sans-serif' }}>
        Sign in
      </Typography> */}

      <Box component="form" noValidate sx={{ fontFamily: 'Poppins, sans-serif', display: "flex", flexDirection: "column" }}>
        <Typography variant="body2" mb={0.4}  sx={{ fontFamily: 'Poppins, sans-serif' }}>
          Enter your username or email address
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Gracia.m@safenet.com"
          type="email"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        />

        <Typography variant="body2" mb={0.5} sx={{ fontFamily: 'Poppins, sans-serif' }}>
          Password
        </Typography>
        <TextField
          variant="outlined"
          placeholder="********************"
          type="password"
          fullWidth
          size="small"
          sx={{ mb: 1 }}
        />

        <Typography
          variant="caption"
          color="error"
          align="right"
          sx={{ mb: 2, cursor: "pointer" , fontFamily: 'Poppins, sans-serif',fontWeight: "bold" }}
        >
          Forgot Password
        </Typography>

        <Button variant="contained" fullWidth sx={{ backgroundColor: "#007bff", mb: 1,textTransform: "none" ,fontFamily: 'Poppins,sans-serif'}}>
          Sign in
        </Button>

        <Typography
          sx={{
            my: 0.5,
            color: "#888",
            fontFamily: 'Poppins, sans-serif',
            textAlign: "center",
            fontSize: "14px",
            fontWeight: "bold"
          }}
        >
           or
        </Typography>


        <Button
          variant="outlined"
          fullWidth
          startIcon={
            <img
              src={GoogleIcon}
              alt="Google"
              width={20}
              height={20}
            />
          }
          sx={{
            backgroundColor: "#eaf2fe",
            color: "#1a73e8",
            fontWeight: 500,
            textTransform: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            fontFamily: 'Poppins, sans-serif',
            fontWeight: "bold",
          }}
        >
          Sign in with google
        </Button>
      </Box>
    </Box>
  );
};

export default LoginLeft;
