import { Button, Modal, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import ProgressStepper from "./ProgressStepper";
import '@fontsource/roboto'; // Loads default weight (400)
import "./modaltr.scss";



function ModalTrial() {
    const [showModal, setShowModal] = useState(false);
    return(
        <div>
            <Button 
            onClick={() => {setShowModal(true);}}
            >
            Open Modal
            </Button>
            <Modal open = {showModal}>
                <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "1020px",
                    height: "570px",
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
                >
                <div style = {{marginBottom: "20px"}}>
                <ProgressStepper activeStep={1}/>
                </div>
                <div className="choose">
                <p style={{fontWeight: 500}}>Choose the contract type</p>
                </div>
                <Typography sx={{ mt: 2 }}>
                    You can put forms, text, buttons here.
                </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalTrial