import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { UseFiltersStore } from 'store/dashboardStore/FiltersStore';
const BtnRechercheAvanace = ({isloading,isSucces,disablebtn,showFilters}) => {
    const {media}=UseFiltersStore((state)=>state)
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleClick = () => {
    console.log("calling")
    showFilters()
    setLoading(true);
    setSuccess(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(false);
    }, 2000); 
  };

  return (
    <Box display="flex" alignItems="center">
      <Button
      sx={{textTransform:"none"}}
        variant="contained"
        color="primary"
        onClick={showFilters}
        disabled={loading || success || disablebtn}
       // disabled={!disablebtn}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {loading ? 'Envoi...' : success ? 'Recherche avancée' : 'Recherche avancée'}
         </Button>
        {success && (
        <CheckCircleIcon
          style={{ color: 'green', marginLeft: '10px' }}
        />
      )}
    </Box>
  );
};

export default BtnRechercheAvanace;