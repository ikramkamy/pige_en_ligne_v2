import React, { useState, useEffect } from 'react';
import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { UsePigeDashboardStore } from "store/dashboardStore/PigeDashboardStore";
import ColorCheckboxes from './BaseCheckBoxGroupe';
import CircularProgress from '@mui/material/CircularProgress';
import './style.css';
import { BarChartIcon, ExpandIcon,DownloadIcon } from "lucide-react";

import { UseGraphStore } from "store/GraphStore";
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { UseFiltersStore } from 'store/dashboardStore/FiltersStore';
import html2canvas from "html2canvas";
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
    const handleDownloadChart = () => {
        console.log('download')
        const chartContainer = document.querySelector(".bar-chart-container");
        if (!chartContainer) return;

        html2canvas(chartContainer, {
            onclone: (clonedDoc) => {
                // Find the cloned container and set its background to black
                const clonedContainer = clonedDoc.querySelector(".bar-chart-container");
                if (clonedContainer) {
                    clonedContainer.style.backgroundColor = "black"; // Set black background for the cloned element
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
    useEffect(() => {
        if (parametre == "top20produit") {
            console.log("data in graph", data, parametre)
        }

    }, [data])
    if (parametre == "top20produit") {
        console.log("data in graph", data, parametre)
    }
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
                <div>AVG ={Number(average).toFixed(2)}</div>
                <div>
                <DownloadIcon onClick={handleDownloadChart} style={{ cursor: "pointer" }} />
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
                <div style={{fontWeight:"400", fontSize:"22px"}}>{title}</div>
              
               
            </div>

            <ResponsiveContainer width="100%" minHeight={300}
                className="px-2 .bar-chart-container" >
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

           
            {/* <div className="text-gray-600">Showing total visitors for the last 6 months</div> */}

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
    console.log('FamillesOptions', FamillesOptions, options.slice(0, 5))
    const [selectedList, setSelectedList] = useState(options.slice(0, 5));
    const [dynamicList, setDynamicList] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    let optionList = options
    useEffect(() => {
        setSelectedItems(optionList.slice(0, 10).map((e) => e.name));
    }, [Top20famillesSectorielles, 
        Top20produits, Top20Annonceurs,
         Top20marques,CreationParAnnonceur,
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
                if (prevSelectedItems.length >= 10) {
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
    console.log("baseGraphs", baseGraphs)
    const [isOpen, setIsOpen] = useState(false)
    return (
        <FormControl sx={{
            m: 0,
            width: "50",
            marginTop: "-5px",
            margin: "0px",
            marginRight:"0px"

        }}>
            <Select
                sx={{ height: "35px", backgroundColor: "010A41E6", color: "white" }}
                labelId="demo-multiple-checkbox-label"
                input={<OutlinedInput label={`${filters}`} />}
                value={selectedItems}
                onChange={handleChange}
                //renderValue={() => `Top ${selectedItems.length} ${filters}`}
                renderValue={() => `+`}
            >
                {options.map((elem) => (
                    <MenuItem key={options.indexOf(elem)} value={elem.name} >
                        <Checkbox checked={selectedItems.includes(elem.name)} />
                        <ListItemText primary={elem.name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

    )
}






