import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import './UserDashboard.scss';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import { Grid, List, ListItem} from "@mui/material";
import ProgressStepper from "./ProgressStepper";
import '@fontsource/roboto'; // Loads default weight (400)
import '@fontsource/poppins';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Paper,
  Breadcrumbs,
  Link as MuiLink,
  Container,
  ListItemIcon,
  ListItemText,
  Button,
  Avatar, // Added Button import for the card
  Modal
} from "@mui/material";
import { styled } from "@mui/material/styles"; // Added styled for VisuallyHiddenInput
import {
  Dashboard as DashboardIconMui,
  PictureAsPdf as PictureAsPdfIconMui,
  Notifications as NotificationsIconMui,
  AccountCircle as AccountCircleIconMui,
  ExitToApp as ExitToAppIconMui,
  UploadFile as UploadFileIcon, // Added UploadFileIcon for the button
  Description as DocIcon,
  Padding,
  Opacity, // Added DocIcon for 'Import Contract' button
} from "@mui/icons-material";

import AddIcon from '@mui/icons-material/Add';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import {
  Drawer,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChatIcon from '@mui/icons-material/Chat';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import ContentComponent from './contentcomponent';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SearchIcon from '@mui/icons-material/Search';
import {TextField, InputAdornment} from "@mui/material";
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Chip} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import './tabletrycss.css';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import {ReactComponent as UploadCustomIcon} from "../../assets/Upload.svg"

// VisuallyHiddenInput for file input (needed for the Upload button)
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const createData = (contact, name, address, startDate, batchGenerated, quantityReceive, vendorCode, billClause, tags, flags) => {
    // flags is an object mapping column keys to flag strings (e.g. "outsource" or "")
    return {contact, name, address, startDate, batchGenerated, quantityReceive, vendorCode, billClause, tags, flags};
}

const rows = [
    createData(
        1234567890, "abcde", "sfdgbgbdbffda", "02 May, 2020", "tg1234", "Short on qty", 12345, "Billed with 45 Days", "Design",
        {
            contact: "", name: "", address: "outsource", startDate: "", batchGenerated: "", quantityReceive: "", vendorCode: "", billClause: "", tags: ""
        }
    ),
    createData(
        1234567890, "abcde", "sfdgbgbdbffda", "02 May, 2020", "tg1234", "Short on qty", 12345, "Billed with 45 Days", "Design",
        {
            contact: "outsource", name: "", address: "", startDate: "", batchGenerated: "", quantityReceive: "", vendorCode: "outsource", billClause: "", tags: ""
        }
    ),
    createData(
        1234567890, "abcde", "sfdgbgbdbffda", "02 May, 2020", "tg1234", "Correct Qty", 12345, "Billed with 45 Days", "Design",
        {
            contact: "", name: "outsource", address: "", startDate: "", batchGenerated: "", quantityReceive: "", vendorCode: "", billClause: "", tags: ""
        }
    ),
    createData(
        1234567890, "abcde", "sfdgbgbdbffda", "02 May, 2020", "tg1234", "Correct Qty", 12345, "Billed with 45 Days", "Design",
        {
            contact: "", name: "", address: "", startDate: "", batchGenerated: "outsource", quantityReceive: "", vendorCode: "", billClause: "", tags: ""
        }
    ),
    createData(
        1234567890, "abcde", "sfdgbgbdbffda", "02 May, 2020", "tg1234", "Short on qty", 12345, "Billed with 45 Days", "Design",
        {
            contact: "", name: "", address: "", startDate: "", batchGenerated: "", quantityReceive: "", vendorCode: "", billClause: "outsource", tags: ""
        }
    ),
    createData(
        1234567890, "abcde", "sfdgbgbdbffda", "02 May, 2020", "tg1234", "Short on qty", 12345, "Billed with 45 Days", "Design",
        {
            contact: "", name: "", address: "", startDate: "", batchGenerated: "", quantityReceive: "outsource", vendorCode: "", billClause: "", tags: "outsource"
        }
    )
];

// Component to display a red dot on top right of the cell if flag === "outsource"
const CellWithFlag = ({ flag, children }) => {
    return (
        <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
            {flag === "outsource" && (
                <span
                    style={{
                        position: "absolute",
                        top: 2,
                        left: 0,
                        height: 7,
                        width: 7,
                        backgroundColor: "red",
                        borderRadius: "50%",
                        zIndex: 1,
                    }}
                />
            )}
            <div style={{ paddingLeft: flag === "outsource" ? 7 : 0 }}>
                {children}
            </div>
        </div>
    );
};

