import React, { useState, useEffect, useRef, useCallback } from "react";
// import "../style/invoice-preview.css"; // External CSS
// import { IoNotifications } from "react-icons/io5";
// import { CgProfile } from "react-icons/cg";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
// import Logo from "../image/logo.png";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Annotorious } from '@recogito/annotorious';
// import '@recogito/annotorious/dist/annotorious.min.css'; // Import Annotorious CSS
// import OpenSeadragon from 'openseadragon';
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh"; // Import the Refresh icon
import styles from "./ContractScan.module.scss";
// import styles from "./CustomerForm.module.scss";
import Delete1 from "../../assets/Delete1.svg";
import Download from "../../assets/Download.svg";
import Copy1 from "../../assets/Copy1.svg";
import Open from "../../assets/Open.svg";
import Reset from "../../assets/Reset.svg";

const ContractScan = () => {
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}.${month}.${year}`;
    // return `<span class="math-inline">\{day\}\.</span>{month}.${year}`;
  };

  const [images, setImages] = useState([]);
  // const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const annotator = useRef(null);
  const viewerRef = useRef(null);
  const [annotationMode, setAnnotationMode] = useState("view"); // 'view', 'create', 'edit'
  const [isAnnotatorInitialized, setIsAnnotatorInitialized] = useState(false);
  const [osdError, setOsdError] = useState(false);
  const [currentAnnotations, setCurrentAnnotations] = useState([]);

  const handleReset = () => {
    setFormData({
      date: "",
      companyName: "",
      invoiceNo: "",
      invoiceDate: "",
      productName: "",
      gstNo: "",
      price: "",
      sellerName: "",
      buyerName: "",
      sellerAddress: "",
      buyerAddress: "",
    });
  };

  const [formData, setFormData] = useState({
    date: getCurrentDate(),
    companyName: "",
    invoiceNo: "",
    invoiceDate: "",
    productName: "",
    gstNo: "",
    price: "",
    sellerName: "",
    buyerName: "",
    sellerAddress: "",
    buyerAddress: "",
  });

  const setAnnotationModeHandler = useCallback((mode) => {
    setAnnotationMode(mode);
    if (annotator.current) {
      annotator.current.setDrawingEnabled(mode === "create");
    }
    console.log("Requested annotation mode:", mode);
  }, []);

  // const initializeAnnotorious = useCallback(async (imageUrl) => {
  //     if (!viewerRef.current || !viewerRef.current.world || viewerRef.current.world.getItemCount() === 0) {
  //         // console.log('OpenSeadragon viewer not fully initialized, delaying Annotorious.');
  //         return;
  //     }

  //     if (annotator.current) {
  //         annotator.current.destroy();
  //         annotator.current = null;
  //     }

  //     const osdElement = viewerRef.current.world.getItemAt(0).element;
  //     annotator.current = new Annotorious({
  //         image: osdElement,
  //         widgets: [],
  //     });

  //     annotator.current.on('createAnnotation', (annotation) => {
  //         console.log('Annotation created', annotation);
  //         setCurrentAnnotations(prev => [...prev, annotation]);
  //     });

  //     annotator.current.on('updateAnnotation', (annotation) => {
  //         console.log('Annotation updated', annotation);
  //         setCurrentAnnotations(prev => prev.map(ann => ann.id === annotation.id ? annotation : ann));
  //     });

  //     annotator.current.on('deleteAnnotation', (annotation) => {
  //         console.log('Annotation deleted', annotation);
  //         setCurrentAnnotations(prev => prev.filter(ann => ann.id !== annotation.id));
  //     });

  //     setIsAnnotatorInitialized(true);
  //     console.log('Annotorious initialized');
  // }, []);

  // const initializeViewer = useCallback(async () => {
  //     console.log('initializeViewer called');
  //     setOsdError(false);
  //     if (!images[currentImage]) {
  //         console.log('No image found, skipping viewer initialization');
  //         return;
  //     }
  //     if (!images[currentImage].type.startsWith('image/')) {
  //         console.log('File is not an image, skipping viewer initialization');
  //         return;
  //     }
  //     console.log('Image type for initialization:', images[currentImage].type);
  //     setIsProcessing(true);
  //     try {
  //         // Clean up existing viewer
  //         if (viewerRef.current) {
  //             viewerRef.current.destroy();
  //             viewerRef.current = null;
  //         }
  //         // Ensure the container exists
  //         // const container = document.getElementById('openseadragon-viewer');
  //         if (!container) {
  //             console.error("OpenSeadragon container not found in DOM.");
  //             setOsdError(true);
  //             setIsProcessing(false);
  //             return;
  //         }

  //         viewerRef.current = OpenSeadragon({
  //             id: 'openseadragon-viewer',
  //             tileSources: {
  //                 type: 'image',
  //                 url: images[currentImage].url,
  //                 buildPyramid: false
  //             }
  //         });

  //         viewerRef.current.addHandler('open', () => {
  //             console.log('Viewer opened, initializing Annotorious');
  //             initializeAnnotorious(images[currentImage].url);
  //         });

  //         console.log('Viewer loading...');
  //         setIsProcessing(false);
  //         console.log('Viewer initialized');
  //     } catch (error) {
  //         setOsdError(true);
  //         console.error('Error initializing viewer:', error);
  //         setIsProcessing(false);
  //         setIsAnnotatorInitialized(false);
  //         alert('Error initializing viewer: ' + error.message);
  //     }
  // }, [images, currentImage, initializeAnnotorious]);

  // useEffect(() => {
  //     if (images.length > 0 && currentImage < images.length) {
  //         initializeViewer();
  //     }
  // }, [currentImage, images, initializeViewer]);

  // useEffect(() => {
  //     if (annotator.current && annotationMode === 'view') {
  //         annotator.current.setDrawingEnabled(false);
  //     } else if (annotator.current && annotationMode === 'create') {
  //         annotator.current.setDrawingEnabled(true);
  //     }
  // }, [annotationMode]);

  // const extractDataFromAnnotations = async () => {
  //     if (!annotator.current) {
  //         console.error('Annotorious not initialized');
  //         return;
  //     }

  //     const annotations = annotator.current.getAnnotations();
  //     const extractedData = {};

  //     annotations.forEach(annotation => {
  //         const label = annotation.body[0]?.value;
  //         if (label && annotation.target?.selector?.type === 'xywh') {
  //             const { x, y, w, h } = annotation.target.selector.value;
  //             // Basic mapping - you'll likely need more sophisticated logic
  //             // based on the label and the region's content (OCR).
  //             if (label === 'invoice_no') extractedData.invoiceNo = `(${x}, ${y}, ${w}, ${h})`;
  //             if (label === 'invoice_date') extractedData.invoiceDate = `(${x}, ${y}, ${w}, ${h})`;
  //             if (label === 'company_name') extractedData.companyName = `(${x}, ${y}, ${w}, ${h})`;
  //             if (label === 'gst') extractedData.gstNo = `(${x}, ${y}, ${w}, ${h})`;
  //             if (label === 'price') extractedData.price = `(${x}, ${y}, ${w}, ${h})`;
  //             // Add more mappings as needed
  //         }
  //     });

  //     // Update form data based on extractedData
  //     setFormData(prevData => ({
  //         ...prevData,
  //         ...extractedData,
  //     }));

  //     console.log('Extracted data from annotations:', extractedData);
  // };

  // const uploadFile = async () => {
  //     const formData = new FormData();
  //     images.forEach((img) => formData.append('invoice', img.file));

  //     try {
  //         const response = await axios.post(`/upload`, formData, {
  //             headers: { 'Content-Type': 'multipart/form-data' }
  //         });

  //         if (response.data.success) {
  //             const initialExtractedData = response.data.extractedData || {};
  //             const initialBoxes = response.data.boxes || [];

  //             setFormData((prevData) => ({
  //                 ...prevData,
  //                 date: getCurrentDate(),
  //                 companyName: initialExtractedData.companyName || '',
  //                 invoiceNo: initialExtractedData.invoiceNo || '',
  //                 invoiceDate: initialExtractedData.invoiceDate || '',
  //                 productName: initialExtractedData.productName || '',
  //                 gstNo: initialExtractedData.gstNo || '',
  //                 price: initialExtractedData.price || '',
  //                 sellerName: initialExtractedData.sellerName || '',
  //                 buyerName: initialExtractedData.buyerName || '',
  //                 sellerAddress: initialExtractedData.sellerAddress || '',
  //                 buyerAddress: initialExtractedData.buyerAddress || ''
  //             }));

  //             // Load initial annotations if provided by the backend
  //             if (annotator.current && initialBoxes.length > 0) {
  //                 const annots = initialBoxes.map(box => ({
  //                     id: Math.random().toString(36).substring(7),
  //                     type: 'Annotation',
  //                     body: [{ type: 'TextualBody', value: box.label }],
  //                     target: { selector: { type: 'xywh', value: { x: box.x, y: box.y, w: box.width, h: box.height } } }
  //                 }));
  //                 annotator.current.setAnnotations(annots);
  //                 setCurrentAnnotations(annots);
  //             }

  //         } else {
  //             console.error("Data extraction failed:", response.data.error);
  //         }
  //     } catch (error) {
  //         console.error("Error:", error.response?.data || error.message);
  //     }
  // };

  // const handleGeneratebatch = async () => {
  //     const imageBase64Array = await Promise.all(
  //         images.map((img) => {
  //             return new Promise((resolve, reject) => {
  //                 const reader = new FileReader();
  //                 reader.readAsDataURL(img.file);
  //                 reader.onload = () => resolve(reader.result);
  //                 reader.onerror = (error) => reject(error);
  //             });
  //         })
  //     );

  //     const invoiceData = {
  //         date: formData.date,
  //         companyName: formData.companyName,
  //         invoiceNo: formData.invoiceNo,
  //         invoiceDate: formData.invoiceDate,
  //         productName: formData.productName,
  //         gstNo: formData.gstNo,
  //         price: formData.price,
  //         sellerName: formData.sellerName,
  //         buyerName: formData.buyerName,
  //         sellerAddress: formData.sellerAddress,
  //         buyerAddress: formData.buyerAddress,
  //         images: imageBase64Array,
  //         annotations: currentAnnotations.map(ann => ({
  //             body: ann.body,
  //             target: { selector: ann.target.selector.value }
  //         }))
  //     };

  //     try {
  //         const response = await axios.post(`/generate-batch`, invoiceData);
  //         navigate("/user-dashboard");
  //         if (response.status === 201) {
  //             alert("Invoice successfully saved to Cosmos DB.");
  //         }
  //     } catch (error) {
  //         console.error("Error saving invoice:", error);
  //         alert("Failed to save invoice.");
  //     }
  // };

  // console.log('InvoiceForm render', { images, currentImage, annotationMode, isAnnotatorInitialized });

  return (
    <Box className={styles.invoicePreviewContainer}>
      <Box
        sx={{
          paddingLeft: "20px",
          paddingRight: "20px",
          fontWeight: "600",
          fontSize: "20px",
        }}
      >
        Contract Scan
      </Box>
      {/* <div className="header">
                <div className="logo">
                    <img src={Logo} alt="Logo" />
                </div>
                <div className="header-icons">
                    <IoNotifications className="icon" />
                    <CgProfile className="icon" />
                </div>
            </div> */}

      {/* Main Content */}
      <Box className={styles.mainContent}>
        {/* Preview Section */}
        <div className={styles.previewSection}>
          {/* <h2>Review</h2> */}

          {images.length > 0 ? (
            <div className={styles.imageCarousel}>
              <div
                className={styles.carouselContainer}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                {images.map((file, index) => (
                  <div key={index} className={styles.carouselItem}>
                    {file.type === "application/pdf" ? (
                      <iframe
                        src={file.url}
                        title={`Invoice Preview ${index + 1}`}
                        className={styles.invoicePdf}
                        width="100%"
                        height="500px"
                      />
                    ) : (
                      <div
                        className={styles.imageContainer}
                        style={{ position: "relative" }}
                      >
                        {index === currentImage ? (
                          <div
                            style={{
                              width: "100%",
                              height: "500px",
                              position: "relative",
                            }}
                          >
                            {!osdError ? (
                              <div
                                id="openseadragon-viewer"
                                style={{ width: "100%", height: "100%" }}
                              ></div>
                            ) : (
                              <>
                                <img
                                  src={file.url}
                                  alt={`Invoice Preview ${index + 1}`}
                                  className={styles.invoiceImage}
                                  style={{
                                    width: "100%",
                                    height: "500px",
                                    objectFit: "contain",
                                    background: "#eee",
                                  }}
                                />
                                <div
                                  style={{
                                    color: "red",
                                    position: "absolute",
                                    top: 10,
                                    left: 10,
                                  }}
                                >
                                  Failed to load advanced viewer. Showing
                                  fallback image.
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <img
                            src={file.url}
                            alt={`Invoice Preview ${index + 1}`}
                            className={styles.invoiceImage}
                          />
                        )}
                        {index === currentImage && isProcessing && (
                          <div
                            className={styles.processing-overlay}
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                            }}
                          >
                            Processing invoice...
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {images.length > 1 && (
                <div className={carouselControls}>
                  <button
                    onClick={() =>
                      setCurrentImage((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1
                      )
                    }
                    className={styles.carouselButton}
                  >
                    <IoChevronBackOutline />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImage((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className={styles.carouselButton}
                  >
                    <IoChevronForwardOutline />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Box className={styles.uploadSection}>
              <input
                type="file"
                id="file-upload"
                accept="image/*,.pdf"
                multiple
                onChange={(e) => {
                  const uploadedFiles = Array.from(e.target.files);
                  const newFiles = uploadedFiles.map((file) => ({
                    file,
                    type: file.type,
                    url: URL.createObjectURL(file),
                  }));
                  console.log("Files uploaded:", newFiles);
                  setImages((prev) => [...prev, ...newFiles]);
                  // Automatically trigger upload after selecting files
                  // if (newFiles.length > 0) {
                  //     uploadFile();
                  // }
                }}
                style={{ display: "none" }}
              />
              <label htmlFor="file-upload" className={styles.uploadButton}>
                Upload Invoice
              </label>
              {images.length > 0 && (
                <button
                  type="button"
                  onClick={uploadFile}
                  className={styles.uploadBtn}
                  style={{ marginLeft: "10px" }}
                >
                  Process Upload
                </button>
              )}
            </Box>
          )}

          {images.length > 0 && (
            <div className={styles.annotationControls}>
              <button
                className={`annotation-button ${
                  annotationMode === "view" ? "active" : ""
                }`}
                onClick={() => {
                  setAnnotationModeHandler("view");
                }}
                disabled={!isAnnotatorInitialized || isProcessing}
              >
                View
              </button>
              <button
                className={`annotation-button ${
                  annotationMode === "create" ? "active" : ""
                }`}
                onClick={() => {
                  console.log("Create Annotation button clicked");
                  setAnnotationModeHandler("create");
                }}
                disabled={!isAnnotatorInitialized || isProcessing}
              >
                Create Annotation
              </button>
              <button
                className={`annotation-button ${
                  annotationMode === "edit" ? "active" : ""
                }`}
                onClick={() => {
                  console.log("Edit Annotations button clicked");
                  setAnnotationModeHandler("edit");
                }}
                disabled={!isAnnotatorInitialized || isProcessing}
              >
                Edit Annotations
              </button>
              <button
                className={styles.extractDataBtn}
                onClick={extractDataFromAnnotations}
                disabled={!isAnnotatorInitialized || isProcessing}
              >
                Extract Data
              </button>
            </div>
          )}
        </div>

        {/* Form Section */}
        <Box className={styles.formSection}>
          <Box className={styles.HeaderContainer}>
            <Box className={styles.HeaderContainer1}>
              <h2>Edit Result</h2>
              </Box>
              <Box className={styles.refresh}>
                <img src={Delete1} width={"15px"} height={"15px"} />
                <img src={Download} width={"15px"} height={"15px"} />
                <img src={Copy1} width={"15px"} height={"15px"} />
                <img src={Open} width={"15px"} height={"15px"} />
                <Button
                  variant="outlined"
                  color="skyblue"
                  sx={{
                    color: "#009CFF",
                    borderColor: "#72777F",
                    fontSize: "13px",
                  }}
                  startIcon={<img src={Reset} />}
                  onClick={handleReset}
                >
                  Reset
                </Button>
            </Box>
          </Box>
          <Box>
            <Box className={styles.container}>
              <Box>
                  <Grid  className={styles.fields}>
                    <Grid className={styles.customerName}>
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 400,
                        }}
                        className={styles.fieldLabel}
                        variant="label"
                        // gutterBottom
                      >
                        Customer Name
                      </Typography>
                      <TextField className={styles.textField} fullWidth />
                    </Grid>

                    <Grid className={styles.customerName}>
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 400,
                        }}
                        className={styles.fieldLabel}
                        variant="label"
                        // gutterBottom
                      >
                        Address
                      </Typography>
                      <TextField className={styles.textField} fullWidth />
                    </Grid>
                  </Grid>
                  <Grid sx={{paddingTop:'3px'}} className={styles.fields}>
                    <Grid className={styles.customerName}>
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 400,
                          
                        }}
                        className={styles.fieldLabel}
                        variant="label"
                        // gutterBottom
                      >
                        Customer Name
                      </Typography>
                      <TextField className={styles.textField} fullWidth />
                    </Grid>
                    <Grid className={styles.customerName}>
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 400,
                        }}
                        className={styles.fieldLabel}
                        variant="label"
                        // gutterBottom
                      >
                        Address
                      </Typography>
                      <TextField className={styles.textField} fullWidth />
                    </Grid>
                  </Grid>

                  <Grid sx={{paddingTop:'3px'}} className={styles.addressContainer}>
                    <Grid className={styles.address}>
                      <Typography
                        variant="label"
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                        className={styles.fieldLabel}
                        // gutterBottom
                      >
                        Customer Name
                      </Typography>
                      <TextField className={styles.textField} fullWidth />
                    </Grid>
                    <Grid className={styles.address}>
                      <Typography
                        variant="label"
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                        className={styles.fieldLabel}
                        // gutterBottom
                      >
                        Address
                      </Typography>
                      <TextField className={styles.textField} fullWidth />
                    </Grid>
                    <Grid className={styles.address}>
                      <Typography
                        variant="label"
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                        className={styles.fieldLabel}
                        // gutterBottom
                      >
                        Address
                      </Typography>
                      <TextField className={styles.textField} fullWidth />
                    </Grid>
                  </Grid>
              </Box>

              <Box paddingTop={3}>
                <Box
                  className={styles.header}
                  component="h3"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  Heading 1
                </Box>
                <Box >
                  <Grid className={styles.fields}>
                    <Grid className={styles.customerName}>
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 400,
                        }}
                        className={styles.fieldLabel}
                        variant="label"
                        // gutterBottom
                      >
                        Customer Name
                      </Typography>
                      <TextField className={styles.textField} fullWidth />
                    </Grid>

                    <Grid className={styles.customerName}>
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 400,
                        }}
                        className={styles.fieldLabel}
                        variant="label"
                        // gutterBottom
                      >
                        Address
                      </Typography>
                      <TextField className={styles.textField} fullWidth />
                    </Grid>
                  </Grid>
                  <Grid sx={{paddingTop:'3px'}} className={styles.fields}>
                    <Grid className={styles.customerName}>
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 400,
                        }}
                        className={styles.fieldLabel}
                        variant="label"
                        // gutterBottom
                      >
                        Customer Name
                      </Typography>
                      <TextField className={styles.textField} fullWidth />
                    </Grid>

                    <Grid className={styles.customerName}>
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 400,
                        }}
                        className={styles.fieldLabel}
                        variant="label"
                        // gutterBottom
                      >
                        Address
                      </Typography>
                      <TextField className={styles.textField} fullWidth />
                    </Grid>
                  </Grid>
                  <Grid sx={{paddingTop:'3px'}} className={styles.fields}>
                    <Grid className={styles.customerName}>
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 400,
                        }}
                        className={styles.fieldLabel}
                        variant="label"
                        // gutterBottom
                      >
                        Customer Name
                      </Typography>
                      <TextField className={styles.textField} fullWidth />
                    </Grid>

                    <Grid className={styles.customerName}>
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 400,
                        }}
                        className={styles.fieldLabel}
                        variant="label"
                        // gutterBottom
                      >
                        Address
                      </Typography>
                      <TextField className={styles.textField} fullWidth />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Box paddingTop={3}>
                <Box
                  className={styles.header}
                  component="h3"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  Heading 2
                </Box>
                <Box >
                  <Grid className={styles.fields}>
                    <Grid className={styles.customerName}>
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 400,
                        }}
                        className={styles.fieldLabel}
                        variant="label"
                        // gutterBottom
                      >
                        Customer Name
                      </Typography>
                      <TextField className={styles.textField} fullWidth />
                    </Grid>

                    <Grid className={styles.customerName}>
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 400,
                        }}
                        className={styles.fieldLabel}
                        variant="label"
                        // gutterBottom
                      >
                        Address
                      </Typography>
                      <TextField className={styles.textField} fullWidth />
                    </Grid>
                  </Grid>
                  <Grid sx={{paddingTop:'3px'}} className={styles.fields}>
                    <Grid className={styles.customerName}>
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 400,
                        }}
                        className={styles.fieldLabel}
                        variant="label"
                        // gutterBottom
                      >
                        Customer Name
                      </Typography>
                      <TextField className={styles.textField} fullWidth />
                    </Grid>

                    <Grid className={styles.customerName}>
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 400,
                        }}
                        className={styles.fieldLabel}
                        variant="label"
                        // gutterBottom
                      >
                        Address
                      </Typography>
                      <TextField className={styles.textField} fullWidth />
                    </Grid>
                  </Grid>
                  <Grid sx={{paddingTop:'3px'}} className={styles.fields}>
                    <Grid className={styles.customerName}>
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 400,
                        }}
                        className={styles.fieldLabel}
                        variant="label"
                        // gutterBottom
                      >
                        Customer Name
                      </Typography>
                      <TextField className={styles.textField} fullWidth />
                    </Grid>

                    <Grid className={styles.customerName}>
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 400,
                        }}
                        className={styles.fieldLabel}
                        variant="label"
                        // gutterBottom
                      >
                        Address
                      </Typography>
                      <TextField className={styles.textField} fullWidth />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
            <Box className={styles.FooterContent}>
              <Box className={styles.buttons}>
                <Button
                  variant="outlined"
                  sx={{
                    color: "#009CFF",
                    borderColor: "#72777F",
                    textTransform: "none",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Review Later
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#009CFF",
                    color: "white",
                    borderColor: "#009CFF",
                    textTransform: "none",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Reviewed
                </Button>
              </Box>
            </Box>
            {/* <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="text"
                  id="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="companyName">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="invoiceNo">Invoice No</label>
                <input
                  type="text"
                  id="invoiceNo"
                  value={formData.invoiceNo}
                  onChange={(e) =>
                    setFormData({ ...formData, invoiceNo: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="invoiceDate">Invoice Date</label>
                <input
                  type="text"
                  id="invoiceDate"
                  value={formData.invoiceDate}
                  onChange={(e) =>
                    setFormData({ ...formData, invoiceDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  id="productName"
                  value={formData.productName}
                  onChange={(e) =>
                    setFormData({ ...formData, productName: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="gstNo">GST No</label>
                <input
                  type="text"
                  id="gstNo"
                  value={formData.gstNo}
                  onChange={(e) =>
                    setFormData({ ...formData, gstNo: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  id="price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="sellerName">Seller Name</label>
                <input
                  type="text"
                  id="sellerName"
                  value={formData.sellerName}
                  onChange={(e) =>
                    setFormData({ ...formData, sellerName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="buyerName">Buyer Name</label>
                <input
                  type="text"
                  id="buyerName"
                  value={formData.buyerName}
                  onChange={(e) =>
                    setFormData({ ...formData, buyerName: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="sellerAddress">Seller Address</label>
                <input
                  type="text"
                  id="sellerAddress"
                  value={formData.sellerAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, sellerAddress: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="buyerAddress">Buyer Address</label>
                <input
                  type="text"
                  id="buyerAddress"
                  value={formData.buyerAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, buyerAddress: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                // onClick={uploadFile}
                className="uploadBtn"
              >
                Upload
              </button>
              <button
                type="button"
                // onClick={handleGeneratebatch}
                className="generate-btn"
              >
                Generate Batch
              </button>
            </div> */}
          </Box>
        </Box>
      </Box>
      {osdError && (
        <Box sx={{ color: "red", margin: "1em 0" }}>
          Failed to initialize the image viewer or annotation tool. Please check
          your image file and try again.
        </Box>
      )}
    </Box>
  );
};

export default ContractScan;
