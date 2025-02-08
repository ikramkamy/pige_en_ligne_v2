import { TrendingUp } from "lucide-react";
import React, { useState, useEffect } from 'react';
import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { UsePigeDashboardStore } from "store/dashboardStore/PigeDashboardStore";
import ColorCheckboxes from './BaseCheckBoxGroupe';
import './style.css';
import { BarChartIcon } from "lucide-react";
import { UseGraphStore } from "store/GraphStore";
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import { UseFiltersStore } from 'store/dashboardStore/FiltersStore';
import html2canvas from "html2canvas";
export const BarchartShadcn = ({
    date1,
    date2,
    title,
    data,
    media,
    options,
    UpdatedGraphDisplay,
    SetOptionFunction,
    filters,
    ChangeBaseFunction,
    parametre }) => {
    const { formatDateToFrench } = UsePigeDashboardStore((state) => state)

    console.log('data in graph', data)
    const { CreationParAnnonceur, FamillesOptions, graphColor } = UseGraphStore((state) => state)

    const [chartData, setChartData] = useState(data);
    const [average, setAverage] = useState(data[0]?.average || 0);
    const max = data.length > 0 ? Number(data[0]?.total) : 0;
    console.log("max", max, chartData, data)
    const colorMap = {
        volume: "#43a047", // Green
        budget: "#2196f3", // Blue
        duree: "#d81b60",  // Red
    };

    const GraphColor = colorMap[graphColor] || "#2196f3";
    useEffect(() => {
        console.log("changing graph", data)
        const updatedData = calculateChartData(data, options);

        setChartData(data);
        setAverage(updatedData[0]?.average || 0);
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
    return (
        <div style={{
            backgroundColor: "transparent",
            color: "white",
            borderRadius: "10px", padding: "15px",
            border: "1px solid white"
        }} className="bar-chart-container">
            {/* <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center", padding: "5px",
                borderBottom: "1px solid lightgrey",
                width: "100%",
                color: "white"
            }}>
                <div className="p-4 " style={{
                    display: "flex",
                    justifyContent: "space-between", alignItems: "center", width: "100%"
                }}>
                    <BarChartIcon />
                </div>
            </div> */}

            <div style={{
                width: "100%", display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                paddingTop: "5px"
            }}>
                <div>{title}</div>
                <div className="">
                    <div>La moyenne ={Number(average).toFixed(2)}</div>
                    <MultiselectForGraph
                        options={options}
                        UpdatedGraphDisplay={UpdatedGraphDisplay}
                        media={media}
                        SetOptionFunction={SetOptionFunction}
                        filters={filters}
                    />
                </div>
            </div>

            <ResponsiveContainer width="100%" minHeight={300}
                className="px-4 .bar-chart-container" >
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

                        fill={GraphColor}

                        radius={[10, 10, 10, 10]} >
                        <LabelList dataKey="total"
                            position="right"
                            fill="white"
                            fontSize={12}
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

            <div className=""
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                <ColorCheckboxes ChangeBaseFunction={ChangeBaseFunction} parametre={parametre} />
                <BarChartIcon onClick={handleDownloadChart} style={{ cursor: "pointer" }} />
            </div>
            {/* <div className="text-gray-600">Showing total visitors for the last 6 months</div> */}

        </div>
    );
};


const MultiselectForGraph = ({ options, UpdatedGraphDisplay, media, SetOptionFunction, filters }) => {
    const { FamillesOptions, graphColor } = UseGraphStore((state) => state)
    const { Top20famillesSectorielles } = UsePigeDashboardStore((state) => state)
    console.log('FamillesOptions', FamillesOptions, options.slice(0, 5))
    const [selectedList, setSelectedList] = useState(options.slice(0, 5));
    const [dynamicList, setDynamicList] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    let optionList = options
    useEffect(() => {
        setSelectedItems(optionList.slice(0, 10).map((e) => e.name));
    }, [Top20famillesSectorielles]);

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
    console.log("selectedItems", selectedItems)
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

    const [isOpen, setIsOpen] = useState(false)
    return (
        <FormControl sx={{
            m: 1,
            width: "55%",
            marginTop: "0px",
            margin: "0px",
            color: "white"
        }}>
            <Select
                sx={{ height: "35px", color: "white" }}
                labelId="demo-multiple-checkbox-label"
                input={<OutlinedInput label={`${filters}`} />}
                // open={isOpen}
                // onOpen={() => setIsOpen(true)} 
                // onClose={() => setIsOpen(false)}
                value={selectedItems}
                onChange={handleChange}
                renderValue={() => `Top ${selectedItems.length} ${filters}`}

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






