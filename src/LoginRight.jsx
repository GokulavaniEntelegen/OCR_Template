import React from "react";
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import loginImage from "./assets/image-1.png";

const LoginRight = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: true,
  };

  const images = [loginImage, loginImage, loginImage]; // using same image 3 times

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
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 400, mb: 3 }}>
        <Slider {...settings}>
          {images.map((img, index) => (
            <Box key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      <Typography
        variant="h5"
        sx={{ fontWeight: 600, marginBottom: 1, fontFamily: "Poppins, sans-serif" }}
      >
        Upload Invoice
      </Typography>

      <Typography
        variant="body1"
        sx={{ color: "#555", maxWidth: 300, fontFamily: "Poppins, sans-serif" }}
      >
        Click 'Upload Invoice', choose your file, and hit 'Save' to securely store
        your invoice for easy access later!
      </Typography>

      <Box sx={{ display: "flex", gap: 1, marginTop: 3 }}>
        <Box
          sx={{
            width: 100,
            height: 5,
            borderRadius: "10px",
            backgroundColor: "#007bff",
          }}
        />
        <Box
          sx={{
            width: 100,
            height: 5,
            borderRadius: "10px",
            backgroundColor: "#ccc",
          }}
        />
        <Box
          sx={{
            width: 100,
            height: 5,
            borderRadius: "10px",
            backgroundColor: "#ccc",
          }}
        />
      </Box>
    </Box>
  );
};

export default LoginRight;