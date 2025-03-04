import * as React from 'react';
import { UsePigeDashboardStore } from '../../../store/dashboardStore/PigeDashboardStore';
import { Card } from 'react-bootstrap';
import ReactEcharts from "echarts-for-react";
import { UseFiltersStore } from 'store/dashboardStore/FiltersStore';
import { useEffect, useState } from "react";
import { SelectGraphOptionsMarche } from './SelectGraphOptions';
import { UseGraphStore } from 'store/GraphStore';
import ColorCheckboxes from './BaseCheckBoxGroupe';
import html2canvas from "html2canvas";
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import './style.css';
import {
  IconButton,
  Menu,
} from "@mui/material";
import { DownloadIcon } from "lucide-react";
export const PieChartVelson = ({ date1, date2, data, title, isloading,
  ChangeBaseFunction, parametre, SetOptionFunction, filter, initialOptions }) => {
  const { base } = UseFiltersStore((state) => state)
  const [coloLables, setColoLables] = useState("white")
  const { PartMarche, FormatRepartition, RepartitionParType, formatDateToFrench, RepartitionParVersion } = UsePigeDashboardStore((state) => state);
  const { MarcheOptions, setBaseGraphs, baseGraphs } = UseGraphStore((state) => state)
  //const chartDatalabelsBarColors = ['#bc1854', '#a01542', '#851230', '#6a0f1e', '#4f0c0c']
  const [chartDatalabelsBarColors, setChartDatalabelsBarColors] = useState([])
  const chartDatalabelsBarColorsVolume = [
    "#e23670", // Vivid Pink
    "#2662da", // Bright Blue
    "#2eb789", // Aqua Green
    "#ae57da", // Lavender Purple
    "#e78c2f", // Orange
    "#098638", // Deep Green
    "#f7abb7", // Soft Pink
    "#5f432e", // Earthy Brown
    "#ff4b00", // Neon Orange
    "#8c00ff", // Electric Purple
    "#00e5ff", // Cyan Blue
    "#ffd700", // Bright Yellow
    "#ff1493", // Hot Pink
    "#00ff00", // Neon Green
    "#ff4500", // Red-Orange
    "#1e90ff", // Dodger Blue
    "#ff00ff", // Magenta
    "#39ff14", // Lime Green
    "#ff6347", // Tomato Red
    "#7fff00"  // Chartreuse Green
  ]
  const chartDatalabelsBarColorsBudget = [
    "#e23670", // Vivid Pink
    "#2662da", // Bright Blue
    "#2eb789", // Aqua Green
    "#ae57da", // Lavender Purple
    "#e78c2f", // Orange
    "#098638", // Deep Green
    "#f7abb7", // Soft Pink
    "#5f432e", // Earthy Brown
    "#ff4b00", // Neon Orange
    "#8c00ff", // Electric Purple
    "#00e5ff", // Cyan Blue
    "#ffd700", // Bright Yellow
    "#ff1493", // Hot Pink
    "#00ff00", // Neon Green
    "#ff4500", // Red-Orange
    "#1e90ff", // Dodger Blue
    "#ff00ff", // Magenta
    "#39ff14", // Lime Green
    "#ff6347", // Tomato Red
    "#7fff00"  // Chartreuse Green
  ]
  const chartDatalabelsBarColorsDuree = [
    "#e23670", // Vivid Pink
    "#2662da", // Bright Blue
    "#2eb789", // Aqua Green
    "#ae57da", // Lavender Purple
    "#e78c2f", // Orange
    "#098638", // Deep Green
    "#f7abb7", // Soft Pink
    "#5f432e", // Earthy Brown
    "#ff4b00", // Neon Orange
    "#8c00ff", // Electric Purple
    "#00e5ff", // Cyan Blue
    "#ffd700", // Bright Yellow
    "#ff1493", // Hot Pink
    "#00ff00", // Neon Green
    "#ff4500", // Red-Orange
    "#1e90ff", // Dodger Blue
    "#ff00ff", // Magenta
    "#39ff14", // Lime Green
    "#ff6347", // Tomato Red
    "#7fff00"  // Chartreuse Green
  ]
  const colorMapping = [
    { value: 'volume', codeColor: chartDatalabelsBarColorsVolume },
    { value: 'budget', codeColor: chartDatalabelsBarColorsBudget },
    { value: 'duree', codeColor: chartDatalabelsBarColorsDuree }
  ];
  const LocalBaseGraph = baseGraphs[parametre] == "" ? base : baseGraphs[parametre]
  const getColorByValue = (value) => {
    const item = colorMapping.find(item => item.value === value);
    return item ? item.codeColor : '#2196f3';
  }
  //   "#d81b60",
  //   "#2196f3",
  //   "#43a047",
  const [average, setAverage] = useState(0);
  const [dynamicList, setDynamicList] = useState([])
  const [array, setArray] = useState([])

  useEffect(() => {
    setBaseGraphs && setBaseGraphs(parametre, base)
  }, [])

  useEffect(() => {
    let array = getColorByValue(LocalBaseGraph)
    //.log('array',array)
    setChartDatalabelsBarColors(array)
  }, [baseGraphs])
  // console.log('baseGraphs[parametre]', baseGraphs[parametre])
  useEffect(() => {
    if (data && data.length !== 0) {
      const list = data.map((elem) => ({
        value: Number(elem.total),
        namelegend: `${elem.name} ${Number(elem.proportion).toFixed(2)}%`,
        name: `${elem.name}`,
      }));
      setArray(list);
      const list2 = list.map((e) => e.value);
      const sum = list2.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
      const average20 = sum / list.length;
      setAverage(average20.toFixed(2));
    }
    setDynamicList(array)
  }, [PartMarche, FormatRepartition, RepartitionParType, RepartitionParVersion]);


  const ModifyList = () => {
    var autresList = array.filter((e) => !data.includes(e))

    var valueAutre = autresList.map((e) => Number(e.value))
    var PourcentageAutre = autresList.map((e) => Number(e.name.split('%')[0]))

    const totalSum = valueAutre.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const totalSumPourcentage = PourcentageAutre.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    var listWithAutre = initialOptions;
    // var autre = {
    //   value: totalSum.toFixed(2).toString(),
    //   name: `autres ${totalSumPourcentage.toFixed(2)}%`
    // }
    // listWithAutre.push(autre)
    setDynamicList([...listWithAutre])
  }


  //console.log("array repartition format all",data,array,dynamicList)
  // var option = {
  //   tooltip: {
  //     trigger: 'item',

  //   },
  //   display: 'flex',
  //   justifyContent: "center",
  //   //width:"450px",
  //   alignItems: 'center',
  //   color: chartDatalabelsBarColors,
  //   legend: {
  //     show: false,
  //     orient: 'horizontal',
  //     left: 'center',
  //     bottom: "-0%",
  //     postio: "static",
  //     textStyle: {
  //       color: 'white', // Set text color for the legend
  //       fontSize: 10,
  //     },
  //     data: dynamicList.map(item => item.name), // Map names from the data to the legend
  //     align: 'auto', // Align the legend items properly
  //     itemGap: 5, // Add spacing between legend items
  //     padding: [20, 20, 20, 20],
  //   },
  //   series:
  //     [{
  //       name: `${baseGraphs[parametre]} `,
  //       type: 'pie',
  //       radius: ['20%', '70%'],
  //       title: "Part de Marché",
  //       //data: array,
  //       data: initialOptions,
  //       emphasis: {
  //         itemStyle: {
  //           shadowBlur: 10,
  //           shadowOffsetX: 0,
  //         }
  //       },
  //       label: {
  //         normal: {
  //           show: true,
  //           fontSize: 14,
  //           fontWeight: 'normal',
  //           color: coloLables,
  //           fontFamily: 'Arial, sans-serif',
  //           // formatter: '{d}%',
  //           position:"inside",
  //           formatter: function (params) {
  //             console.log('params', params)
  //             const item = dynamicList.find((entry) => entry.name === params.data.name);

  //             if (item) {

  //               // Return the percentage from the nameLegend property
  //               return item.namelegend;
  //             }
  //             // Fallback to default percentage if nameLegend is not found
  //             return `${params.percent.toFixed(2)}%`;
  //           },

  //         },
  //         formatter: function (params) {
  //           const item = dynamicList.find((entry) => entry.name === params.name);
  //           if (item && item.nameLegend) {
  //             console.log("item", item)
  //             // Return the percentage from the nameLegend property
  //             return item.nameLegend;
  //           }
  //           // Fallback to default percentage if nameLegend is not found
  //           return `${params.percent.toFixed(2)}%`;
  //         },
  //       },
  //       labelLine: {
  //         normal: {
  //           show: true,

  //         },
  //       },
  //     }],

  //   textStyle: {
  //     fontFamily: '',
  //     fontSize: 16,
  //     color: 'red',
  //     fontWeight: 100,
  //   },

  // };
  var option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      show: false,
      orient: 'horizontal',
      left: 'center',
      bottom: "-0%",
      textStyle: {
        color: 'white', // Set text color for the legend
        fontSize: 10,
      },
      data: dynamicList.map(item => item.name), // Map names from the data to the legend
      align: 'auto', // Align the legend items properly
      itemGap: 5, // Add spacing between legend items
      padding: [20, 20, 20, 20],
    },
    series: [
      {
        name: `${baseGraphs[parametre]}`,
        type: 'pie',
        radius: ['10%', '70%'], // Inner and outer radius of the pie chart
        data: initialOptions, // Data for the pie chart
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
          },
        },
        
        labelLine: {
          normal: {
            show: true, // Show the line connecting the outside label to the segment
          },
        },
        label: {
          normal: {
            show: true, // Show the outside label
            position: 'outside', // Position outside the segment
            fontSize: 12, // Font size of the outside label
            fontWeight: 'normal',
            color: coloLables, // Text color for the outside label
            formatter: function (params) {
              return params.name; // Display the name of the segment outside
            },
          },
        },
        label: {
          normal: {
            show: true, // Show the inside label
            position: 'inside', // Position inside the segment
            fontSize: 12, // Font size of the inside label
            fontWeight: 'normal',
            color: coloLables, // Text color (ensure it contrasts with the segment color)
            formatter: function (params) {
              return ` ${params.name} - ${params.value}
              (${params.percent})%
              `; // Display percentage inside the segment
            },
          },
        },
      },
    ],
  };
  // var option = {
  //   tooltip: {
  //     trigger: 'item',
  //   },
  //   legend: {
  //     show: false,
  //     orient: 'horizontal',
  //     left: 'center',
  //     bottom: "-0%",
  //     textStyle: {
  //       color: 'white', // Set text color for the legend
  //       fontSize: 10,
  //     },
  //     data: dynamicList.map(item => item.name), // Map names from the data to the legend
  //     align: 'auto', // Align the legend items properly
  //     itemGap: 5, // Add spacing between legend items
  //     padding: [20, 20, 20, 20],
  //   },
  //   series: [
  //     {
  //       name: `${baseGraphs[parametre]}`,
  //       type: 'pie',
  //       radius: ['40%', '70%'], // Inner and outer radius of the pie chart
  //       data: initialOptions, // Data for the pie chart
  //       emphasis: {
  //         itemStyle: {
  //           shadowBlur: 10,
  //           shadowOffsetX: 0,
  //         },
  //       },
  //       label: {
  //         normal: {
  //           show: true, // Show the labels
  //           position: 'inside', // Position inside the segment
  //           fontSize: 12, // Font size of the inside label
  //           fontWeight: 'normal',
  //           color: coloLables, // Text color (ensure it contrasts with the segment color)
  //           formatter: function (params) {
  //             return `{percent|${params.percent.toFixed(1)}%}`; // Display percentage inside the segment
  //           },
  //           rich: {
  //             percent: {
  //               fontSize: 12,
  //               color: coloLables, // Ensure the text is visible inside the segment
  //             },
  //           },
  //         },
  //       },
  //       labelLine: {
  //         normal: {
  //           show: true,
  //           formatter: function (params) {
  //             return `{name|${params.name}}`; 
  //           }, 
  //         },
  //       },
  //       label: {
  //         normal: {
  //           show: true, // Show the outside label
  //           position: 'outside', // Position outside the segment
  //           fontSize: 12, // Font size of the outside label
  //           fontWeight: 'normal',
  //           color: coloLables, // Text color for the outside label
  //           formatter: function (params) {
  //             return `{name|${params.name}}`; // Display the name of the segment outside
  //           },
  //           rich: {
  //             name: {
  //               fontSize: 12,
  //               color: coloLables, // Ensure the text is visible outside the segment
  //             },
  //           },
  //         },
  //       },
  //     },
  //   ],
  // };
  const [anchorEl, setAnchorEl] = useState(null); // For Menu anchor
  const open = Boolean(anchorEl);
  const handleDownloadClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDownloadChart = () => {

    const chartContainer = document.querySelector(`.${parametre}`);
    const AxisLabel = document.querySelector(".recharts-layer recharts-cartesian-axis-tick")
    // console.log("AxisLabel", chartContainer, AxisLabel)
    if (!chartContainer) return;
    setColoLables("black")
    setTimeout(() => {
      html2canvas(chartContainer, {
        onclone: (clonedDoc) => {

          // Find the cloned container and set its background to black
          const clonedContainer = clonedDoc.querySelector(`.${parametre}`);
          if (clonedContainer) {
            //clonedContainer.style.backgroundColor = "black";
            clonedContainer.style.color = "black";
          }
        },
        width: 600, // Set desired width
        height: 600, // Set desired height
        scale: 2, // Optional: Increase resolution
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png"); // Convert canvas to PNG
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "chart.png"; // Set the filename
        link.click(); // Trigger the download
        setColoLables("white")
      });
    }, 5000);

    
  };
 const handleDownloadSVG = () => {
    const chartContainer = document.querySelector(`.${parametre}`);
    if (!chartContainer) {
      //console.error("Chart container not found!");
      return;
    }
    // Find the <canvas> element inside the container
    setColoLables("black")
    setTimeout(() => {
      const canvas = chartContainer.querySelector(`canvas`);
      if (!canvas) {
        //console.error("Canvas element not found!");
        return;
      }
     //console.log('canvas',canvas,"chartContainer",chartContainer)
      // Get canvas as a Data URL (PNG format)
      const imgData = canvas.toDataURL("image/png");
  
      // Create an SVG wrapper
      const width = canvas.width;
      const height = canvas.height;
      const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
          <rect width="${width}" height="${height}" fill="white" />
          <image href="${imgData}" width="${width}" height="${height}" />
        </svg>
      `;
      // Convert SVG string to Blob
      const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
  
      // Create download link
      const link = document.createElement("a");
      link.href = url;
      link.download = "chart.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      // Cleanup
      URL.revokeObjectURL(url);
      console.log("Canvas converted to SVG and downloaded!");
      setColoLables("white")
    }, 5000); 
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleToggleDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //console.log("dynamic list", dynamicList)
  const handleDownloadChartPDF = async () => {
   // console.log("Generating chart image...");

    // Step 1: Capture the chart container
    const chartContainer = document.querySelector(`.${parametre}`);
    if (!chartContainer) {
      //console.error("Chart container not found!");
      return;
    }

    try {
      // Step 2: Generate the canvas from the chart container
      await new Promise((resolve) => setTimeout(resolve, 500));
      const canvas = await html2canvas(chartContainer, {
        onclone: (clonedDoc) => {
          // Modify the cloned container's background color
          const clonedContainer = clonedDoc.querySelector(`.${parametre}`);
          if (clonedContainer) {
            clonedContainer.style.backgroundColor = "#020b42";
          }
        },
      });

      // Step 3: Convert the canvas to a PNG image
      const imgData = canvas.toDataURL("image/png");

      // Step 4: Store the image data in sessionStorage or localStorage
      const imageId = generateUniqueId(); // Generate a unique ID for the image
      sessionStorage.setItem(`${parametre}`, imgData); // Use sessionStorage for temporary storage
      sessionStorage.setItem('imageId', imageId)
      console.log(`Image saved temporarily with ID: ${imageId}`);

      // Optionally, notify the user or proceed with further actions
      //alert("Chart image generated and stored temporarily. Use the provided ID to retrieve it.");

      // You can now use the `imageId` to retrieve the image later when generating the PDF
      return imageId;
    } catch (error) {
      console.error("Error generating or saving the chart image:", error);
    }
  };
  // Helper function to generate a unique ID
  function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
  useEffect(() => {
    handleDownloadChartPDF()
  }, [isloading])
  return (
    <div className='m-2' style={{ color: "white" }} >
      {/* <SelectGraphOptionsMarche
                UpdatedGraphDisplay={ModifyList}
                options={array}
                filter={filter}
                SetOptionFunction={SetOptionFunction}
              /> */}
      <Card style={{
        borderRadius: 10,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: "transparent",
        color: "white",
        border: "1px solid lightgrey",
        position: "relative",
      }}>

        {isloading && (
          <div style={{
            position: "absolute", height: "100%", width: "100%",
            backgroundColor: "#FFFFFF4D", zIndex: 3, top: "0px", left: "0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"

          }}>
            <CircularProgress />
          </div>
        )}
        <div className="card-body p-4" style={{
          padding: 0,
          display: "flex", flexDirection: "column"
        }} id="charts-container5">
          <div className="mt-2"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
            <ColorCheckboxes ChangeBaseFunction={ChangeBaseFunction} parametre={parametre} base={base} />
            {/* <PieChartIcon onClick={handleDownloadChart} style={{ cursor: "pointer" }} /> */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              width: "50px"
            }}>
              {/* <DownloadIcon onClick={handleDownloadChart} style={{ cursor: "pointer" }} /> */}
              <IconButton onClick={handleDownloadClick} style={{ cursor: "pointer", color: "white" }}>
                {/* <DownloadIcon /> */}
                <DownloadIcon style={{ cursor: "pointer" }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                sx={{ width: "100px" }}
                onClose={handleClose}
              >
                <MenuItem onClick={handleDownloadChart}>PNG</MenuItem>
                <MenuItem onClick={handleDownloadSVG}>SVG</MenuItem>
              </Menu>

              <SelectGraphOptionsMarche
                UpdatedGraphDisplay={ModifyList}
                options={array}
                filter={filter}
                SetOptionFunction={SetOptionFunction}
              />
            </div>
          </div>

          <div style={{
            width: "100%", display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            paddingTop: "5px",
            marginBottom: "10px"
          }}>
            <div style={{ fontWeight: "400", fontSize: "14px" }}>
              <p>{title}</p>
              <p>{formatDateToFrench(date1)}-{formatDateToFrench(date2)}</p>
            </div>
            <div>AVG ={Number(average).toFixed(2)}</div>
          </div>
          <div className={`$chart-container ${parametre}`}
            style={{ width: '100%', height: '500px', color: "red" }} id={parametre}>
            <ReactEcharts
              //className={`${parametre}`}
              style={{
                //height: '500px',
                height: '426px',
                display: "flex",
                justifyContent: "center",
                position: "static",
              }}
              option={option} />
            {/* <LegendComponent coloLables={coloLables} legendData={array} 
            chartDatalabelsBarColors={chartDatalabelsBarColors} /> */}
          </div>

        </div>
      </Card>
    </div>
  )
}
const LegendComponent = ({ legendData, chartDatalabelsBarColors, coloLables }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        marginBottom: '20px',

      }}
    >
      <ul
        style={{
          listStyleType: 'none',
          padding: 0,
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
        }}
      >
        {legendData.map((item, index) => (
          <li
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              color: coloLables, // Match the text color of the original legend
              fontSize: '10px',
            }}
          >
            {/* Color indicator */}
            <span
              style={{
                width: '10px',
                height: '10px',
                backgroundColor: chartDatalabelsBarColors[index % chartDatalabelsBarColors.length],
                marginRight: '5px',
                display: 'inline-block',
              }}
            ></span>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

