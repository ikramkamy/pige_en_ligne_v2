import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";
import { BarChartIcon, LineChartIcon, DownloadIcon } from "lucide-react";
import { UseFiltersStore } from "store/dashboardStore/FiltersStore";
import { UseGraphStore } from "store/GraphStore";
import { UsePigeDashboardStore } from "store/dashboardStore/PigeDashboardStore";
import ColorCheckboxes from './BaseCheckBoxGroupe';
import CircularProgress from '@mui/material/CircularProgress';
import { Container, Row, Col } from "react-bootstrap";
import {
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import './style.css'
export default function InteractiveLineChart({ base, ChangeBaseFunction, parametre, isloading }) {
  const listColors = [
    "#43a047",
    "#2196f3",
    "#d81b60",
  ]
  const [activeChart, setActiveChart] = useState("jour");
  const { date1, date2, media } = UseFiltersStore((state) => state)
  const { formatDateToFrench } = UsePigeDashboardStore((state) => state)
  const { EvolutionData, secondsToHoursObject, baseGraphs, setBaseGraphs } = UseGraphStore((state) => state);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // Function to handle menu opening
  const handleDownloadClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const arrTosort = EvolutionData?.heure?.map((e) => {
    return ({
      date: e.Date,
      heure: e.interval_start.split(':')[0] + ":" + e.interval_end.split(':')[1],
      total: e.total,
      jour: e.Jour,
    })
  })

  let EvolutionDataHeure = []
  const sortDatesAscending =(dateArray)=>{
    if (!Array.isArray(dateArray)) {
      throw new Error("Input must be an array of date strings.");
    }
  
    return dateArray.sort((a, b) => {
      // Convert date strings to Date objects for accurate comparison
      const dateA = new Date(a);
      const dateB = new Date(b);
  
      // Subtracting Date objects compares their timestamps (milliseconds since January 1, 1970)
      return dateA - dateB;
    });
  }
  if (media !== "presse") {
    const sortByHeure = (arr) => {
      return arr.sort((a, b) => {
        // Convert "HH:MM" to minutes for accurate comparison
        const toMinutes = (time) => {
          const [hours, minutes] = time.split(":").map(Number);
          return hours * 60 + minutes;
        };
        return toMinutes(a.heure) - toMinutes(b.heure);
      });
    }
    EvolutionDataHeure = sortByHeure(arrTosort).map((e) => {
      return ({
        name: e.heure,
        date: e.Date,
        total: Number(e.total),
        jour: e.Jour,
      })
    })
  } else {
    EvolutionDataHeure = []
  }


  const EvolutionDataJour2 = EvolutionData?.jour?.map((e) => ({
    date: e.Jour,
    heur: e.heure,
    total: Number(e.total),
    name: e.Date,
  })) || [];
  const EvolutionDataJour=sortDatesAscending(EvolutionDataJour2)
  console.log('EvolutionDataMois2',EvolutionDataJour2)
  const EvolutionDataMois = EvolutionData?.mois?.map((e) => ({
    date: e.Date,
    name: e.Mois,
    total: Number(e.total),
    jour: e.Jour,
  })) || [];

  const dataMapping = {
    heure: EvolutionDataHeure,
    jour: EvolutionDataJour,
    mois: EvolutionDataMois,
  };
  const [localColor, setLocalColor] = useState('red')
  const currentData = dataMapping[activeChart] || [];
  const getMinvalue = (currentData) => {
    const min = currentData.reduce((acc, current) => Math.min(acc, current.total),
      Infinity);
    return min
  }
  const chartConfig = {
    heure: {
      label: "Heure",
      //color: "#d81b60",
      color: localColor,
      total: EvolutionData?.heure?.length,
      max: EvolutionDataHeure[0]?.total,
      min: getMinvalue(EvolutionDataHeure),
    },
    jour: {
      label: "Jour",
      color: localColor,
      total: EvolutionData?.jour?.length,
      max: EvolutionDataJour[0]?.total,
      min: getMinvalue(EvolutionDataJour),

    },
    mois: {
      label: "Mois",
      color: localColor,
      total: EvolutionData?.mois?.length,
      max: EvolutionDataMois[0]?.total,
      min: getMinvalue(EvolutionDataMois),
    },
  };
  const total = useMemo(() => {
    return {
      heure: "",
      jour: "",
      mois: "",
    };
  }, [EvolutionDataHeure, EvolutionDataJour, EvolutionDataMois]);
  console.log("evolution", EvolutionDataHeure, EvolutionDataJour, EvolutionDataMois)
  // Custom Tooltip Content Function
  const LocalBaseGraph = baseGraphs[parametre] == "" ? base : baseGraphs[parametre]
  const colorMapping = [
    { value: 'volume', codeColor: '#43a047' },
    { value: 'budget', codeColor: '#2196f3' },
    { value: 'duree', codeColor: '#d81b60' }
  ];
  const getColorByValue = (value) => {
    const item = colorMapping.find(item => item.value === value);
    return item ? item.codeColor : '#blue';
  }
  useEffect(() => {
    let LocalColor = getColorByValue(LocalBaseGraph)
    setLocalColor(LocalColor)
  }, [baseGraphs, isloading, EvolutionData, base])

  useEffect(() => {
    setBaseGraphs && setBaseGraphs(parametre, base)
    console.log("baseGraphs", baseGraphs)
  }, [])
  const max = Number(chartConfig[activeChart]?.max)
  const min = Number(chartConfig[activeChart]?.min)
  const CustomTooltip = ({ active, payload, label }) => {
    console.log("payload", payload[0]?.payload)
    if (active && payload && payload.length) {

      return (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <strong style={{ color: "#d81b60" }} >{(payload[0]?.payload.name)}</strong>
          <br />
          <strong style={{ color: "#d81b60" }} >{(payload[0]?.payload.date)}</strong>
          <br />
          <strong style={{ color: "#d81b60" }} >{(payload[0]?.payload.total)}</strong>

          {/* <p><strong style={{ color: "#d81b60" }} >Date:</strong> </p>
          <p><strong style={{ color: "#d81b60" }}>Mois:</strong> {payload[0]?.payload.name}</p>
          <p><strong style={{ color: "#d81b60" }}>Total:</strong> {payload[0]?.payload.total}</p> */}
          {/* Add more fields as needed */}
          {/* {payload[0].payload.jour && <p>
            <strong style={{ color: "#d81b60" }}>Jour:</strong>
            {payload[0]?.payload.jour}</p>} */}
        </div>
      );
    }
    return null;
  };

  //Download SVG PNG
  const handleDownloadSVG = () => {
    const chartContainer = document.querySelector(".line-chart-container");
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
  const handleDownloadChart = () => {
    console.log('download')
    const chartContainer = document.querySelector(".line-chart-container");
    if (!chartContainer) return;

    html2canvas(chartContainer, {
      onclone: (clonedDoc) => {
        // Find the cloned container and set its background to black
        const clonedContainer = clonedDoc.querySelector(".line-chart-container");
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
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Usage in LineChart
  <LineChart data={currentData} margin={{ left: 12, right: 12, top: 10, bottom: 10 }}>
    {/* Other components */}
    <Tooltip content={<CustomTooltip />} />
    <Line
      dataKey="total"
      type="monotone"
      stroke={chartConfig[activeChart]?.color || "red"}
      strokeWidth={2}
      dot={false}
    />
  </LineChart>
  return (
    <div
      className="mb-4"
      style={{
        backgroundColor: "transparent",
        border: "1px solid lightgrey",
        borderRadius: "5px",
        color: "white",
        position: "relative",     
      }}
    >
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
      <div style={{
        width: "100%", display: "flex",
        justifyContent: "space-between",
        alignItems: "start",
        borderBottom: "1px solid #4D5479",
        marginBottom:"5px",
        //paddingTop: "5px"
      }}>
        <div className="px- " style={{
          height: "100%",
          // paddingTop: "32px",
          // paddingBottom: "32px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "start",
          height: "100px",
        }}>


          <div className="custom_responsive"   >
            <div>{formatDateToFrench(date1)} - {formatDateToFrench(date2)}</div>
            <p className="fw-bold">
              {LocalBaseGraph === "duree" ? "durée" : LocalBaseGraph} de diffusion par{" "}
              {Object.keys(chartConfig)
                .filter((key) => key === activeChart)
                .map((key) => (
                  <span key={key} className="fw-bold" style={{ fontWeight: "bold" }}>
                    {chartConfig[key].label}
                  </span>
                ))}
            </p>
          </div>
        </div>
        <div className="flex gap " style={{
          display: "flex", width: "70%",
          justifyContent: "flex-end", alignItems: "center",
          height: "100px",

        }}>
          {Object.keys(chartConfig).map((key) => (
            <div
              style={{

                width: "15%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderLeft: "1px solid lightgrey",
                paddingTop: "32px",
                paddingBottom: "32px",
                paddingLeft: "40px",
                paddingRight: "40px",
                cursor: "pointer",
                backgroundColor: activeChart === key ? "#4D5479" : "transparent",
                transition: "background-color 0.3s ease",
                height: "100%"

              }}
              key={key}
              className={`
                cursor-pointer 
                ${activeChart === key ? "bg-gray-200" : "bg-transparent hover:bg-gray-100"}
              `}
              onClick={() => setActiveChart(key)}
            >
              <div className="flex flex-col justify-start">
                <span className="text-sm">{chartConfig[key].label}</span>
                <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  {chartConfig[key].total}</p>

              </div>
              <span className="block text-lg font-bold">
                {total[key]?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="px-4"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom:"20px"
        }}>
        <ColorCheckboxes ChangeBaseFunction={ChangeBaseFunction} parametre={parametre} base={base} />
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

      </div>
      <ResponsiveContainer width="100%" minHeight={300}
        className="line-chart-container"
        style={{marginBottom: "20px", padding: "20px" }} >
        <LineChart
          data={currentData}
          margin={{
            left: 12,
            right: 12,
            top: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid vertical={false} stroke="#FFFFFF4D" />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => value}
            tick={{ fill: "white" }}
            tickCount={24}
          />
          <YAxis
            domain={[min, max]}
            tick={{ fill: "#FFFFFF4D", fontSize: "12px" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            dataKey="total"
            type="monotone"

            stroke={chartConfig[activeChart]?.color || "red"}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>



    </div>
  );
}