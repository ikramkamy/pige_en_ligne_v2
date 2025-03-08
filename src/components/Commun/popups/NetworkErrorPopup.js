
import * as React from "react";
import WarningIcon from '@mui/icons-material/Warning';
import { UseMediaDashboardStore } from "store/dashboardStore/MediaDashboardStore";
import {
  Dialog,
  DialogActions,
  Button,

} from "@mui/material";

import { Container, Row} from "react-bootstrap";

const NetworkErrorPopup = ({ 
  OpenNetworkPopup,
  handleCloseNetworkPopup,
  message
   }) => {

  return (<Dialog open={OpenNetworkPopup} onClose={handleCloseNetworkPopup}>    
    <Container
      fluid
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        padding: "20%",
        width:"100%",
        
      }}
    >
      <Row  style={{}}>
        <div style={{
          display: 'flex', flexDirection: "column",
          alignItems: 'center', justifyContent: 'center'
        }}>
          <WarningIcon style={{
            marginRight: '18px',
            marginBottom: "18px", fontSize: '54px', color: 'eba4a8'
          }} />
          <span style={{ textAlign: "center",width:"100%", }}>
         {/* Vérifiez votre connexion internet  */}
         {message}
            
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
                 onClick={handleCloseNetworkPopup}
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
export default NetworkErrorPopup;