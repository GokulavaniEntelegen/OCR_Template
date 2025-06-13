import React from 'react';
import { TextField, Grid, Typography, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import styles from "./CustomerForm.module.scss"


const CustomerForm = () => {
  return (
    <Box className={styles.container}  p={3}>
      <Grid container spacing={2}>
        {/* Row 1 */}
        <Grid item xs={6} sx={{width:315}}>
          <Typography sx={{ fontFamily: 'Poppins, sans-serif' }} className={styles.fieldLabel} variant="subtitle2" gutterBottom>
            Customer Name
          </Typography>
          <TextField
          className={styles.textField}
            fullWidth
            defaultValue="Jhon Dor"
           
          />
        </Grid>

        <Grid item xs={6} sx={{width:315}}>
          <Typography sx={{ fontFamily: 'Poppins, sans-serif' }} className={styles.fieldLabel} variant="subtitle2" gutterBottom>
            Address
          </Typography>
          <TextField
          className={styles.textField}
            fullWidth
            defaultValue="101 Townsend Street, San..."
          />
        </Grid>

        {/* Repeat Row 2 */}
        <Grid item xs={4} sx={{width:315}}>
          <Typography sx={{ fontFamily: 'Poppins, sans-serif' }} className={styles.fieldLabel} variant="subtitle2" gutterBottom>
            Customer Name
          </Typography>
          <TextField
          className={styles.textField}
            fullWidth
            defaultValue="Jhon Dor"
          />
        </Grid>

        <Grid item xs={4} sx={{width:315}}>
          <Typography sx={{ fontFamily: 'Poppins, sans-serif' }} className={styles.fieldLabel} variant="subtitle2" gutterBottom>
            Address
          </Typography>
          <TextField
          className={styles.textField}
            fullWidth
            defaultValue="101 Townsend Street, San..."
          />
        </Grid>

        
       <Grid container >
  <Grid item xs={4}>
    <Typography sx={{ fontFamily: 'Poppins, sans-serif',paddingRight:'50px' }} className={styles.fieldLabel}>Customer Name</Typography>
    <TextField fullWidth defaultValue="Jhon Dor" />
  </Grid>
  <Grid item xs={4}>
    <Typography sx={{ fontFamily: 'Poppins, sans-serif',paddingRight:'10px' }} className={styles.fieldLabel}>Address</Typography>
    <TextField fullWidth defaultValue="101 Townsend..." />
  </Grid>
  <Grid item xs={4}>
    <Typography sx={{ fontFamily: 'Poppins, sans-serif',paddingRight:'10px' }} className={styles.fieldLabel}>Address</Typography>
    <TextField fullWidth defaultValue="101 Townsend..." />
  </Grid>
</Grid>

      </Grid>
    </Box>
  );
};

export default CustomerForm;
