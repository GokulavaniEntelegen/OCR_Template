import React from "react";
import { Box, Typography } from "@mui/material";
import loginImage from "./assets/image-1.png"; // Ensure this path is correct

const LoginRight = () => {
  return (
    <Box
      sx={{
        width: "50%",
        backgroundColor: "#f0f4f8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        textAlign: "center",
        fontFamily : 'poppins,sans-serif'
      }}
    >
      <img
        src={loginImage}
        alt="Charts Illustration"
        style={{ maxWidth: "100%", marginBottom: "1.5rem" }}
      />

      <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 1 , fontFamily: "Poppins, sans-serif"}}>
        Upload Invoice
      </Typography>

      <Typography variant="body1" sx={{ color: "#555", maxWidth: 300, fontFamily: "Poppins, sans-serif"}}>
        Click 'Upload Invoice', choose your file, and hit 'Save' to securely store
        your invoice for easy access later!
      </Typography>

      <Box sx={{ display: "flex", gap: 1, marginTop: 3 }}>
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#007bff",
          }}
        />
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#ccc",
          }}
        />
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#ccc",
          }}
        />
      </Box>
    </Box>
  );
};

export default LoginRight;
