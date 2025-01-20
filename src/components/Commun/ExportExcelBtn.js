import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { UseFiltersStore } from 'store/dashboardStore/FiltersStore';
import { UsePigeDashboardStore } from 'store/dashboardStore/PigeDashboardStore';
import ExcelIcon from 'assets/img/icons/xls-file.png';
import { Download } from '@mui/icons-material';
const ExportExcelBtn = ({title,isloading,isSucces,handelUpdatePassword,disablebtn, getData}) => {
  const { getDataPresse,
    PressData, sendDownloadLink,
    IsPressdataisFetched,ResePressdataisFetched} = UsePigeDashboardStore((state) => state);
  const [loading, setLoading] = useState(false);
  const {media,
    base}=UseFiltersStore((state)=>state)
  const [success, setSuccess] = useState(false);
  const [disableDataBtn,setDisableDataBtn]=useState(false)

  useEffect(()=>{
    setLoading(isloading);
    setSuccess(isSucces)
   
  },[media,isloading,isSucces])
  const handleClick = () => {
    setLoading(isloading);
    setSuccess(isSucces); 
console.log('is loading',isloading)    
  
    getData()
    //GetData()
    //handelUpdatePassword()
    // Simulate an API call
    // setTimeout(() => {
    //   setLoading(false);
    //   setSuccess(true);
    // }, 2000); 
  };

  return (
    <Box display="flex" alignItems="center" sx={{backgroundColor:"white", marginRight:"10px",

      borderRadius:"5px"
    }}>
      <Button
      sx={{
        textTransform:"none", 
       
        width:"100%",
        textTransform:"none",
        backgroundColor: '#00a6e0',
        textTransform: "none",
        width: "fit-content",
        color: '',
        '&:hover': {
          backgroundColor: '#00a6e0',
        }
      }}
        variant="contained"
        color="primary"
        onClick={handleClick}
       
        disabled={loading || success || disablebtn}
        //disabled={!disablebtn}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {/* <img src={ExcelIcon} width="25px" style={{backgroundColor:"transparent", marginLeft:"1px"}}/> */}
        
        <Download color='green' width="20px"/>
        
        {loading ? 'Envoi...' : success ? title : title}
         </Button>
        
    
     
    </Box>
  );
};

export default ExportExcelBtn;