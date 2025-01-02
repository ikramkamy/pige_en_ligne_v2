import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import  BaseDialog from "components/Commun/veille/DetailsCard"
const images = [
  {
    url: '/static/images/buttons/breakfast.jpg',
    title: 'voir plus',
    width: '40%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function ButtonBaseDemo({
    creation,
    showDetails,
    fichier,
    date, 
    famille,
    classe,
    secteur,
    marque,
    annonceur,
    support,
    version,
    format,
    message,
    produit,
    variete,
    id

}) {
//console.log("creation in image button", creation)
  return (   
        <ImageButton
          focusRipple
          key="voir"
          style={{
            width: "50%", 
            height:"50px" ,
            color:"#ffc600" 
          }}
        >
          <ImageSrc style={{backgroundImage: `url(${creation})`,
           backgroundSize:"50%", backgroundRepeat:"no-repeat" }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              onClick={showDetails}
              sx={(theme) => ({
                position: 'relative',
          
              }
            
            
            )}
            >
              <BaseDialog 
              fichier={fichier} 
              date={date} 
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
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
 
    
  );
}








