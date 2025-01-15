import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Grid
  } from "@mui/material";
  import { Info as InfoIcon, AccessTime as AccessTimeIcon, 
    Description as DescriptionIcon, FormatListBulleted as FormatListIcon } from '@mui/icons-material';
    import { styled } from '@mui/system';
    const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
      //backgroundColor: theme.palette.primary.main,
      //color: theme.palette.common.white,
      fontWeight: 'bold',
      textAlign: 'center',
    }));
    
    const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
      //padding: theme.spacing(3),
    }));
    
    const InfoRow = styled(Grid)(({ theme }) => ({
      //marginBottom: theme.spacing(1),
    }));
    
    const StyledTypography = styled(Typography)(({ theme }) => ({
      // fontWeight: '500',
      // color: theme.palette.text.primary,
    }));
const MessageLibPopUp=({popupOpen,handleClosePopup,media, popupData})=>{
return(


    <Dialog open={popupOpen} onClose={handleClosePopup}
    sx={{backgroundColor:"", padding:"10px",
     maxWidth:"100%",width:"100%", borderRadius:"5px"}} fullWidth>
   {/* Dialog Title with background color */}
   <StyledDialogTitle>
     <InfoIcon sx={{ mr: 1,color:"#00a6e0" ,}} />
     <span>Details</span>
   </StyledDialogTitle>

   <StyledDialogContent>
     {popupData ? (
       <>
         <InfoRow container alignItems="center">
           <Grid item xs={4}>
             <StyledTypography variant="body2" color="textSecondary">
               Id:
             </StyledTypography>
           </Grid>
           <Grid item xs={8}>
             <StyledTypography variant="body2">{popupData.id}</StyledTypography>
           </Grid>
         </InfoRow>

         <InfoRow container alignItems="center">
           <Grid item xs={4}>
             <StyledTypography variant="body2" color="textSecondary">
               Support:
             </StyledTypography>
           </Grid>
           <Grid item xs={8}>
             <StyledTypography variant="body2">{popupData.Support_Lib}</StyledTypography>
           </Grid>
         </InfoRow>

         <InfoRow container alignItems="center">
           <Grid item xs={4}>
             <StyledTypography variant="body2" color="textSecondary">
               Date:
             </StyledTypography>
           </Grid>
           <Grid item xs={8}>
             <StyledTypography variant="body2">{popupData.Date}</StyledTypography>
           </Grid>
         </InfoRow>

         <InfoRow container alignItems="center">
           <Grid item xs={4}>
             <StyledTypography variant="body2" color="textSecondary">
               Produit:
             </StyledTypography>
           </Grid>
           <Grid item xs={8}>
             <StyledTypography variant="body2">{popupData.Produit_Lib}</StyledTypography>
           </Grid>
         </InfoRow>

         <InfoRow container alignItems="center">
           <Grid item xs={4}>
             <StyledTypography variant="body2" color="textSecondary">
               Format:
             </StyledTypography>
           </Grid>
           <Grid item xs={8}>
             <StyledTypography variant="body2">
               {media ? (media === 'presse' ?
                  popupData.NB_C : popupData.Durée_Réelle) : popupData.Durée_Réelle}
             </StyledTypography>
           </Grid>
         </InfoRow>

         {media && media === 'presse' && (
           <InfoRow container alignItems="center">
             <Grid item xs={4}>
               <StyledTypography variant="body2" color="textSecondary">
                 Page:
               </StyledTypography>
             </Grid>
             <Grid item xs={8}>
               <StyledTypography variant="body2">{popupData.Page}</StyledTypography>
             </Grid>
           </InfoRow>
         )}

         <InfoRow container alignItems="center">
           <Grid item xs={4}>
             <StyledTypography variant="body2" color="textSecondary">
               Msg:
             </StyledTypography>
           </Grid>
           <Grid item xs={8}>
           
             <Typography variant="body2">{popupData.Message_Lib}</Typography>
           </Grid>
         </InfoRow>
       </>
     ) : (
       <Typography variant="body2" color="textSecondary">
         Données indisponibles
       </Typography>
     )}
   </StyledDialogContent>

   <DialogActions>
     <Button onClick={handleClosePopup} color="primary" variant="contained">
       Fermer
     </Button>
   </DialogActions>
 </Dialog>
)
}
export default MessageLibPopUp;