const items = ["Contact No.", "Customer Name", "Customer Title", "Start Date", "End Date", "Auto Renewal Term", "Payment Term", "Termination Claus", "Tags"];

function Dashboard() {

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState("Static User"); // Default to Static Use
  const [name,setName] = useState("Manikandan");
  useEffect(() => {
      const userEmail = localStorage.getItem("email");
      if (userEmail) {
        setUserName(userEmail);
      }
    }, []); 
     const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleLogout = () => {
      // Clear static user data from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("email"); 
      // Navigate back to the login page
      navigate("/"); // Assuming your login route is "/"
      setAnchorEl(null); // Close the menu after logout
    };

  // Placeholder for file change, not functional in Dashboard context
  const handleFileChange = (event) => {
     const file = event.target.files?.[0];
     if (file) {
       console.log("File selected in Dashboard:", file.name);
       
       // Navigate to translate page and send file through state
       navigate('/TranslatePage', { state: { file } });
      }
    //console.log("File selected in Dashboard (not for upload here):");
    // navigate("/TranslatePage", { state: { trigger: true } })
    // This function is just a placeholder to prevent errors,
    // actual file handling should be in TranslatorApp.
  };

  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);

  const icons = [
    { key: 'dashboard', icon: <DashboardIcon />, tooltip: 'Dashboard' },
    { key: 'chat', icon: <ChatIcon />, tooltip: 'Chat' },
    { key: 'cart', icon: <ShoppingCartIcon />, tooltip: 'Cart' },
    { key: 'settings', icon: <SettingsIcon />, tooltip: 'Settings' },
  ];

  const toggleHamburger = () => {
    setHamburgerOpen((prev) => {
      if (prev) {
        // closing everything
        setDrawerOpen(false);
        setSelectedKey(null);
      }
      return !prev;
    });
  };

  const handleIconClick = (key) => {
    if (selectedKey === key && drawerOpen) {
      setDrawerOpen(false);
      setSelectedKey(null);
    } else {
      setSelectedKey(key);
      setDrawerOpen(true);
    }
  };

  const getInitials = () => {
    return name?.charAt(0).toUpperCase(); // Gets first letter
  };

      const [selected, setSelected] = useState([]);

    const handleAllSelect = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((_, index) => index);
            setSelected(newSelected);
        } else {
            setSelected([]);
        }
    };

    const handleClick = (index) => {
        const selectedIndex = selected.indexOf(index);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = [...selected, index];
        } else {
            newSelected = selected.filter((i) => i !== index);
        }
        setSelected(newSelected);
    };

    const isSelected = (index) => selected.indexOf(index) !== -1;

    const BatchFormat = ({ label }) => (
        <Chip
            label={label}
            size="small"
            icon={
                <span
                    style={{
                        height: 8,
                        width: 8,
                        backgroundColor: "#ff9800",
                        borderRadius: "50%",
                        display: "inline-block",
                    }}
                />
            }
            sx={{
                backgroundColor: "#fff4e5",
                color: "#ff9800",
                fontWeight: 500,
                fontSize: "0.875rem",
                paddingRight: "8px",
                ".MuiChip-icon": {
                    marginLeft: "4px",
                    marginRight: "4px",
                },
            }}
        />
    );

    function TagsFormat({ label }) {
        return (
            <Chip
                label={label}
                size="small"
                sx={{
                    backgroundColor: "violet",
                    color: "darkviolet",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    paddingRight: "2.5px",
                }}
            />
        );
    }

    function QuantityReceivedChip({ status }) {
        if (status === "Short on qty") {
            return (
                <Chip
                    icon={<CancelIcon style={{ color: "red" }} />}
                    label={status}
                    size="small"
                    sx={{ backgroundColor: "#fdecea", color: "red", fontWeight: 500 }}
                />
            );
        }

        if (status === "Correct Qty") {
            return (
                <Chip
                    icon={<CheckCircleIcon style={{ color: "green" }} />}
                    label={status}
                    size="small"
                    sx={{ backgroundColor: "#e6f4ea", color: "green", fontWeight: 500 }}
                />
            );
        }

        return <span>{status}</span>;
    }

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    function handlePageChange(event, newPage) {
        setPage(newPage);
    }

    function handleRowsPerPageChange(event) {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    }

    const paginatedrows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const [searchQuery, setSeacrchQuery] = useState("");

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(0);

  return (
    <div className="container" style={{ display: "flex", padding: "0px 0px 50px 0px", width: "100%"}}>
        
      <Box sx={{ display: 'flex', height: '100vh'}}>
      {/* Hamburger Icon */}
      <IconButton
        onClick={toggleHamburger}
        sx={{
          position: 'fixed',
          top: 16,
          left: 12,
          zIndex: 1500,
          color: "white"
        //   backgroundColor: 'white',
        }}
      >
        <LogoDevIcon/>
      </IconButton>

      {/* Conditional Sidebar */}
      {/* {hamburgerOpen && ( */}
        <Box
          sx={{
            width: 60,
            height: '100vh',
            backgroundColor: '#1c2b36',
            paddingTop: 7,
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {icons.map(({ key, icon, tooltip }) => (
            <Tooltip title={tooltip} placement="right" key={key}>
              <IconButton
                onClick={() => handleIconClick(key)}
                sx={{
                  color: selectedKey === key && drawerOpen ? '#3399FF' : '#fff',
                  marginY: 1,
                }}
              >
                {icon}
              </IconButton>
            </Tooltip>
          ))}
        </Box>
        {/* )} */}

      {/* Drawer with content */}
      {/* {hamburgerOpen && ( */}
        <Drawer
          variant="persistent"
          anchor="left"
          open={drawerOpen}
          PaperProps={{
            sx: {
              width: 300,
              marginLeft: '60px',
            },
          }}
        >
          <Box p={2}>
            <ContentComponent selected={selectedKey} />
          </Box>
        </Drawer>
      {/* )} */}

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: hamburgerOpen
            ? drawerOpen
              ? '360px'
              : '60px'
            : '0px',
          padding: 3,
          transition: 'margin-left 0.3s',
        }}
      />
      </Box>

      
        <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
            <div className="topbar">
                <div className="searchbar">
                    <TextField
                    variant="outlined"
                    placeholder="Search in clause"
                    size="small"
                    sx={{
                        width: "100%",
                        maxWidth: 400,
                        '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: '#f0f0f0',
                        '& input': {
                            fontSize: '20px', // 👈 Increase text size here
                            marginLeft: "5px"
                        },
                        '& .MuiInputAdornment-root svg': {
                            fontSize: '25px', // 👈 Optional: increase icon size
                            borderRight: "1px solid lightgray",
                            paddingRight: "10px"
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#90caf9',
                        },
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                        ),
                    }}
                    />
                </div>
                <div className="settings-profile" style={{display: "flex",alignItems: "center"}}>
                    <div style={{paddingRight: 20, paddingLeft: 20 , borderLeft: "1px solid lightgray"}}>
                    <IconButton sx = {{color: "black",border: "1px solid lightgray", borderRadius: "18px"}}>
                        <SettingsOutlinedIcon/>
                    </IconButton>
                    </div>

                    <div style={{paddingRight: 20, paddingLeft: 20 , borderLeft: "1px solid lightgray", borderRight: "1px solid lightgray"}}>
                    <IconButton sx = {{color: "black",border: "1px solid lightgray", borderRadius: "18px"}}>
                        <NotificationsActiveOutlinedIcon/>
                    </IconButton>
                    </div>

                    <Box
                        display="flex"
                        alignItems="center"
                        sx={{
                            padding: '8px 16px',
                            width: 'fit-content',
                            marginLeft: "20px",
                            borderRadius: "30px",
                            border: "1px solid lightgray",
                            marginRight: "30px"
                        }}
                        >
                        <Avatar sx={{ bgcolor: '#3f51b5', marginRight: 1 }}>
                            {getInitials(name)}
                        </Avatar>
                        <Typography variant="body1">{name}</Typography>
                    </Box>

                </div>
            </div>
            <Box sx={{width: "100%",minHeight: "100vh" }}>
            {/* Removed the original Paper with "Welcome" and "Navigate" text */}
            {/* Purple Gradient Banner/Card - Integrated here */}
            <div style={{padding: "50px 30px 0px 30px"}}>
            <Typography sx={{fontSize: "40px", fontWeight: "bold"}}>Hello Maria!</Typography>
            <Typography variant="h6" sx={{color: "gray"}}>Simple Dummy text of the printing</Typography>
            <Paper className="violet-paper"
                elevation={3}
                sx={{
                p: 4,
                mt: 4, // Margin top to separate from AppBar
                borderRadius: 2, // Rounded corners
                background: 'linear-gradient(45deg, #6a11cb 30%, #2575fc 90%)', // Purple gradient
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start', // Align content to the left as in the image
                gap: 2,
                mb: 4, // Margin bottom for spacing below the card
                }}
            >

                <div style={{display: "flex", gap: "70px", alignItems: "flex-start", flexDirection: "column", marginLeft: "15px"}}>
                <Typography sx={{fontSize: "30px", color: "darkgray", width: "650px"}}>
                To get started by uploading contracts or importing contracts to apply the functionalities.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                {/* <MuiLink
                    component={RouterLink}
                    to="/TranslatePage" // Link to your TranslatorApp
                    sx={{ textDecoration: 'none' }} // Remove underline from link
                > */}
                    <Button
                    variant="contained"
                    startIcon={<AddIcon/>}
                    // component = "label"
                    onClick={() => {setShowModal(true)}}
                    // No 'disabled' or 'loading' state here as this is just a navigation button
                    sx={{
                        // bgcolor: 'white', // White background for button
                        // color: '#6a11cb', // Purple text color
                        // '&:hover': {
                        //   bgcolor: '#f0f0f0', // Lighter hover
                        // },
                        fontSize:"18px",
                        width:"200px",
                        textTransform: "none",
                        borderRadius: 2, // Rounded corners for button
                        // px: 2, // Padding horizontal
                        // py: 0.5, // Padding vertical
                    }}
                    >
                    Upload
                    {/* VisuallyHiddenInput is here, but its onChange won't trigger actual upload in Dashboard */}
                    {/* <VisuallyHiddenInput
                        type="file"
                        accept=".pdf,.docx,.csv" // Example accept types
                        onClick={handleFileChange} // Placeholder handler
                    /> */}
                    </Button>
                {/* </MuiLink> */}
                <Button
                    variant="outlined" // Outlined button for "Import Contract"
                    startIcon={<CloudDownloadIcon/>} // Example icon
                    // No 'disabled' or 'loading' state here
                    sx={{
                    //   color: 'white', // White text color
                    borderColor: 'white', // White border
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': {
                        borderColor: '#f0f0f0',
                        color: '#f0f0f0',
                    },
                    textTransform: "none",
                    fontSize: "18px",
                    borderRadius: 2, // Rounded corners for button
                    px: 3,
                    py: 1.5,
                    width: "280px"
                    }}
                >
                    Import Contract
                </Button>
                </Box>
                </div>
            </Paper>

            {/* Placeholder for the table content below the banner */}
            {/* <Paper elevation={1} sx={{ p: 2, minHeight: '300px', bgcolor: '#f5f5f5', width: "100%"}}>
                <Typography variant="body2" color="black" sx={{fontSize: "20px", fontWeight: "bold"}}>
                Uploaded Files:
                <Box style = {{display: "flex", flexWrap: "wrap", justifyContent: "flex-start", gap: "22px", marginTop: "20px", marginLeft: "25px"}}>
                    <Box style = {{height: "200px", width: "200px", Padding: "20px", backgroundColor: "lightgray"}}></Box>
                    <Box style = {{height: "200px", width: "200px", Padding: "20px", backgroundColor: "lightgray"}}></Box>
                    <Box style = {{height: "200px", width: "200px", Padding: "20px", backgroundColor: "lightgray"}}></Box>
                    <Box style = {{height: "200px", width: "200px", Padding: "20px", backgroundColor: "lightgray"}}></Box>
                    <Box style = {{height: "200px", width: "200px", Padding: "20px", backgroundColor: "lightgray"}}></Box>
                </Box>
                </Typography>
            </Paper> */}
            <div className="uploadtables" style={{marginTop: "50px"}}>
            <Box sx = {{pointerEvents: "none", opacity: "0.3"}}>
            <div>
            <div className="filterandpagin">
                
                <Button
                variant="outlined"
                startIcon={<FilterAltIcon />}
                sx={{
                    borderRadius: '15px',
                    fontWeight: 500,
                    padding: "8px 16px",
                    fontSize: "15px",
                    marginRight: "15px",
                    marginLeft: "20px",
                    marginTop: "21px",
                    height: "35px",
                    textTransform: "none",
                    '& .MuiButton-startIcon': {
                    color: '#1976d2',
                    },
                }}
                >
                Filter
                </Button>

                <TextField
                    style={{ width:"180px", marginTop: "18px" }}
                    label="Customer Name"
                    size="small"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(event) => setSeacrchQuery(event.target.value)}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px"} }}
                />

                <div style={{ display: 'flex', gap: '1rem', padding: '20px' ,marginRight: "400px"}}>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Start Date"
                        dateFormat="dd MMM yyyy"
                        className="custom-datepicker"
                      />
                
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        placeholderText="End Date"
                        dateFormat="dd MMM yyyy"
                        className="custom-datepicker"
                      />
                    </div>


                <TablePagination
                    component="div"
                    count={rows.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    rowsPerPageOptions={[5, 10, 25]}
                    style={{marginTop: "15px"}}
                />
            </div>
            <TableContainer>
                <Table sx={{ minWidth: 500 }}>
                    <TableHead style={{ backgroundColor: "lightgrey" }}>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={selected.length > 0 && selected.length < rows.length}
                                    checked={selected.length > 0 && selected.length === rows.length}
                                    onChange={handleAllSelect}
                                />
                            </TableCell>
                            <TableCell><strong>CONTACT NO</strong><UnfoldMoreIcon sx = {{verticalAlign: "middle", marginLeft: "4px", fontSize: "small"}}/></TableCell>
                            <TableCell><strong>CUSTOMER NAME</strong><UnfoldMoreIcon sx = {{verticalAlign: "middle", marginLeft: "4px", fontSize: "small"}}/></TableCell>
                            <TableCell><strong>ADDRESS</strong></TableCell>
                            <TableCell><strong>START DATE</strong><UnfoldMoreIcon sx = {{verticalAlign: "middle", marginLeft: "4px", fontSize: "small"}}/></TableCell>
                            <TableCell><strong>BATCH GENEREATED</strong><UnfoldMoreIcon sx = {{verticalAlign: "middle", marginLeft: "4px", fontSize: "small"}}/></TableCell>
                            <TableCell><strong>QUANTITY RECEIVED</strong><UnfoldMoreIcon sx = {{verticalAlign: "middle", marginLeft: "4px", fontSize: "small"}}/></TableCell>
                            <TableCell><strong>VENDOR CODE</strong><UnfoldMoreIcon sx = {{verticalAlign: "middle", marginLeft: "4px", fontSize: "small"}}/></TableCell>
                            <TableCell><strong>BILL CLAUSE</strong><UnfoldMoreIcon sx = {{verticalAlign: "middle", marginLeft: "4px", fontSize: "small"}}/></TableCell>
                            <TableCell><strong>TAGS</strong><UnfoldMoreIcon sx = {{verticalAlign: "middle", marginLeft: "4px", fontSize: "small"}}/></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedrows.map((row, index) => {
                            const rowIndex = page * rowsPerPage + index;
                            const isItemSelected = isSelected(rowIndex);
                            return (
                                <TableRow
                                    key={index}
                                    hover
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    selected={isItemSelected}
                                    onClick={() => handleClick(rowIndex)}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isItemSelected}
                                            onChange={() => handleClick(rowIndex)}
                                        />
                                    </TableCell>
                                    <TableCell style={{ color: "blue" }}>
                                        <CellWithFlag flag={row.flags.contact}>{row.contact}</CellWithFlag>
                                    </TableCell>
                                    <TableCell>
                                        <CellWithFlag flag={row.flags.name}>{row.name}</CellWithFlag>
                                    </TableCell>
                                    <TableCell>
                                        <CellWithFlag flag={row.flags.address}>{row.address}</CellWithFlag>
                                    </TableCell>
                                    <TableCell>
                                        <CellWithFlag flag={row.flags.startDate}>{row.startDate}</CellWithFlag>
                                    </TableCell>
                                    <TableCell>
                                        <CellWithFlag flag={row.flags.batchGenerated}>
                                            <BatchFormat label={row.batchGenerated} />
                                        </CellWithFlag>
                                    </TableCell>
                                    <TableCell>
                                        <CellWithFlag flag={row.flags.quantityReceive}>
                                            <QuantityReceivedChip status={row.quantityReceive} />
                                        </CellWithFlag>
                                    </TableCell>
                                    <TableCell>
                                        <CellWithFlag flag={row.flags.vendorCode}>{row.vendorCode}</CellWithFlag>
                                    </TableCell>
                                    <TableCell>
                                        <CellWithFlag flag={row.flags.billClause}>{row.billClause}</CellWithFlag>
                                    </TableCell>
                                    <TableCell>
                                        <CellWithFlag flag={row.flags.tags}>
                                            <TagsFormat label={row.tags} />
                                        </CellWithFlag>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
            </Box>
            </div>
            </div>

            </Box>
        </div>

        <Modal open = {showModal}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "900px",
                    height: "530px",
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 6,
                    borderRadius: 4,
                }}
                >
                { step === 0 && (
                <Box className = "step0">
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
                    <Button
                    onClick={() => {setShowModal(false)}}
                    variant="outlined"
                    style={{
                        textTransform: "none", 
                        fontSize: "18px", 
                        padding: "10px 20px 10px 20px", 
                        border: "1px solid gray"
                        }} 
                    className="actions">Cancel</Button>
                    <Button
                    onClick={() => { setStep((prev) => prev + 1)}}
                    variant="contained"
                    style={{
                        textTransform: "none", 
                        fontSize: "18px", 
                        padding: "10px 25px 10px 25px"
                        }} 
                    className="actions">Next</Button>
                </div>
                </Box>
                )}

                { step === 1 && (
                    <Box className = "step1">
                        <div className="st">
                        <div className="stepper">
                        <ProgressStepper activeStep={1}/>
                        </div>
                        </div>
                        <div className="choose">
                        <p style={{fontWeight: 500}}>New Extraction</p>
                        </div>
                        <div className="descopt">
                            <p>Description</p>
                            <p style={{color: "gray"}}>(Optional)</p>
                        </div>
                        <Box className = "descbox">
                            <TextField
                                variant="outlined"
                                fullWidth
                                multiline
                                minRows={4}
                                maxRows={8}
                                placeholder="Enter your description here..."
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                    borderRadius: '10px',
                                    backgroundColor: '#EFF8FF', // light blue background
                                    '& fieldset': {
                                        borderColor: '#2B80EC', // blue border
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#2B80EC', // darker blue on hover
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#2B80EC', // even darker blue when focused
                                    },
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                    fontSize: '18px', // increase placeholder size
                                    color: '#555',
                                    },
                                }}
                            />
                        </Box>

                        <Box className = "content-container">
                            {items.map((item, index) => (
                                <Box className = "content">{item}</Box>
                            ))}
                            <Button
                            variant="text"
                            startIcon = {<AddIcon/>}
                            sx={{textTransform: "none", fontSize: "18px", color: "#1093FF"}}
                            >
                                Add another
                            </Button>
                        </Box>

                        <div className="buttons">
                            <Button
                            onClick={() => {setShowModal(false); setStep(0)}}
                            variant="outlined"
                            style={{
                                textTransform: "none", 
                                fontSize: "18px", 
                                padding: "10px 20px 10px 20px", 
                                border: "1px solid gray"
                                }} 
                            className="actions">Cancel</Button>
                            <Button
                            onClick={() => { setStep((prev) => prev + 1)}}
                            variant="contained"
                            style={{
                                textTransform: "none", 
                                fontSize: "18px", 
                                padding: "10px 25px 10px 25px"
                                }} 
                            className="actions">Next</Button>
                        </div>

                    </Box>
                )}

                { step === 2 && (
                    <Box className = "step2">
                        
                        <div className="st">
                        <div className="stepper">
                        <ProgressStepper activeStep={2}/>
                        </div>
                        </div>
                        
                        <div className="choose">
                        <p style={{fontWeight: 500}}>Upload your files</p>
                        </div>

                        <Box className = "upload-box">
                            <Box><UploadCustomIcon /></Box>
                            <Box sx = {{mt: "20px", textAlign: "center"}} className = "clickupl">
                                <p><span style={{color: "#2B80EC"}}><u><a>Click to Upload</a></u></span>{' '}
                                <span>or Drag and drop </span></p>
                               <p>a contract PDF or Word doc</p>
                            </Box>
                        </Box>
                        <p className="or">Or</p>
                        <Box style = {{display: "flex", justifyContent: "center", marginTop: "20px"}}>
                        <Button
                            onClick={() => {setShowModal(false); setStep(0)}}
                            variant="outlined"
                            className="skipbutt" 
                            style={{
                                textTransform: "none", 
                                fontSize: "18px", 
                                padding: "10px 20px 10px 20px", 
                                border: "1px solid gray"
                                }} 
                            >Skip
                        </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Modal>


    </div>
  );
}

export default Dashboard;