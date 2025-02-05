import { TrendingUp } from "lucide-react";
import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { UsePigeDashboardStore } from "store/dashboardStore/PigeDashboardStore";
import ColorCheckboxes from './BaseCheckBoxGroupe';
import './style.css';
import { BarChartIcon } from "lucide-react";
import { SelectGraphOptionsCreationParAnnonceur } from "./SelectGraphOptions";
import { UseGraphStore } from "store/GraphStore";
export const BarchartShadcn = ({ date1, date2, title, data, media }) => {
    const { formatDateToFrench } = UsePigeDashboardStore((state) => state)
    console.log('data in graph', data)
    const { CreationParAnnonceur } = UseGraphStore((state) => state)

    const chartData = data
    const average = data[0].average
    const max = Number(data[0].total)
    console.log("max", max)

    return (
        <div style={{
            backgroundColor: "white",
            borderRadius: "10px", padding: "0px"
        }} className="bar-chart-container">
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center", padding: "5px",
                borderBottom: "1px solid lightgrey",
                width: "100%"
            }}>
                <div className="p-4 " style={{
                    display: "flex",
                    justifyContent: "space-between", alignItems: "center", width: "100%"
                }}>
                    <BarChartIcon />

                    <div>La moyenne =  {Number(average).toFixed(2)}</div>
                </div>

            </div>
            <h3 className="text-xl  mb-2 px-4">{title}</h3>
            <p className="text-gray-600 mb-4 px-4">
                {formatDateToFrench(date1)} - {formatDateToFrench(date2)}</p>
            <ResponsiveContainer width="100%" minHeight={400} className="px-4" >
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
                        fill="#4B5563"
                        tickLine={false} axisLine={false} width={250}
                        tick={{
                            dx: -230, // Adjust horizontal alignment (negative value moves labels to the left)
                            textAnchor: "start", // Align text to the start (left)
                            dominantBaseline: "middle", // Center vertically
                        }}
                    />
                    <XAxis type="number"

                        domain={[0, max]}
                        hide
                    />
                    {/* <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            /> */}

                    <Bar dataKey="total"

                        fill="#2563ea"
                        radius={[4, 4, 4, 4]} >
                        <LabelList dataKey="total"
                            position="right"
                            fill="hsl(var(--foreground))"
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
            <div className="mt-4 text-sm px-4 mb-4">
                <div className="flex gap-2 font-medium">
                    <ColorCheckboxes />

                </div>
                {/* <div className="text-gray-600">Showing total visitors for the last 6 months</div> */}
            </div>
        </div>
    );
};


// ✅ Custom Card Components
const Card = ({ children, className }) => (
    <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>{children}</div>
)

const CardHeader = ({ title, description }) => (
    <div className="border-b pb-2 mb-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
    </div>
)

const CardContent = ({ children }) => <div className="pb-3">{children}</div>

const CardFooter = ({ children }) => <div className="pt-2 border-t text-sm">{children}</div>

// ✅ Custom Chart Components
const ChartContainer = ({ children }) => (
    <div className="w-full h-[300px] flex justify-center">{children}</div>
)

const ChartTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
        return (
            <div className="bg-white p-2 shadow-md rounded border text-sm">
                <p className="font-semibold">{payload[0].payload.name}</p>
                <p>Total: {payload[0].value.toLocaleString()}</p>
            </div>
        )
    }
    return null
}

export function BarChartComponent({ title, date1, date2, media }) {
    const chartData = data.map(e => ({
        name: e.Famille_Lib,
        total: e.total,
    }))

    const maxValue = Math.max(...data.map(e => e.total), 0) + 100 // Adjust for max values

    return (
        <Card>
            <CardHeader title={title} description={`${date1} - ${date2}`} />
            <CardContent>
                <ChartContainer>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData} layout="vertical">
                            <XAxis type="number" domain={[0, maxValue]} tickFormatter={(value) => value.toLocaleString()} />
                            <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={150} />
                            <Bar dataKey="total" fill="#010a41" radius={[0, 4, 4, 0]}>
                                <LabelList dataKey="total" position="right" fill="white" fontSize={12} />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex items-center gap-2 font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <p className="text-gray-500">Showing total values for the selected period</p>
            </CardFooter>
        </Card>
    )
}






