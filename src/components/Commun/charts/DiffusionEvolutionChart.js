import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { UseGraphStore } from "store/GraphStore";
import ColorCheckboxes from './BaseCheckBoxGroupe';
const chartConfig = {
  heure: {
    label: "Heure",
    color: "#d81b60",
  },
  jour: {
    label: "Jour",
    color: "#d81b60",
  },
  mois: {
    label: "Mois",
    color: "#d81b60",
  },
};

export default function InteractiveLineChart({base,ChangeBaseFunction}) {
  const [activeChart, setActiveChart] = useState("heure");
  const { EvolutionData } = UseGraphStore((state) => state);

  const EvolutionDataHeure = EvolutionData?.heure?.map((e) => ({
    date: e.Date,
    name: e.heure,
    total: Number(e.total)*1000000,
    jour: e.Jour,
  })) || [];

  const EvolutionDataJour = EvolutionData?.jour?.map((e) => ({
    date: e.Date,
    heur: e.heure,
    total: e.total,
    name: e.Jour,
  })) || [];

  const EvolutionDataMois = EvolutionData?.mois?.map((e) => ({
    date: e.Date,
    name: e.Mois,
    total: e.total,
    jour: e.Jour,
  })) || [];

  const dataMapping = {
    heure: EvolutionDataHeure,
    jour: EvolutionDataJour,
    mois: EvolutionDataMois,
  };

  const currentData = dataMapping[activeChart] || [];

  const total = useMemo(() => {
    return {
      heure: "",
      jour: "",
      mois: "",
    };
  }, [EvolutionDataHeure, EvolutionDataJour, EvolutionDataMois]);
console.log("evolution", EvolutionDataHeure,EvolutionDataJour, EvolutionDataMois)



// Custom Tooltip Content Function
const CustomTooltip = ({ active, payload, label }) => {
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
        <p><strong style={{color:"#d81b60"}} >Date:</strong> {payload[0].payload.date}</p>
        <p><strong style={{color:"#d81b60"}}>Name:</strong> {label}</p>
        <p><strong style={{color:"#d81b60"}}>Total:</strong> {payload[0].value}</p>
        {/* Add more fields as needed */}
        {payload[0].payload.jour && <p>
            <strong style={{color:"#d81b60"}}>Jour:</strong> 
            {payload[0].payload.jour}</p>}
      </div>
    );
  }
  return null;
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
        padding: "20px",
        border: "1px solid lightgrey",
        borderRadius: "5px",
        color: "white",
      }}
    >

<div style={{
                width: "100%", display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                paddingTop:"5px"
            }}>
                <div>
                Evolution du {base} de diffusion par{" "}
    {Object.keys(chartConfig)
      .filter((key) => key === activeChart)
      .map((key) => (
        <span key={key} className="text-sm font-medium">
          {chartConfig[key].label}
        </span>
      ))}
      </div>
                

      <div className="flex gap-2 mb-4">
        {Object.keys(chartConfig).map((key) => (
          <button
            key={key}
            className={`px-4 py-2 border rounded ${
              activeChart === key ? "bg-gray-200" : "bg-transparent"
            }`}
            onClick={() => setActiveChart(key)}
          >
            <span className="text-sm">{chartConfig[key].label}</span>
            <span className="block text-lg font-bold">
              {total[key]?.toLocaleString()}
            </span>
          </button>
        ))}
      </div>
      </div>

      <ResponsiveContainer width="100%" minHeight={300}>
        <LineChart
          data={currentData}
          margin={{
            left: 12,
            right: 12,
            top: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid vertical={false} stroke="#e0e0e0" />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => value}
            tick={{ fill: "white" }}
          />
          <Tooltip content={<CustomTooltip />}/>
          <Line
            dataKey="total"
            type="monotone"
            stroke={chartConfig[activeChart]?.color || "red"}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <ColorCheckboxes/>
    </div>
  );
}