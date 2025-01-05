import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { UseFiltersStore } from 'store/dashboardStore/FiltersStore';
import televsionimage from 'assets/img/veille/television.jpg';
import radioimage from 'assets/img/veille/radio.jpg';
import presseimage from 'assets/img/veille/presse.jpg'
import { Card,Typography, Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { InformationCircleIcon } from '@heroicons/react/outline';
import '../commun.css'
export default function BaseDialog({ getData, title, openDetails,
    fichier, date, famille, classe, secteur, marque, produit,
    variete, message, format, annonceur, support, version, id }) {
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const { media } = UseFiltersStore((state) => state)
    const [mediaPubfile, setMediaPubfile] = React.useState("PDF")
    const [mediaImage, setMediaImage] = React.useState(presseimage)
    const [urlDownload, setUrlDownload] = React.useState("/pdf/article/pdf_veille.php?id=")
    const PORT = "https://immar-media.com"


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleMaxWidthChange = (event) => {
        setMaxWidth(
            // @ts-expect-error autofill of arbitrary value is not handled.
            event.target.value,
        );
    };
    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };
    React.useEffect(() => {
        if (media === "presse") {
            setMediaPubfile("PDF")
            setMediaImage(presseimage)

            setUrlDownload("/pdf/article/pdf_veille.php?id=")
        } else if (media === "radio") {
            setMediaPubfile("MP3")
            setMediaImage(radioimage)
            setUrlDownload("/1253_telecharger.php?dossier=veille_radio&fichier=")

        } else {
            setMediaPubfile("MP4")
            setMediaImage(televsionimage)
            setUrlDownload("/1253_telecharger.php?dossier=veille_tv&fichier=")
        }
    }, [media])

    return (
        <React.Fragment  >
            <Button 
              variant="contained"
              color="primary"
              sx={{ color: "black", backgroundColor: "lightgrey",
                margin: '5px',
                textTransform: 'none',
               }}
              startIcon={<InformationCircleIcon />} 
              onClick={handleClickOpen}>
                Détails
            </Button>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                sx={{ height: "auto" }}
                onClose={handleClose}>
                {/* <div style={{backgroundImage:`url(${mediaImage})`,backgroundSize:"cover", padding:"20px"}} >    */}
                <Card sx={{
                    maxWidth: 800, margin: 'auto', padding: 2, backgroundColor: '#f5f5f5',
                    borderRadius: 2, boxShadow: 3,
                    height: "auto", overflowY: "scroll",

                    display: "flex",
                    justifyContent: 'center',
                    alignItems: "center",
                    flexDirection: "column"

                }}>

                    <Typography variant="h6" component="div" gutterBottom>
                        Informations
                    </Typography>
                    
                    
                    <Grid container
                        sx={{ border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
                        {/* Each row */}
                        <Grid item xs={6} sx={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Date de première diffusion:</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                            <Typography variant="body2">{date}</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Famille:</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                            <Typography variant="body2">{famille}</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Classe:</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                            <Typography variant="body2">{classe}</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Secteur:</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                            <Typography variant="body2">{secteur}</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Varieté:</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                            <Typography variant="body2">{variete}</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Annonceur:</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                            <Typography variant="body2">{annonceur}</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Marque:</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                            <Typography variant="body2">{marque}</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Produit:</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                            <Typography variant="body2">{produit}</Typography>
                        </Grid>

                        {/* Accordion for Message */}
                        <Grid item xs={6} sx={{ borderBottom: '1px solid #ccc',
                             padding: '0px',
                             display:"flex",
                             justifyContent:"center",
                             alignItems:"center"
                             }}>
                            <Accordion sx={{ width: "100%", 
                                backgroundColor: 'transparent',
                                 boxShadow: 'none', padding: "0px",
                                 
                                 
                                 }}>
                                <AccordionSummary 
                                expandIcon={<ArrowDropDownIcon />} 
                                aria-controls="panel1-content"
                                id="panel1-header"
                                sx={{
                                    padding:"10px"
                                }}
                                 
                                 >
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Message</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography style={{ fontSize: "10px" }}>{message}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>

                        {/* Accordion for Supports de diffusion */}
                        <Grid item xs={6} sx={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                            <Accordion sx={{ width: "100%", backgroundColor: 'transparent', 
                                boxShadow: 'none', padding: "0px" }}>
                                <AccordionSummary  sx={{
                                    padding:"0px",
                                   
                                }} expandIcon={<ArrowDropDownIcon />}
                                 aria-controls="panel2-content" id="panel2-header">
                                    <Typography variant="body2" color="text.secondary"
                                     sx={{ fontWeight: 'bold' }}>Supports de diffusion</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography style={{ fontSize: "10px" }}>{support}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>

                        <Grid item xs={6} sx={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Durée:</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                            <Typography variant="body2">{format}</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Version:</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ padding: '8px' }}>
                            <Typography variant="body2">{version}</Typography>
                        </Grid>
                    </Grid>

                    <DialogActions sx={{
                        marginTop: "10px",
                        width: "100%",
                        display: "flex", justifyContent: "space-between",
                        padding: "0px",
                        alignItems: "center"

                    }}>
                        <Button
                            onClick={handleClose}
                            sx={{
                                textTransform: "none",
                                width: "50%",
                                backgroundColor: "#00a6e0",
                                color: "white",
                                '&:hover': {
                                    backgroundColor: '#00a6e0',
                                }
                            }}
                        >Annuler
                        </Button>
                        {/* <Link to={`${PORT}${urlDownload}${id}`} style={{textDecoration:"none"}}> */}
                        <a href={`${PORT}${urlDownload}${id}`}
                            className='custom-link'
                            style={{
                                textDecoration: "none",
                                backgroundColor: "#00a6e0",
                                color: "white !important",
                                width: "50%",
                                paddingTop: "6px",
                                paddingBottom: "6px",
                                borderRadius: "5px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "cenetr",


                            }}>
                                Télècharger {mediaPubfile}</a>

                        {/* </Link>  */}


                    </DialogActions>
                </Card>


                {/* </div>    */}
                <Box
                    noValidate
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        m: 'auto',
                        width: '500',
                    }}
                >
                </Box>


                {/* <img src={mediaImage} alt="immar media" style={{width:'50%', height:"50%"}}/> */}


            </Dialog>
        </React.Fragment>
    );
}
