import * as React from 'react';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logoImmar from "../assets/logo (2).png";
import { UseLoginStore } from 'store/dashboardStore/useLoginStore';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function SignIn() {

  const [user, setUser] = useState({
    email: "",
    pass: ""
  })

  

  const user_id = window.localStorage.getItem('user_id')
  const history = useHistory()
  const { Loginuser, errormessage, showAlert2, showAlert1,
    setLoginInputs, setTestvalue, test,ReseAlertShwing,client,email } = UseLoginStore((state) => state)


const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value 
    }));
    // console.log("user",user)
  };
  const handleSubmit = (user) => {
    //login && login(user.email,user.pass)
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };
  const handellogin = () => {
    setLoginInputs && setLoginInputs(user)
    setTestvalue && setTestvalue(80)
    Loginuser && Loginuser(user)

  }
console.log('email',email)
  React.useEffect(() => {
    if (email) {
     history.push("/home")
    } else {
      //console.log('notallowed')
    }
  }, [email])

  React.useEffect(()=>{
    ReseAlertShwing && ReseAlertShwing()
  },[])
  return (
   
      <Container component="main" maxWidth="xs" style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
        ,flexDirection:"column"
      }}>
        <CssBaseline />
        <img src={logoImmar} alt="immar" width="150px" />
        <Box
          sx={{
            p: 3,
            backgroundColor: "rgba(255, 255, 255, 1)", 
            borderRadius: "8px", // Coins arrondis
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", 
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

          }}
        >
          
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1"  onClick={handellogin} sx={{fontWeight:"600",
               

          }}>
            Connexion
          </Typography>
          <Typography sx={{marginBottom:"20px"}}>connectez-vous pour continuer</Typography>
          <Stack sx={{ width: '100%' }} spacing={2}>
            {showAlert1 && <Alert severity="success">Vous êtes connectés.</Alert>}
            {showAlert2 && <Alert severity="error">{errormessage}
              {/* Une erreur s'est produite, veuillez réessayer plus tard. */}
            </Alert>}

          </Stack>
          <Box component="form"  >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete=""
              placeholder='client@gmail.com'
              value={user.email}
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pass"
              label="Mot de passe"
              type="password"
              id="password"
              value={user.pass}
              autoComplete="current-password"
              onChange={handleChange}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Enregistrer"
            /> */}
              <Link to="/login/motdepasseoublier" 
              style={{textTransforme:"none", cursor: "pointer", marginTop: "10px",
              textDecoration:"none",
              width:"100%",
              display:"flex",
              justifyContent:"flex-end",
              color:"#1976d2",
              }}>
              Mot de passe oublié?
            </Link>
            <Button

              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 , textTransform:"none"}}
              onClick={handellogin}
            >
             
              Connexion
            </Button>

           

            {/* <Grid item>
                <Link href="/login/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}

          </Box>
        </Box>

      </Container>
   
  );
}