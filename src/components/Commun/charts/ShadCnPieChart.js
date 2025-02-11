import React, { useState, useMemo, useEffect, useRef } from "react";
import { PieChart, Pie, Sector, Label } from "recharts";
import { Box, Typography, CardContent } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { Card } from "react-bootstrap";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const data = [
  { month: "january", visitors: 186, fill: "#e23670" },
  { month: "february", visitors: 305, fill: "#2662da" },
  { month: "march", visitors: 237, fill: "#2eb789" },
  { month: "april", visitors: 173, fill: "#ae57da" },
  { month: "may", visitors: 209, fill: "#e78c2f" },
];

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

export const InteractivePieChart = () => {
  const [activeMonth, setActiveMonth] = useState(data[0].month);
  const [isDynamicSelectionActive, setIsDynamicSelectionActive] = useState(true);

  // Use a ref to store the timeout ID to avoid re-renders
  const timeoutRef = useRef(null);

  const activeIndex = useMemo(() => data.findIndex((item) => item.month === activeMonth), [activeMonth]);
console.log('timeoutRef',timeoutRef)
  // Function to handle dynamic selection
  const handleDynamicSelection = () => {
    let currentIndex = data.findIndex((item) => item.month === activeMonth);
    const nextIndex = (currentIndex + 1) % data.length; // Cycle through the months
    setActiveMonth(data[nextIndex].month);

    // Set the next timeout if dynamic selection is still active
    if (isDynamicSelectionActive) {
      timeoutRef.current = setTimeout(handleDynamicSelection, 5000);
    }
  };

  // Start dynamic selection when the component mounts
  useEffect(() => {
    if (isDynamicSelectionActive) {
      timeoutRef.current = setTimeout(handleDynamicSelection, 5000);
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
      style={{ backgroundColor: "transparent", color: "white" }}
    >
      <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h6" color="white">
            Pie Chart - Interactive
          </Typography>
          <Typography variant="body2" color="white">
            January - May 2024
          </Typography>
        </Box>
        <FormControl fullWidth sx={{ width: "120px" }}>
          <InputLabel id="demo-simple-select-label">Month</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={activeMonth}
            onChange={(e) => {
              setIsDynamicSelectionActive(false); // Stop dynamic selection on manual change
              setActiveMonth(e.target.value);
            }}
            label="Month"
            sx={{
              color: "white",
            }}
          >
            {data.map((item) => (
              <MenuItem key={item.month} value={item.month}>
                {item.month.charAt(0).toUpperCase() + item.month.slice(1)}
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
              innerRadius={40}
              outerRadius={80}
              dataKey="visitors"
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
                        {data[activeIndex].visitors}
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