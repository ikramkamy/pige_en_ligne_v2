import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import {Link} from 'react-router-dom'
import { Description } from '@mui/icons-material';
const MyCard = ({ image, title, handelNavigatePages,url ,Description,icon}) => {
  return (
    <Card
      sx={{
        width: {
          xs: "80%", 
          sm: "50%",  
          md: "25%", 
          lg:'25%', 
        },
        position: "relative",
        padding: "0px",
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor:"pointer",
        transition: "transform 0.3s ease, background-color 0.3s ease", 
        "&:hover": {
          backgroundColor: "#f8f9fa",
          transform: "translateY(-8px)", 
        },
      }}
    >
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Paella dish"
        sx={{
          opacity: "1",
          "&:hover": {
            opacity: "1", // Underline on hover
          }
        }}
      />

      <CardContent sx={{ padding: "7px" }}>
        <Typography
          gutterBottom
          variant="h6" // Changed to h6 for better hierarchy
          component="div"
          sx={{
            zIndex: "10",
            cursor: "pointer",
            fontSize: {
              xs: "14px", // Smaller font size on mobile
              sm: "15px",
              '&:hover': {
                textDecoration: 'underline', // Underline on hover
              },
            
              '&:hover::after': {
                content: '""', // Create a pseudo-element
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: '2px', // Height of the underline
                backgroundColor: 'currentColor', // Use the current text color
                transition: 'transform 0.3s ease', // Smooth transition
                transform: 'scaleX(1)', // Scale to full width on hover
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: '2px', // Height of the underline
                backgroundColor: 'currentColor', // Use the current text color
                transform: 'scaleX(0)', // Start with no underline
                transition: 'transform 0.3s ease', // Smooth transition
              },
            },
            marginTop: "5px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
            textDecoration: "none",
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body2" sx={{ color: 'text.secondary',           
          fontSize: { xs: "12px", sm: "14px" }}}         
          >
          {Description}
        </Typography>

        <CardActions disableSpacing>
          {/* Additional actions can go here */}
        </CardActions>
        <Button
          onClick={handelNavigatePages}
          sx={{
            textTransform: "none",
            marginTop: "5px",
            marginBottom: "5px",
            backgroundColor: '#00a6e0',
            width: "100%",
            '&:hover': {
              backgroundColor: '#00a6e0',
            }
          }}
          variant="contained"
          disableElevation
        >
         <Link to={url} style={{textDecoration:"none", color:"white"}}>
      {icon}
         Accèder
         </Link> 
        </Button>
      </CardContent>
    </Card>
  );
};

export default MyCard;