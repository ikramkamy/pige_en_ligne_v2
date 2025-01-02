import * as React from 'react';
import { Card } from 'react-bootstrap'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom/cjs/react-router-dom';


export default function ImgMediaCard({ image, title, url }) {
  return (
    <Card
      style={{
        width: "30%", height: "auto", margin: "1%", display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center",
        position: "relative"
      }}

    >
      <CardContent sx={{ height: "80px", position: "absolute" }}>
        <Typography gutterBottom variant="h8" component="div" sx={{
          color: "white",
          zIndex: "10",
          textDecoration: "none", // Default state
          "&:hover": {
            textDecoration: "underline", // Underline on hover
          },
        }}>
          {title}
        </Typography>

      </CardContent>
      <CardMedia
        component="img"
        alt="pige-en-ligne"
        height="140"
        image={image}
        sx={{
          opacity: "0.8",
          "&:hover": {
            opacity: "1", // Underline on hover
          },

        }}
      />
      <Button sx={{
        textTransform: "none",
        marginTop: "20px",
        marginBottom: "20px",
        backgroundColor: '#00a6e0',
        width: "80%",
        color: '',
        '&:hover': {
          backgroundColor: '#00a6e0',
        }
      }}
        variant="contained"
        disableElevation
      >Accèder

      </Button>


    </Card>
  );
}
