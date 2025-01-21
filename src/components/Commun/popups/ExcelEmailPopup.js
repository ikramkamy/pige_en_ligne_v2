import * as React from "react";
import Alert from '@mui/material/Alert';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  Dialog,
  DialogContent,
  Button,
  Typography,

} from "@mui/material";

const ExcelEmailPopup = ({ 
    DisplayEmailSent,
    handleClosePopupExcelEmail,
    email
}) => {
  return (
  
    <Dialog open={DisplayEmailSent}   onClick={handleClosePopupExcelEmail}>
    <DialogContent sx={{ width: "100%" }}>
      <Typography sx={{ width: "100%" }}>

        <Alert severity="success"

          sx={{
            width: '100%',

          }}
        >Un email a été envoyé à l'adresse suivante:

          {email}

        </Alert>

      </Typography>

       

    </DialogContent>
 
  </Dialog>

  

)
}
export default ExcelEmailPopup;