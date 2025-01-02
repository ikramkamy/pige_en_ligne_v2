import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Row } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { UseLoginStore } from 'store/dashboardStore/useLoginStore';
import logoImmar from "../assets/logo (2).png";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function MotDePasseOublier() {
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [showPopup , setShowPopup] =React.useState(false)
  const [vide,setVide]=React.useState(true)
  const [email, setEmail] = React.useState('');
  const { showAlert3, showAlert4, ReinitiolizePassword, messageAlertResetPasswrod } = UseLoginStore((state) => state)
  const handleopenPopup = () => {
    setPopupOpen(showAlert3);

  };
  const handleClosePopup = () => {
    setPopupOpen(false);

  };
  const handleChange = (event) => {
    setEmail(event.target.value)
  };
  const handelReinitialize = () => {
    if(email !==''){
      setPopupOpen(true)
      setShowPopup(true)
      ReinitiolizePassword && ReinitiolizePassword(email)
      setVide(true)
    }else{
  
      setVide(false)
    }

  }
React.useEffect(()=>{
  setShowPopup(showAlert3)
},[showAlert3])
  return (

    <Container component="main" maxWidth="xs" sx={{
      display:"flex",
        justifyContent:"center",
        alignItems:"center"
        ,flexDirection:"column",

     
    }}>
      <CssBaseline />
  <img src={logoImmar} alt="immar" width="150px" />
      <Box
        sx={{
         padding:"5%",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: "100%",
          height:'auto',
          backgroundColor: "rgba(255, 255, 255, 1)", 
          borderRadius: "8px", 
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", 

        }}
      >
      

        <Typography component="h1" sx={{marginTop:"20px", fontWeight:"600",}}>
          Mot de Passe oublié
        </Typography>
        <p style={{ textAlign: "center", width: "100%", fontSize:"13px" }}>
          entrer votre email pour recevoir un lien de réinitialisation</p>
        <Row style={{ width: '100%' }}>
         {/* pour des raison de sécurité on affiche pas ce message d'alert */}
        {/* {showAlert4 && <Alert sx={{ width: "100%" }} severity="error">{messageAlertResetPasswrod}
          </Alert>} */}
          <TextField
            sx={{ width: '100%' }}
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            autoComplete=""
            placeholder='client@gmail.com'
            //value={email}
            autoFocus
            onChange={handleChange}
          />
           {!vide && (<div style={{color:"red",fontSize:"10px"}}>
          *champ vide!</div>)}
          <Button

            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "100%" }}
            onClick={handelReinitialize}
          
          >
            Envoyer
          </Button>
        </Row>


   
        <Link to="/login" variant="body2" style={{marginTop:"20px", 
          marginBottom:"20px", textDecoration:"none" , fontSize:"15px",color:"#1976d2",}}>
              Retour à la connexion
        </Link>
       
      </Box>


     

      {/* Popup Dialog */}
        <Dialog open={popupOpen} onClose={handleClosePopup}>
        {/* <DialogTitle>Details</DialogTitle> */}
        <DialogContent sx={{width:"100%"}}>
        <Typography sx={{width:"100%"}}>
           
           <Alert severity="success"
           
           sx={{
            width:'100%',

           }}
           >Un email a été envoyé à l'adresse suivante:
            
           {email}
            
            </Alert>   
          
         </Typography>

        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClosePopup} color="primary">
            Fermer
          </Button>
        </DialogActions> */}
      </Dialog>
    
    </Container>

  );
}