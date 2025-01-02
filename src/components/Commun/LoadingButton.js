import React, { useState } from 'react';
import { Button, CircularProgress, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const LoadingButton = ({isloading,isSucces,handelUpdatePassword,disablebtn}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClick = () => {
    setLoading(isloading);
    setSuccess(isSucces);
    console.log('disablebtn',disablebtn)
    handelUpdatePassword()
    // // Simulate an API call
    // setTimeout(() => {
    //   setLoading(false);
    //   setSuccess(true);
    // }, 2000); 
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
      
        //disabled={loading || success || disablebtn}
        disabled={!disablebtn}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {loading ? 'Envoi...' : success ? 'Envoyé!' : 'Envoyer'}
         </Button>
        {success && (
        <CheckCircleIcon
          style={{ color: 'green', marginLeft: '10px' }}
        />
      )}
    </Box>
  );
};

export default LoadingButton;