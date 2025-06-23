import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import loginImage from "./assets/image-1.png";

const LoginRight = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  const images = [loginImage, loginImage, loginImage];

  return (
    <Box
      className = "imagright"
      sx={{
        flex: 1,
        backgroundColor: "#E4F4FF",
        // display: "flex",
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
        variant="h6"
        sx={{ fontWeight:"bold", marginBottom: 1, fontFamily: "Poppins, sans-serif", fontSize: '22px', height: '32px' }}
      >
        Upload Invoice
      </Typography>

      {/* <Typography
        variant="body1"
        sx={{ color: "#000000", maxWidth: 360, fontFamily: "Poppins, sans-serif",fontWeight:400,fontSize:'16px',letterSpacing:'0.25px',lineHeight:'20px' }}
      >
        Click 'Upload Invoice', choose your file, and hit 'Save' to securely store
               your invoice for easy access later!

      </Typography> */}

      <Typography
        variant="body1"
        sx={{
          color: "#000000",
          maxWidth: 360,
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: "17px",
          letterSpacing: "0.25px",
          lineHeight: "20px",
          text_Indent:"-2em"
        }}
      >
        Click 'Upload Invoice', choose your file, and hit 'Save' to securely store your invoice for easy access later!
      </Typography>


      <Box sx={{ display: "flex", gap: 1, marginTop: 3 }}>
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 100,
              height: 5,
              borderRadius: "10px",
              backgroundColor: currentSlide === i ? "#2B80EC" : "#BDDCF0",
              transition: "background-color 0.3s ease",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default LoginRight;
