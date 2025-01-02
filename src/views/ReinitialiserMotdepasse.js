import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import  logoImmar from "../assets/images.png";
import LoadingButton from 'components/Commun/LoadingButton';
import { UseLoginStore } from 'store/dashboardStore/useLoginStore';
import Alert from '@mui/material/Alert';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useParams } from 'react-router-dom/cjs/react-router-dom';
export default function Reinitialiser() {
  const {token}=useParams();
 const {isloading, isSucces,UpdatePasseword,messageUpdatePassword}=UseLoginStore((state)=>state)
 const [popupOpen, setPopupOpen] = React.useState(true);
 const [matchingPass,setMatchingPass]=React.useState(true)
 const [faible,setFaible]=React.useState(false)
 const [disablebtn,setDisablebtn]=React.useState(false)
 const [pass,setPass]=React.useState({
  pass1:"",
  pass2:"",
 });
 const handleClosePopup = () => {
  setPopupOpen(false);
   window.location.href = '/#/login'
};
const handelResetPass=(event)=>{
  const { name, value } = event.target;
  setPass ((prev ) => ({
    ...prev ,
    [name]: value 
}));
}
const passwordRegex =/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
const handelUpdatePassword=()=>{
  UpdatePasseword && UpdatePasseword(pass.pass1,token)

}

React.useEffect(()=>{
 if(pass.pass1==pass.pass2){
 setMatchingPass(true)
 setFaible(!passwordRegex.test(pass.pass1))
 setDisablebtn(pass.pass1==pass.pass2 && passwordRegex.test(pass.pass1))
 console.log('disabled',disablebtn)
 console.log("matchingPass && !passwordRegex.test(pass.pass1)",
 passwordRegex.test(pass.pass1))
 console.log('matching',pass.pass1==pass.pass2)

}else{
  setMatchingPass(false)
  setFaible(false)
  setDisablebtn(false)
}
//console.log("!passwordRegex.test(pass.pass1)",!passwordRegex.test(pass.pass1))

},[pass])
React.useEffect(()=>{

},[])
  return (
 
      <Container component="main" maxWidth="xs" sx={{
        display:"flex",      
        justifyContent:"center",
        alignItems:"center",
        height:"auto",
      }}>
        <CssBaseline />
        <Box
          sx={{
            padding:"5%",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            // width: "50%",
            height:'auto',
            backgroundColor: "rgba(255, 255, 255, 1)", 
            borderRadius: "8px", 
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", 
  
          }}
        >
{/* <img src={logoImmar} alt="immar"/> */}
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" sx={{marginTop:"10px", fontWeight:600}}>
            Réinitialisez Votre mot de passe
          </Typography>
          <p style={{ textAlign: "center", width: "100%", fontSize:"13px" }}>
          entrer un nouveau mot de passe de passe et confirmez-le</p>
          <Box component="form" >
              <TextField
              //margin="normal"
              required
              fullWidth
              name="pass1"
              value={pass.pass1}
              label="mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handelResetPass}
            />
          <p className='text-grey ' style={{fontSize:"10px"}}>
            *Utilisez 8 caractéres ou 
            plus avec un mélange de 
            lettres de chiffres et de symboles</p>
            <TextField
              required
              fullWidth
              name="pass2"
              value={pass.pass2}
              label="confirmer le mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handelResetPass}
            />
          {!matchingPass && (<Alert sx={{fontSize:"15px", color:"red",
            bgcolor:'transparent',
          }} severity="error">les mot de passe ne sont pas identiques</Alert>)}
           {faible && (
            <div style={{display:'flex', justifyContent:"flex-start"}}>
            <Alert sx={{fontSize:"10px",color:"red", display:"flex",
           justifyContent:"center",
           alignItems:"center",
            bgcolor:'transparent',
          }} severity="error">mot de passe faible</Alert>
          </div>)}

            <LoadingButton isloading={isloading} isSucces={isSucces}
            disablebtn={disablebtn}
            handelUpdatePassword={handelUpdatePassword}/>
           
                <Link to="/login" variant="body2" style={{marginTop:"20px", 
                width:"100%",display:"flex", justifyContent:"center",
                 marginBottom:"20px", textDecoration:"none" , 
                 fontSize:"15px",color:"#1976d2",}}>
                 Retour à la connexion
                </Link>
            
          </Box>
        
        </Box>


          {/* Popup Dialog */}
          {isSucces && (
            <Dialog open={popupOpen} onClose={handleClosePopup}>
        {/* <DialogTitle>Details</DialogTitle> */}
        <DialogContent>

          <Typography>
           
            <Alert severity="success">{messageUpdatePassword}</Alert>   
          </Typography>

        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClosePopup} color="primary">
            connexion
          </Button> */}
        </DialogActions>
           </Dialog>)}
     
      </Container>
 
  );
}