
import * as React from "react";
import WarningIcon from '@mui/icons-material/Warning';
import { UseMediaDashboardStore } from "store/dashboardStore/MediaDashboardStore";
import {
  Dialog,
  DialogActions,
  Button,

} from "@mui/material";

import { Container, Row} from "react-bootstrap";

const DataUnavailablePopup = ({ 
  media,
  ErrorHandel,
  HandelErrorPopup,
  handleClosePopup
   }) => {
  // const {ErrorHandel,HandelErrorPopup}=UseMediaDashboardStore((state)=>state)
  // const handleClosePopup=()=>{
  //   HandelErrorPopup && HandelErrorPopup(false)
  // }
  const media_type = media === "television" ? "Télévision" :
  media === "presse" ? "Presse" :
  media === "radio" ? "Radio" :""
  return (<Dialog open={ErrorHandel} onClose={handleClosePopup}>    
    <Container
      fluid
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        padding: "20%"
      }}
    >
      <Row >
        <div style={{
          display: 'flex', flexDirection: "column",
          alignItems: 'center', justifyContent: 'center'
        }}>
          <WarningIcon style={{
            marginRight: '18px',
            marginBottom: "18px", fontSize: '54px', color: 'eba4a8'
          }} />
          <span style={{ textAlign: "center" }}>
          Aucune données {media_type} n'as été enregistrée. 
            
          </span>
        </div>
      </Row>
      <DialogActions sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
      }}>
           <Button
                 onClick={handleClosePopup}
                 sx={{
                   textTransform: "none",
                   width: "150px",
                   textTransform: "none",
                   margin: "0px",
                   backgroundColor: '#00a6e0',
                   textTransform: "none",
                   width: "fit-content",
                   color: 'white',
                   '&:hover': {
                     backgroundColor: '#00a6e0',
                   }
                 }}>
                Fermer
               </Button>
      </DialogActions>
    </Container>

  </Dialog>
  )
}
export default DataUnavailablePopup;