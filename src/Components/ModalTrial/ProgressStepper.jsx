import React from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const steps = [1, 2, 3, 4, 5];

const CustomStepIcon = (props) => {
  const { active, completed, className } = props;

  // COMPLETED: blue filled circle with white tick
  if (completed) {
    return (
      <Box
        className={className}
        sx={{
          width: "20px",
          height: "20px",
          borderRadius: '50%',
          bgcolor: '#1976d2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #1976d2',
        }}
      >
        <CheckIcon sx={{ color: 'white', fontSize: 16 }} />
      </Box>
    );
  }

  // ACTIVE: grey filled circle with grey dot
  if (active) {
    return (
      <Box
        className={className}
        sx={{
          width: "20px",
          height: "20px",
          borderRadius: '50%',
          bgcolor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: "1px solid gray"
        }}
      >
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            bgcolor: 'gray',
          }}
        />
      </Box>
    );
  }

  // INACTIVE: empty grey circle
  return (
    <Box
      className={className}
      sx={{
        width: "20px",
        height: "20px",
        borderRadius: '50%',
        border: '2px solid #bdbdbd', // light grey border
        bgcolor: 'transparent',
      }}
    />
  );
};

const ProgressStepper = ({ activeStep }) => {
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((_, index) => (
        <Step key={index}>
          <StepLabel StepIconComponent={CustomStepIcon} />
        </Step>
      ))}
    </Stepper>
  );
};

export default ProgressStepper;