import { Button, Modal, Box, Typography, Grid, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import React, { useState } from "react";
import ProgressStepper from "./ProgressStepper";
import '@fontsource/roboto'; // Loads default weight (400)
import "./modaltr.scss";
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import '@fontsource/poppins';

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
                    width: "1000px",
                    height: "530px",
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 6,
                    borderRadius: 4,
                }}
                >
                <div className="st">
                <div className="stepper">
                <ProgressStepper activeStep={0}/>
                </div>
                </div>
                <div className="choose">
                <p style={{fontWeight: 500}}>Choose the contract type</p>
                </div>
                

                <div className="grid-container">
                <ListItem className="grid-item" sx={{py: "18px"}}>
                    <ListItemIcon>
                    <FileOpenOutlinedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={<p>Vendor & Sales Contracts</p>}/>
                </ListItem>

                <ListItem className="grid-item" sx={{py: "18px"}}>
                    <ListItemIcon>
                    <FileOpenOutlinedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={<p>Lease Contracts</p>}/>
                </ListItem>

                <ListItem className="grid-item" sx={{py: "18px"}}>
                    <ListItemIcon>
                    <FileOpenOutlinedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={<p>NDAs</p>}/>
                </ListItem>

                <ListItem className="grid-item" sx={{py: "18px"}}>
                    <ListItemIcon>
                    <FileOpenOutlinedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={<p>Employment Contracts</p>}/>
                </ListItem>

                <ListItem className="grid-item center" sx={{py: "14px"}}>
                    <ListItemIcon>
                    <FileOpenOutlinedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={<p>Create a custom contract types</p>}/>
                </ListItem>
                </div>

                <div className="buttons">
                    <Button variant="outlined" style={{textTransform: "none", fontSize: "18px", padding: "10px 20px 10px 20px", border: "1px solid gray"}} className="actions">Cancel</Button>
                    <Button variant="contained" style={{textTransform: "none",  fontSize: "18px", padding: "10px 25px 10px 25px"}} className="actions">Next</Button>
                </div>

                </Box>
            </Modal>
        </div>
    );
}

export default ModalTrial