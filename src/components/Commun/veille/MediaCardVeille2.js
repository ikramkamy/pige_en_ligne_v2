import React from 'react';
import { Card, CardContent, Typography, Button, Grid, Modal } from '@mui/material';
import { PlayArrow, Info } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        margin: '20px',
        padding: '5px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
        },
    },
    image: {
        width: '50px',
        height: '50px',
        cursor: 'pointer',
        borderRadius: '50%',
        marginBottom: '10px',
    },
    button: {
        margin: '5px',
        textTransform: 'none',
    },
    modalContent: {
        //padding: theme.spacing(2),
       // backgroundColor: theme.palette.background.paper,
        borderRadius: '8px',
    },
}));

const AdvertisementCard = ({ diffusion_first, creation, product, version }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleVideoClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Card className={classes.card} sx={{width:"250px", height:"280px"}}>
                <CardContent >
                    <Typography variant="h5"
                     gutterBottom sx={{height:"70px",fontSize:"1rem"}}>{product}</Typography>
                    <Typography color="textSecondary">{diffusion_first}</Typography>
                    <Typography variant="body2">Version: {version}</Typography>
                    <img src={creation} alt="Creation" className={classes.image} onClick={handleVideoClick} />
                    <div style={{display:"flex"}}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<PlayArrow />}
                            onClick={handleVideoClick}
                            className={classes.button}
                        >
                            Voir
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{color:"#ffc600"}}
                            startIcon={<Info />}
                            className={classes.button}
                        >
                            Détails
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Modal open={open} onClose={handleClose}>
                <div className={classes.modalContent}>
                 
                    <Typography>This is where the video will be displayed.</Typography>
                </div>
            </Modal>
        </>
    );
};

export default AdvertisementCard;