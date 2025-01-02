import React, { useState } from 'react';
import { Button, CircularProgress, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const LoadingBaseChangeBtn = ({disablebtn}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClick = () => {
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 5000); 
  };

  return (
    <Box display="flex" alignItems="center">
      <Button
      sx={{
        textTransform:"none", 
        width:"100%", 
        marginTop:"10px"}}
        variant="contained"
        color="primary"
        onClick={handleClick}
      
        disabled={loading || success || false}
        //disabled={false}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {loading ? 'Appliquer...' : success ? 'Appliquer!' : 'Appliquer'}
         </Button>
        {success && (
        <CheckCircleIcon
          style={{ color: 'green', marginLeft: '10px' }}
        />
      )}
    </Box>
  );
};

export default LoadingBaseChangeBtn;