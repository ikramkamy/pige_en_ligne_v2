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
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { height, styled } from "@mui/system";
import {
  ListSubheader,
  IconButton,
  Menu,
  Input,
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
  isloading,heightgraph }) => {
  const { graphColor, baseGraphs, setBaseGraphs } = UseGraphStore((state) => state)
  const { base,date1,date2 } = UseFiltersStore((state) => state)
  const { formatDateToFrench } = UsePigeDashboardStore((state) => state)
  const [localColor, setLocalColor] = useState('#2196f3')
  const [chartData, setChartData] = useState(data);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [cololabels, setCololabels] = React.useState("white")
 
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
  //const average = data[0]?.average;
  const list2 = data.map((e) => Number(e.total));
  const sum = list2.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
  const average = sum / data?.length
  const max = Number(data[0]?.total);

  const colorMap = {
    volume: "#43a047", // Green
    budget: "#2196f3", // Blue
    duree: "#d81b60",  // Red
  };

  const GraphColor = colorMap[graphColor] || "#2196f3";
  const calculateChartData = (data, options) => {
    return data.filter((item) => options.includes(item.someKey));

  };
  useEffect(() => {

    const updatedData = calculateChartData(data, options);

    setChartData(data);
    // setAverage(updatedData[0]?.average || 0);
  }, [options, data]);
 

  //Download SVG PNG
  const handleDownloadClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDownloadChart = () => {
    setCololabels("black")
    const chartContainer = document.querySelector(`.${parametre}`);
    const AxisLabel = document.querySelector(".recharts-layer recharts-cartesian-axis-tick")
    // console.log("AxisLabel", chartContainer, AxisLabel)
    if (!chartContainer) return;
    setTimeout(() => {
      html2canvas(chartContainer, {
        onclone: (clonedDoc) => {
          // Find the cloned container and set its background to black
          const clonedContainer = clonedDoc.querySelector(`.${parametre}`);
          if (clonedContainer) {
            //clonedContainer.style.backgroundColor = "black";
          }
        },
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png"); // Convert canvas to PNG
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "chart.png"; // Set the filename
        link.click(); // Trigger the download
      });
      setCololabels('white')
    }, 5000);
  };
  const handleDownloadSVG = () => {
    const chartContainer = document.querySelector(`.${parametre}`);
    if (!chartContainer) return;
    setCololabels("black")
    // Find the SVG element within the container
    setTimeout(() => {


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
        <rect width="${width}" height="${height}" fill="white" />
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
      setCololabels('white')
    }, 5000);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownloadChartPDF = async () => {
    console.log("Generating chart image...");

    // Step 1: Capture the chart container
    const chartContainer = document.querySelector(`.${parametre}`);
    if (!chartContainer) {
      console.error("Chart container not found!");
      return;
    }

    try {
      // Step 2: Generate the canvas from the chart container
      await new Promise((resolve) => setTimeout(resolve, 5000));
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
      sessionStorage.setItem(`.${parametre}`, imgData); // Use sessionStorage for temporary storage
      sessionStorage.setItem('imageId', imageId)
      //console.log(`Image saved temporarily with ID: ${imageId}`);

      return imageId;
    } catch (error) {
      //console.error("Error generating or saving the chart image:", error);
    }
  };

  // Helper function to generate a unique ID
  function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
  useEffect(() => {
    //handleDownloadChartPDF()
  }, [data])
// console.log('heightgraph',heightgraph)

  return (
    <div style={{
      backgroundColor: "transparent",
      color: "white",
      borderRadius: "10px",
      padding: "15px",
      margin: "15px",
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
          alignItems: "center",

        }}>
        <ColorCheckboxes
          ChangeBaseFunction={ChangeBaseFunction}
          parametre={parametre} base={base} />

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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

          {/* <MultiselectForGraph
            options={options}
            UpdatedGraphDisplay={UpdatedGraphDisplay}
            media={media}
            SetOptionFunction={SetOptionFunction}
            filters={filters}
          /> */}
          <TopOption

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


        <div style={{ fontWeight: "400", fontSize: "22px" }}>
          {title}
          <p>{formatDateToFrench(date1)}-{formatDateToFrench(date2)}</p>
          </div>
        
        <div >AVG ={Number(average).toFixed(2)}</div>
      </div>
      <div className="custom-scrollbar" style={{
        width: "100%",
        height: "300px",
        overflowY: "scroll",
      }}>
        <ResponsiveContainer width="100%"
          height={heightgraph}
          overflowY={scroll}
          className={`px-2 ${parametre}`}
          style={{
            padding: "10px",

           // overflowY:"scroll",
          }}
        >
          <BarChart
            data={chartData}
            layout="vertical"
            height={300}
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
              tickLine={false} axisLine={false}
              width={250}

              tick={{
                dx: -230, // Adjust horizontal alignment (negative value moves labels to the left)
                textAnchor: "start", // Align text to the start (left)
                dominantBaseline: "middle", // Center vertically
                fill: cololabels
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
              barSize={20}
              radius={[10, 10, 10, 10]} >
              <LabelList dataKey="total"
                position="right"
                fill={cololabels}
                fontSize={14}
                barGap={1} // Controls spacing between bars in the same category

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
      </div>
      {/* <div className="text-gray-600">Showing total
             visitors for the last 6 months</div> */}
      <div style={{ color: "#4c5479" }}>
        {media === "budget"
          ? "les valeurs affichées en Million"
          : media === "duree"
            ? "les valeurs affichées en Heures"
            : ""}
      </div>
    </div>
  );
};

const MultiselectForGraph = ({ options, UpdatedGraphDisplay, media, SetOptionFunction, filters }) => {
  const { FamillesOptions, graphColor, baseGraphs } = UseGraphStore((state) => state)
  const {
    Top20famillesSectorielles,
    Top20produits,
    Top20Annonceurs,
    Top20marques,
    CreationParAnnonceur,
    AnnonceurParSupport,

  } = UsePigeDashboardStore((state) => state)

  const [selectedList, setSelectedList] = useState(options.slice(0, 5));
  const [dynamicList, setDynamicList] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  let optionList = options
  useEffect(() => {
    setSelectedItems(optionList.slice(0, 20).map((e) => e.name));
  }, [Top20famillesSectorielles,
    Top20produits, Top20Annonceurs,
    Top20marques, CreationParAnnonceur,
    AnnonceurParSupport]);

  const ModifyList = () => {
    var autresList = options.filter((e) => !options.includes(e))

    // var autresList = AnnonceurParSupport 
    // var valueAutre = autresList.map((e) => Number(e.annonceur_count))
    // var PourcentageAutre = autresList.map((e) => Number(e.proportion))
    // const totalSum = valueAutre.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    // const totalSumPourcentage = PourcentageAutre.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    // var listWithAutre = options;
    // var autre = {
    //     annonceur_count: totalSum.toFixed(2).toString(),
    //     proportion: totalSumPourcentage.toFixed(2),
    //     Chaine_Lib: `autres`,
    //     Titre_Lib: "autre"
    // }
    // listWithAutre.push(autre)
    //setDynamicList([...listWithAutre])
    // console.log("dynamic list", dynamicList, AnnonceurParSupport)
  }
  // if(media!=="presse"){
  //     optionList = options.map((e) => e.Chaine_Lib);
  // }else{
  //    optionList = options.map((e) => e.Titre_Lib);
  // }

  const handleChange = (event) => {
    const selected = event.target.value;
    const elem = options.filter((elem) => elem.name == selected)

    setSelectedItems((prevSelectedItems) => {
      console.log('elem to add', elem, prevSelectedItems)
      if (prevSelectedItems.includes(selected)) {
        return prevSelectedItems.filter((item) => item !== selected);
      } else {
        if (prevSelectedItems.length >= 20) {
          return [...prevSelectedItems.slice(1), selected];
        } else {
          return [...prevSelectedItems, selected];
        }
      }
    });
  };

  useEffect(() => {
    const newSelectedList = options.filter((e) =>
      selectedItems.includes(e.name)
    );
    setSelectedList(newSelectedList);
    SetOptionFunction && SetOptionFunction(newSelectedList);
  }, [selectedItems]);
  useEffect(() => {
    ModifyList()
  }, [])

  const StyledSelect = styled(Select)(({ theme }) => ({
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none", // Remove the default border
    },
    "& .MuiSvgIcon-root": {
      display: "none", // Hide the dropdown arrow icon
    },
    "&:focus": {
      outline: "none", // Remove focus outline
      boxShadow: "none", // Remove focus shadow
    },
    backgroundColor: "#010A41E6", // Set background color
    color: "white", // Set text color
    height: "35px", // Set custom height
  }));
  return (
    <FormControl sx={{
      m: 0,
      width: "50",
      marginTop: "-5px",
      margin: "0px",
      marginRight: "0px"

    }}>
      <StyledSelect
        sx={{ height: "10px", backgroundColor: "010A41E6", color: "white" }}
        labelId="demo-multiple-checkbox-label"
        input={<OutlinedInput label={`${filters}`} />}
        value={selectedItems}
        onChange={handleChange}
        //renderValue={() => `Top ${selectedItems.length} ${filters}`}
        // renderValue={() => `+`}
        renderValue={() => <div style={{
          color: "white",
          transform: "rotate(90deg)", fontWeight: "900"
        }}>
          <span style={{
            transform: "rotate(90deg)",
            fontWeight: "900"
          }}>...</span>
        </div>}
      >
        {options.map((elem) => (
          <MenuItem key={options.indexOf(elem)} value={elem.name} >
            <Checkbox checked={selectedItems.includes(elem.name)} />
            <ListItemText primary={elem.name} />
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>

  )
}
const TopOption = ({ options, UpdatedGraphDisplay, media, SetOptionFunction, filters }) => {
  const { FamillesOptions, graphColor, baseGraphs } = UseGraphStore((state) => state)
  const {
    Top20famillesSectorielles,
    Top20produits,
    Top20Annonceurs,
    Top20marques,
    CreationParAnnonceur,
    AnnonceurParSupport,

  } = UsePigeDashboardStore((state) => state)
  const [optionNumber, setOptionNumber] = useState(10)
  const [selectedList, setSelectedList] = useState(options.slice(0, 5));
  const [dynamicList, setDynamicList] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  let optionList = options
  useEffect(() => {
    setSelectedItems(optionList.slice(0, 10));
    SetOptionFunction && SetOptionFunction(optionList.slice(0, 10));
    //console.log("selectedItems",selectedItems,"baseGraphs",baseGraphs)
  }, [Top20famillesSectorielles,
    Top20produits, Top20Annonceurs,
    Top20marques, CreationParAnnonceur,
    AnnonceurParSupport, baseGraphs]);

  const ModifyList = (e) => {
    console.log("e?.target?.value", e?.target?.value)
    const newValue = Math.max(1, Math.min(20, parseInt(e?.target?.value, 10)));
    // Clamp value between 1 and 100
    setOptionNumber(e?.target?.value);
    console.log("newValue", newValue)
  };

  useEffect(() => {
    const newSelectedList = options.slice(0, optionNumber);
    setSelectedList(newSelectedList);

    SetOptionFunction && SetOptionFunction(newSelectedList);
  }, [optionNumber]);

  useEffect(() => {
    //ModifyList()
  }, [])
  // console.log("baseGraphs", baseGraphs)
  const [isOpen, setIsOpen] = useState(false)
  const StyledSelect = styled(Select)(({ theme }) => ({
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none", // Remove the default border
    },
    "& .MuiSvgIcon-root": {
      display: "none", // Hide the dropdown arrow icon
    },
    "&:focus": {
      outline: "none", // Remove focus outline
      boxShadow: "none", // Remove focus shadow
    },
    backgroundColor: "#010A41E6", // Set background color
    color: "white", // Set text color
    height: "35px", // Set custom height
  }));


  return (
    <FormControl sx={{
      m: 0,
      width: "50",
      marginTop: "-5px",
      margin: "0px",
      marginRight: "0px"

    }}>
      <Input
        type='number'
        value={optionNumber}
        inputProps={{ min: 1, max: 20 }}
        onChange={ModifyList}
        sx={{
          color: "white",
          width: "50px",
          border: "1px solid white",
          borderRadius: "5px",
          paddingLeft: "5px"
        }}
      />
    </FormControl>

  )
}


