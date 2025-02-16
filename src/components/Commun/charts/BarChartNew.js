import React, { useState, useEffect } from 'react';
import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { UsePigeDashboardStore } from "store/dashboardStore/PigeDashboardStore";
import ColorCheckboxes from './BaseCheckBoxGroupe';
import CircularProgress from '@mui/material/CircularProgress';
import './style.css';
import { DownloadIcon } from "lucide-react";

import { UseGraphStore } from "store/GraphStore";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { UseFiltersStore } from 'store/dashboardStore/FiltersStore';
import html2canvas from "html2canvas";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  ListSubheader,
  IconButton,
  Menu,
} from "@mui/material";
export const BarchartShadcn = ({
  title,
  data,
  media,
  options,
  UpdatedGraphDisplay,
  SetOptionFunction,
  filters,
  ChangeBaseFunction,
  parametre,
  isloading }) => {
  const { graphColor, baseGraphs, setBaseGraphs } = UseGraphStore((state) => state)
  const { base } = UseFiltersStore((state) => state)
  const { formatDateToFrench } = UsePigeDashboardStore((state) => state)
  const [localColor, setLocalColor] = useState('#2196f3')
  const [chartData, setChartData] = useState(data);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    setBaseGraphs && setBaseGraphs(parametre, base)
  }, [])
  const colorMapping = [
    { value: 'volume', codeColor: '#43a047' },
    { value: 'budget', codeColor: '#2196f3' },
    { value: 'duree', codeColor: '#d81b60' }
  ];
  const LocalBaseGraph = baseGraphs[parametre] == "" ? base : baseGraphs[parametre]
  const getColorByValue = (value) => {
    const item = colorMapping.find(item => item.value === value);
    return item ? item.codeColor : '#2196f3';
  }
  useEffect(() => {
    let LocalColor = getColorByValue(LocalBaseGraph)
    setLocalColor(LocalColor)
  }, [baseGraphs])
  //const [average, setAverage] = useState(data[0]?.average || 0);
  const average = data[0]?.average;
  const max = Number(data[0]?.total);

  const colorMap = {
    volume: "#43a047", // Green
    budget: "#2196f3", // Blue
    duree: "#d81b60",  // Red
  };

  const GraphColor = colorMap[graphColor] || "#2196f3";
  useEffect(() => {

    const updatedData = calculateChartData(data, options);

    setChartData(data);
    // setAverage(updatedData[0]?.average || 0);
  }, [options, data]);
  const calculateChartData = (data, options) => {
    return data.filter((item) => options.includes(item.someKey));

  };

  //Download SVG PNG
  const handleDownloadClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDownloadChart = () => {
   
    const chartContainer = document.querySelector(`.${parametre}`);
    const AxisLabel=document.querySelector(".recharts-layer recharts-cartesian-axis-tick")
    console.log("AxisLabel",chartContainer,AxisLabel)
    if (!chartContainer) return;

    html2canvas(chartContainer, {
      onclone: (clonedDoc) => {
        // Find the cloned container and set its background to black
        const clonedContainer = clonedDoc.querySelector(`.${parametre}`);
        if (clonedContainer) {
          clonedContainer.style.backgroundColor = "black";
          
        }
      },
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png"); // Convert canvas to PNG
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "chart.png"; // Set the filename
      link.click(); // Trigger the download
    });

  };
  const handleDownloadSVG = () => {
    const chartContainer = document.querySelector(`.${parametre}`);
    if (!chartContainer) return;

    // Find the SVG element within the container
    const svgElement = chartContainer.querySelector("svg");
    if (!svgElement) return;

    // Serialize the original SVG content
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgElement);

    // Extract the viewBox attributes to determine the dimensions
    const viewBox = svgElement.getAttribute("viewBox").split(" ").map(Number);
    const width = viewBox[2];
    const height = viewBox[3];

    // Wrap the original SVG content with a black background rectangle
    const modifiedSvgString = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
        <!-- Black background rectangle -->
        <rect width="${width}" height="${height}" fill="black" />
        <!-- Original SVG content -->
        ${svgString}
      </svg>
    `;

    // Create a Blob and download the modified SVG
    const blob = new Blob([modifiedSvgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "chart.svg";
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);

    // Close the menu after download
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <div style={{
      backgroundColor: "transparent",
      color: "white",
      borderRadius: "10px", padding: "15px",
      border: "1px solid white",
      position: "relative"
    }} className="bar-chart-container">
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
      <div className="mt-2 mb-4"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
        <ColorCheckboxes ChangeBaseFunction={ChangeBaseFunction} parametre={parametre} base={base} />

        <div style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
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

          <MultiselectForGraph
            options={options}
            UpdatedGraphDisplay={UpdatedGraphDisplay}
            media={media}
            SetOptionFunction={SetOptionFunction}
            filters={filters}
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


        <div style={{ fontWeight: "400", fontSize: "22px" }}>{title}</div>
        <div>AVG ={Number(average).toFixed(2)}</div>
      </div>

      <ResponsiveContainer width="100%" minHeight={300}
        className={`px-2 ${parametre}`}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid horizontal={false} /> */}
          <YAxis dataKey="name" type="category"
            fontSize={14}
            fontWeight="500"
            //fill="#4B5563"
            fill="white"
            tickLine={false} axisLine={false} width={250}
            tick={{
              dx: -230, // Adjust horizontal alignment (negative value moves labels to the left)
              textAnchor: "start", // Align text to the start (left)
              dominantBaseline: "middle", // Center vertically
              fill: "white"
            }}
          />
          <XAxis type="number"
            fill="white"
            domain={[0, max]}
            hide
            tick={{ fill: "white" }}

          />
          {/* <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            /> */}

          <Bar dataKey="total"

            fill={localColor}

            radius={[10, 10, 10, 10]} >
            <LabelList dataKey="total"
              position="right"
              fill="white"
              fontSize={10}
              fontWeight="500"


            />
            <LabelList
              dataKey="proportion" // Use the 'proportion' data key
              position="inside" // Position labels inside the bar
              fill="white" // Set label color to white for visibility
              fontSize={10} // Adjust font size for better readability
              formatter={(value) => `${parseFloat(value).toFixed(2)}%`} // Format proportion as percentage
            />
          </Bar>
        </BarChart>

      </ResponsiveContainer>


      {/* <div className="text-gray-600">Showing total
             visitors for the last 6 months</div> */}

    </div>
  );
};

const MultiselectForGraph = ({ options, UpdatedGraphDisplay, media, SetOptionFunction, filters }) => {
  const { FamillesOptions, graphColor, baseGraphs } = UseGraphStore((state) => state);
  const {
    Top20famillesSectorielles,
    Top20produits,
    Top20Annonceurs,
    Top20marques,
    CreationParAnnonceur,
    AnnonceurParSupport,
  } = UsePigeDashboardStore((state) => state);
  const [selectedList, setSelectedList] = useState(options.slice(0, 5));
  const [dynamicList, setDynamicList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null); // For Menu anchor
  const isOpen = Boolean(anchorEl);

  let optionList = options;

  useEffect(() => {
    setSelectedItems(optionList.slice(0, 10).map((e) => e.name));
  }, [
    Top20famillesSectorielles,
    Top20produits,
    Top20Annonceurs,
    Top20marques,
    CreationParAnnonceur,
    AnnonceurParSupport,
  ]);

  const ModifyList = () => {
    var autresList = options.filter((e) => !options.includes(e));

  };

  const handleToggleDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    const selected = event.target.value;
    const elem = options.find((elem) => elem.name === selected);

    setSelectedItems((prevSelectedItems) => {
      console.log("elem to add", elem, prevSelectedItems);
      if (prevSelectedItems.includes(selected)) {
        return prevSelectedItems.filter((item) => item !== selected);
      } else {
        if (prevSelectedItems.length >= 10) {
          return [...prevSelectedItems.slice(1), selected];
        } else {
          return [...prevSelectedItems, selected];
        }
      }
    });
  };

  useEffect(() => {
    const newSelectedList = options.filter((e) => selectedItems.includes(e.name));
    setSelectedList(newSelectedList);
    SetOptionFunction && SetOptionFunction(newSelectedList);
  }, [selectedItems]);

  useEffect(() => {
    ModifyList();
  }, []);


  return (
    <FormControl sx={{ m: 0, width: "50", margin: "0px", marginRight: "0px" }}>
      {/* Trigger Button (Three-Dot Icon) */}
      <IconButton
        size="small"
        aria-label="more"
        aria-controls={isOpen ? "long-menu" : undefined}
        aria-expanded={isOpen ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggleDropdown}
        sx={{ backgroundColor: "#010A41E6", color: "white" }}
      >
        <MoreVertIcon />
      </IconButton>

      {/* Dropdown Menu */}
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleCloseDropdown}
        PaperProps={{
          style: {
            maxHeight: 300,
            width: "200px",
          },
        }}
      >
        <ListSubheader>{`Top ${selectedItems.length} ${filters}`}</ListSubheader>
        {options.map((elem) => (
          <MenuItem
            key={options.indexOf(elem)}
            value={elem.name}
            onClick={(event) => {
              handleChange(event);
              handleCloseDropdown(); // Close menu after selection
            }}
          >
            <Checkbox checked={selectedItems.includes(elem.name)} />
            <ListItemText primary={elem.name} />
          </MenuItem>
        ))}
      </Menu>
    </FormControl>
  );
};




