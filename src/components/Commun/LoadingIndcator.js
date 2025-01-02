import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const LoadingIndicator = ({progressControled,totalDuration}) => {
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
    }, [progressControled]);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setProgress((prev) => {
    //           if (prev >= 100) {
    //             clearInterval(interval);
    //             return 100;
    //           }
    //           return Math.min(prev + (100 +5 / (totalDuration / 100)), 100); 
    //         });
    //       }, 100);

      
    //     return () => clearInterval(interval);
    // }, []);

    const options = {
        chart: {
            type: 'radialBar',
            height: 50,
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 100,
                animateGradually: {
                    enabled: true,
                    delay: 150,
                },
                dynamicAnimation: {
                    enabled: true,
                    speed:50,
                    //speed: 350,
                },
            },
        },
        series: [progress],
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '50%', // Adjust the circle size
                },
                dataLabels: {
                    name: {
                        show: false, // Hide the label name
                    },
                    value: {
                        show: true, // Show only the value
                        fontSize: '25px', // Adjust font size
                        fontWeight: 'bold',
                        color: 'white', // Adjust text color
                        offsetY: 15, // Center the value vertically
                        formatter: (val) => `${Math.round(val)}%`, // Display percentage
                    },
                },
            },
        },
        colors: ['#00a6e0'],
        labels: [''],
    };

    return (
        <div>
            <h4 style={{color:"white", textAlign:"center"}}>
                Les paramètres sont en cours de calcul.</h4>
            <Chart options={options} series={[progress]} type="radialBar" height={200} />
        </div>
    );
};

export default LoadingIndicator;
