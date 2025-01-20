
import * as React from "react";
import WarningIcon from '@mui/icons-material/Warning';

import {
  Dialog,
  DialogActions,
  Button,

} from "@mui/material";

import { Container, Row, Col } from "react-bootstrap";




const LargeDataPopup = ({ 
  media,
  popupDataLageData,
  handleClosePopupLargeData,
  HandelSideBarPisition }) => {
  return (<Dialog open={popupDataLageData} onClose={handleClosePopupLargeData}>
    
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
            La taille des données demandées dépasse la limite autorisée.
            Pour une recherche plus ciblée, veuillez cliquer sur
            <span style={{ color: "#1DC7EA" }}> recherche avancée</span>
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
          onClick={HandelSideBarPisition}
          disabled={!media}
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
          Recherche avancée
        </Button>

      </DialogActions>
    </Container>

  </Dialog>
  )
}
export default LargeDataPopup;