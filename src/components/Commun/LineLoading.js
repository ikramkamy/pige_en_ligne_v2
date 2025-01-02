// LoadingLineIndicator.js
import React, { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const LoadingLineIndicator = ({progressControled,step,totalDuration}) => {
  console.log("totalDuration",totalDuration)
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100; 
                }
                return prev + 1; 
            });
        }, 1000); 
        
        return () => clearInterval(interval);
    }, []);
    console.log("total duration", totalDuration)
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setProgress((prev) => {
    //           if (prev >= 100) {
    //             clearInterval(interval);
    //             return 100;
    //           }
    //           return Math.min((prev + (100 / (totalDuration/ 100)).toFixed(0)), 100); 
    //         });
    //       }, 100);

    //     // Cleanup interval on component unmount
    //     return () => clearInterval(interval);
    // }, [progress]);
    return (
        <Box sx={{ width: '100%', marginTop: 2 }}>
            <Typography variant="" align="center" width="100%" sx={{color:"white"}}>
                {`Recherche de données... ${progress}%`}</Typography>
            <LinearProgress variant="determinate" value={progress} />
        </Box>
    );
};

export default LoadingLineIndicator;