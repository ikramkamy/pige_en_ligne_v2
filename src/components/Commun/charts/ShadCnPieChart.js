import React, { useState, useMemo, useEffect, useRef } from "react";
import { PieChart, Pie, Sector, Label } from "recharts";
import { Box, Typography, CardContent } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { Card } from "react-bootstrap";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ColorCheckboxes from './BaseCheckBoxGroupe';
import { UsePigeDashboardStore } from "store/dashboardStore/PigeDashboardStore";
import { UseFiltersStore } from "store/dashboardStore/FiltersStore";


function renderActiveShape(props) {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 25}
        fill={fill}
      />
    </g>
  );
}

export const InteractivePieChart = ({title,dataType}) => {
  const {formatDateToFrench}=UsePigeDashboardStore((state)=>state)
  const {date1,date2}=UseFiltersStore((state)=>state)
  
  const [isDynamicSelectionActive, setIsDynamicSelectionActive] = useState(true);
  const handleDownloadClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // const data = [
  //   { name: "january",proportion:20, total: 186, fill: "#e23670",average:2 },
  //   { name: "february",proportion:20, total: 305, fill: "#2662da",average:2 },
  //   { name: "march",proportion:20, total: 237, fill: "#2eb789" ,average:2 },
  //   { name: "april", proportion:20,total: 173, fill: "#ae57da",average:2  },
  //   { name: "may",proportion:20, total: 209, fill: "#e78c2f",average:2  },
  // ];
  // const colors =[ "#e23670","#2662da",
  //   "#2eb789","#ae57da", "#ae57da", "#e78c2f","#098638","#f7abb7","#5f432e"]
  const colors = [
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
];

  const data = dataType?.map((e)=>{
    return{ 
      name: e.Type,
      proportion: Number(e.proportion), 
      total: Number(e.total), 
      fill: colors[dataType.indexOf(e)],
      average:e.average }
  })
  console.log("data",dataType,data)
  const [activeName, setActiveName] = useState(data[0].name);
  // Use a ref to store the timeout ID to avoid re-renders
  const timeoutRef = useRef(null);

  const activeIndex = useMemo(() => data.findIndex((item) => item.name=== activeName), [activeName]);
 
  // Function to handle dynamic selection
  const handleDynamicSelection = () => {
    let currentIndex = data.findIndex((item) => item.name === activeName);
    const nextIndex = (currentIndex + 1) % data.length; // Cycle through the months
  
    setActiveName(data[nextIndex].name);

    // Set the next timeout if dynamic selection is still active
    if (isDynamicSelectionActive) {
      timeoutRef.current = setTimeout(handleDynamicSelection, 2000);
    }
  };

  // Start dynamic selection when the component mounts
  useEffect(() => {
    if (isDynamicSelectionActive) {
      timeoutRef.current = setTimeout(handleDynamicSelection, 2000);
    }

    // Cleanup function to clear the timeout on unmount or when dynamic selection stops
    return () => clearTimeout(timeoutRef.current);
  }, [isDynamicSelectionActive]); // Only trigger when `isDynamicSelectionActive` changes

  // Stop dynamic selection when the user interacts with the chart
  const handleMouseEnter = () => {
    setIsDynamicSelectionActive(false);
    clearTimeout(timeoutRef.current); // Clear the timeout immediately
  };

  // Resume dynamic selection when the user stops interacting
  const handleMouseLeave = () => {
    setIsDynamicSelectionActive(true);
  };

  return (
    <Card
      sx={{ width: "100%", maxWidth: "400px", mx: "auto" }}
      style={{ backgroundColor: "transparent", color: "white", border: "1px solid lightgrey" }}
    >
      <Box sx={{marginTop:"20px"}}>

        <ColorCheckboxes />
      </Box>
      <Box p={2} display="flex" justifyContent="space-between" alignItems="center">

        <Box>

          <Typography variant="h6" color="white" sx={{textTransform:"none"}}>
            {title}
          </Typography>
          <Typography variant="body2" color="white">
           
            {formatDateToFrench(date1)}-{formatDateToFrench(date2)}
          </Typography>
        </Box>
        <FormControl fullWidth sx={{ width: "120px" }}>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={activeName}
            onChange={(e) => {
              setIsDynamicSelectionActive(false); // Stop dynamic selection on manual change
              setActiveName(e.target.value);
            }}
            label="Type"
            sx={{
              color: "white",
            }}
          >
            {data.map((item) => (
              <MenuItem key={item.name} value={item.name}>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <CardContent>
        <Box
          sx={{ width: "100%", aspectRatio: "1 / 1", maxWidth: "300px", mx: "auto" }}
        >
          <PieChart
            width={300}
            height={300}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={20}
              outerRadius={80}
              dataKey="total"
            >
              <Label
                content={({ viewBox }) => {
                  const { cx, cy } = viewBox;
                  return (
                    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
                      <tspan
                        fill="white"
                        x={cx}
                        y={cy}
                        dy="-0.5em"
                        className="text-2xl font-bold fill-current"
                      >
                        {data[activeIndex].total}
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </Box>
      </CardContent>
    </Card>
  );
};