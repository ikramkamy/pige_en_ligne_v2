
import * as React from "react";
import WarningIcon from '@mui/icons-material/Warning';
import { UseMediaDashboardStore } from "store/dashboardStore/MediaDashboardStore";
import CircularProgress from '@mui/material/CircularProgress';

import {
    Dialog,
    DialogActions,
    Button,

} from "@mui/material";
import { DownloadIcon, FilterIcon, FileDownIcon } from "lucide-react";
import { Container, Row } from "react-bootstrap";

const PdfCreationPopup = ({
    OpenNetworkPopup,
    handleCloseNetworkPopup,
    message
}) => {

    return (<Dialog open={OpenNetworkPopup} onClose={handleCloseNetworkPopup}
    sx={{backgroundColor:"#4c5479"}}
    >
        <Container
            fluid
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "40vh",
                padding: "20%",
                width: "500px",
                
            }}
        >
            <Row >
                <div style={{
                    display: 'flex', flexDirection: "column",
                    alignItems: 'center', justifyContent: 'center'
                }}>
                            <CircularProgress />
                  
                    <span style={{ textAlign: "center", width: "300px" }}>
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
            </DialogActions>
        </Container>

    </Dialog>
    )
}
export default PdfCreationPopup;