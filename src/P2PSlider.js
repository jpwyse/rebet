import React, { useState, useRef } from "react";
import { 
  Box, 
  Stack, 
  Typography, 
  Button, 
  IconButton, 
  Dialog, 
  DialogActions, 
  DialogTitle 
} from "@mui/material";
import { keyframes } from "@mui/system"; 
import Lottie from 'lottie-react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import orange_btn_edit from './StaticAssets/orange_btn_edit.png';
import red_button from './StaticAssets/red_button.png';
import green_button from './StaticAssets/green_button.png';
import glowing_left_arrows from './AnimatedAssets/glowing_left_arrows.json';
import glowing_right_arrows from './AnimatedAssets/glowing_right_arrows.json';
import green_left_arrows from './StaticAssets/green_left_arrows.png';
import red_left_arrows from './StaticAssets/red_left_arrows.png';
import green_right_arrows from './StaticAssets/green_right_arrows.png';
import red_right_arrows from './StaticAssets/red_right_arrows.png';


const P2PSlider = () => {
  const [position, setPosition] = useState(0);
  const [status, setStatus] = useState(""); // Accept or Decline
  const sliderRef = useRef(null);
  const maxDistance = 150; // Max drag distance

  // Handle drag
  const handleMouseMove = (e) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      let newX = e.clientX - rect.left - rect.width / 2;
      if (newX > maxDistance) newX = maxDistance;
      if (newX < -maxDistance) newX = -maxDistance;
      setPosition(newX);
    }
  };

  // Handle mouse release
  const handleMouseUp = () => {
    if (position === -maxDistance) {
      setStatus("Decline");
    } else if (position === maxDistance) {
      setStatus("Accept");
    } else {
      setPosition(0); // Reset position
    }
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = () => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  // Dynamic track background color
  const getTrackColor = () => {
    if (position < 0) return "linear-gradient(179deg, rgba(98, 22, 49, 1) 9.2%, rgba(255, 90, 139, 1) 103.9%)";
    if (position > 0) return "linear-gradient(179deg, rgba(27, 125, 67, 1) 9.2%, rgba(108, 231, 150, 1) 103.9%)";
    return "linear-gradient(179deg, rgba(37, 37, 47, 1) 9.2%, rgba(20, 20, 27, 1) 103.9%)";
  };

  const getTextColor = () => {
    if (position < 0) return "rgba(128, 32, 55, 1)";
    if (position > 0) return "rgba(7, 110, 73, 1)";
    return "#fff";
  };

  const getBorderColor = () => {
    if (position < 0) return "rgba(255, 90, 139, 1)";
    if (position > 0) return "rgba(108, 231, 150, 1)";
    return "#ff5722";
  };

  const handleClose = () => {
    setStatus("");
    setPosition(0);
  };

  const glowAnimation = keyframes`
  0% {
    box-shadow: 
      0 0 10px 5px #ff5722, 
      0 0 10px 5px #ff9800, 
      0 0 20px 10px #ff5722;
  }
  100% {
    box-shadow: 
      0 0 5px 8px #ff9800, 
      0 0 15px 10px #ff5722, 
      0 0 25px 12px #ff9800;
  }
`;

const confirmDialog = (
  <React.Fragment>
    <Dialog
      open={status != ""}
      onClose={handleClose}
    >
      <DialogTitle>
        {status == "Accept" ? 
          <Typography variant="h6">
            Bet has been accepted!
          </Typography>
        : 
          <Typography variant="h6">
            Bet has been declined!
          </Typography>
        }
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>
);
  
  
  return (
    <React.Fragment>
      <Box
        ref={sliderRef}
        sx={{
          position: "relative",
          width: "500px",
          height: "120px",
          margin: "50px auto",
          background: getTrackColor(),
          border: "4px solid",
          borderColor: getBorderColor(),
          borderRadius: "50px",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          transition: "background 0.3s ease",
        }}
      >

        {/* Accept/Decline */} 
        <Button
          startIcon={<CloseIcon />}
          sx={{
            position: "absolute",
            left: "10px",
            color: getTextColor(),
            fontWeight: "bold",
            opacity: 1,
            transition: "opacity 0.3s",
          }}
        >
          Decline
        </Button>

        <Button
          endIcon={<CheckIcon />}
          sx={{
            position: "absolute",
            right: "10px",
            color: getTextColor(),
            fontWeight: "bold",
            opacity: 1,
            transition: "opacity 0.3s",
          }}
        >
          Accept
        </Button>

        <Stack direction="row" alignItems="center" spacing={position === 0 ? 1.75 : -5}>
          { position > 0 ? 
            <IconButton>
              <img
                src={green_left_arrows}
                alt="GreenLeftArrows"
                style={{ width: 40, height: 40 }}
              />
            </IconButton>
          : position < 0 ?
            <IconButton>
              <img
                src={red_left_arrows}
                alt="RedLeftArrows"
                style={{ width: 40, height: 40 }}
              />
            </IconButton>
          :
            <Lottie
              animationData={glowing_left_arrows}
              loop={true}
              style={{
                width: 50, // Adjust width of the animation
                height: 50, // Adjust height of the animation
              }}
            />
          }
          {/* Draggable Orb */}
          <Button
            disableRipple
            disableFocusRipple
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            sx={{
              position: "relative",
              left: `${position}px`,
              width: position === 0 ? "80px" : "160px",
              height: position === 0 ? "80px" : "160px",
              borderRadius: "50%",
              boxShadow: "none",
              cursor: "grab",
              background: "transparent", // Fallback background
              animation: position === 0 ? `${glowAnimation} 1s ease-in-out infinite alternate` : null,
              p: 0,
            }}
          >
            {/* Custom PNG Icon */}
            <img
              src={position > 0 ? green_button : position < 0 ? red_button : orange_btn_edit}
              alt="Orb Icon"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                pointerEvents: "none",
                borderRadius: "50%",
                background: "transparent",
                boxShadow: "none",
                animation: `${glowAnimation} 1s ease-in-out infinite alternate`,
              }}
            />
          </Button>
          { position > 0 ? 
            <IconButton>
              <img
                src={green_right_arrows}
                alt="GreenRightArrows"
                style={{ width: 40, height: 40 }}
              />
            </IconButton>
          : position < 0 ?
            <IconButton>
              <img
                src={red_right_arrows}
                alt="RedRightArrows"
                style={{ width: 40, height: 40 }}
              />
            </IconButton>
          :
            <Lottie
              animationData={glowing_right_arrows}
              loop={true}
              style={{
                width: 50, // Adjust width of the animation
                height: 50, // Adjust height of the animation
              }}
            />
          }
        </Stack>
      </Box>
      {confirmDialog}
    </React.Fragment>
  );
};

export default P2PSlider;
