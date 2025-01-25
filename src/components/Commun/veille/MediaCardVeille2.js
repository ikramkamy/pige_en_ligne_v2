import React from 'react';
import { Card, CardContent, Typography, Button, Grid, Modal, DialogActions } from '@mui/material';
import { Col, Row, Container } from 'react-bootstrap';
import { PlayArrow, Info } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import '../commun.css';
import { UseFiltersStore } from 'store/dashboardStore/FiltersStore';
import BaseDialog from './DetailsCard';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
const PORT = "https://immar-media.com";
const AdvertisementCard = ({
    diffusion_first, creation, product, id_message, details, format, fichier,
    famille, classe, secteur, produit, marque, version, support, variete, annonceur,
    message, id,
    date,
    Veille_Date,
    Veille_Date_All

}) => {
    const { media } = UseFiltersStore((state) => state)
    const useStyles = makeStyles((theme) => ({
        card: {
            margin: '1px',
            marginTop: "10px",
            padding: '5px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
            },
        },
        image: {
            width: '151px',
            height: '100px',
            cursor: 'pointer',
            borderRadius: '0px',
            marginBottom: '10px',
        },
        button: {
            margin: '5px',
            textTransform: 'none',
        },
        modalContent: {
            // padding: theme.spacing(2),
            // backgroundColor: theme.palette.background.paper,
            borderRadius: '8px',
            height: "100vh",
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",

        },
    }));


    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleVideoClick = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpenPdf = () => {
        //window.open(`${PORT}/pdf/article/pdf_veille.php?id=${id}`, '_blank');
    };

    const id_media = creation.split("_")[0]
    const [resStyle, setResStyle] = React.useState({});
    React.useEffect(() => {
        const handleResize = () => {
            setResStyle({
                backmarginRight: window.innerWidth < 1145 ? '0px' : '10px',
                widthVideoContainer: window.innerWidth < 1145 ? '80vw' : '40vw',
            });
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div style={{
            marginRight: resStyle.marginRight,

        }}>
            <Card className={classes.card}
                sx={{
                    width: "250px",
                    height: "280px",

                    borderRadius: "5px",


                    '&:hover': {
                        border: "2px solid #ffc600",
                    }

                }}>
                <CardContent style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="h5"
                        gutterBottom sx={{
                            height: "50px",
                            fontFamily: "Figtree",
                            fontSize: "1rem", textAlign: "center", fontWeight: "bold"
                        }}>
                        {product}</Typography>

                    {/* <Typography variant="body2">Version: {version}</Typography> */}
                    <img src={creation} alt="Creation" className={classes.image}
                        style={{}}
                        onClick={handleVideoClick} />
                    <div style={{ display: "flex" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ color: "white", backgroundColor: "#00a6e0" }}
                            startIcon={<PlayArrow />}
                            onClick={handleVideoClick}
                            className={classes.button}
                        >
                            Voir
                        </Button>
                        <BaseDialog
                            fichier={fichier}
                            date={diffusion_first}
                            dateVeille={Veille_Date}
                            famille={famille}
                            classe={classe}
                            secteur={secteur}
                            marque={marque}
                            support={support}
                            produit={produit}
                            variete={variete}
                            annonceur={annonceur}
                            format={format}
                            message={message}
                            version={version}
                            id={id}
                        />

                    </div>
                    <div style={{
                        width: "100%", height: "1px",
                        backgroundColor: "lightgray", marginTop: "10px"
                    }}></div>
                    <Typography
                        sx={{
                            width: "100%", textAlign: "center",
                            marginTop: "5px", fontWeight: "bold", fontSize: "15px", fontFamily: "Figtree",
                        }}
                        color="textSecondary">1ère dif. : {diffusion_first}</Typography>
                </CardContent>
            </Card>

            <Modal open={open} onClose={handleClose}>
                <div className={classes.modalContent}

                >

                    <Container
                        fluid
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            // justifyContent: "",
                            alignItems: "center",
                            height: "auto",
                            //padding: "20%",
                            width: resStyle.widthVideoContainer,
                            // height: "50vh",
                            backgroundColor: "white",
                            paddingTop:'20px'
                        }}
                    >
                        {media === "presse" && (
                            //<div style={{ position: 'relative', display: 'inline-block', cursor: 'pointer',width:"300px" }}>
                            <PictureAsPdfIcon onClick={handleOpenPdf} color="#00a6e0" width="80%"
                                style={{ margin: "20px", width: "40%", height: "40%" }} />

                            //</div>
                        )}
                        {media === "radio" && (
                            //<div style={{ marginTop: "5px", padding: "10px", 
                            // backgroundColor: "#e0f7fa", borderRadius: "8px",width:"300px" }}>
                            <audio src={`${fichier}`} controls width="800px"
                                style={{
                                    borderRadius: "8px", marginTop: "5px"

                                }} />

                            //</div>
                        )}
                        {media === "television" && (
                            <video src={`${fichier}`} controls={true} width="100%"
                                style={{ marginTop: "5px", borderRadius: "20px" }} />

                        )}
                        <DialogActions sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "20px",
                            backgroundColor: "white"
                        }}>

                            <Button color="primary" sx={{
                                textTransform: "none",
                                marginTop: "10px",
                                marginBottom: "10px",
                                backgroundColor: "#00a6e0",
                                width: "50%",
                                color:"white",
                                '&:hover': {
                                    backgroundColor:"#00a6e0"
                                },

                            }}
                                onClick={() => setOpen(false)}
                            >Fermer
                            
                            
                            </Button>
                        </DialogActions>
                    </Container>
                </div>
            </Modal>
        </div>
    );
};

export default AdvertisementCard;