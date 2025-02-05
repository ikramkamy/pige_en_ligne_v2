import { TrendingUp } from "lucide-react"
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts"
import { Button } from "@mui/material";
import {
  Card,
  Container,
  Row,
  Col
} from "react-bootstrap";
import UndoIcon from '@mui/icons-material/Undo';
export const Widget = ({ icon, title, value, valueLastYear }) => {
  return (<Col lg="3" sm="6">
    <Card className="card-stats" style={{ cursor: "pointer" }}>
      <Card.Body>
        <Row>
          <Col xs="5">
            <div className="icon-big text-center icon-warning">

              <img src={icon} alt="immar media" style={{ width: "50px" }} />
            </div>
          </Col>
          <Col xs="7">
            <div className="numbers">
              <p className="card-category" style={{ color: "black" }}>{title}</p>
              <Card.Title as="h4">{value}</Card.Title>
            </div>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <hr></hr>
        <div className="stats">
          <UndoIcon />
          {valueLastYear}
        </div>
      </Card.Footer>
    </Card>
  </Col>)
}






const chartData = [{ browser: "Télevision", visitors: 1260, fill: "red" }]


export const WidgetShadcn = ({value, valueLastYear}) => {
  return (
    <Card className="flex flex-col" style={{backgroundColor:"lightblue"}}>
      <ResponsiveContainer width="100%" minHeight={400} className="px-4" >
        <RadialBarChart data={chartData} endAngle={100} innerRadius={80} outerRadius={140}>
          <PolarGrid
            gridType="circle"
            radialLines={false}

            stroke="none"
            //className="first:fill-muted last:fill-background"
            fill="red"
            polarRadius={[86, 74]}
          />
          <RadialBar dataKey="visitors" fill="red" />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false} fill="green">
            <Label

              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy}
                      textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                        {chartData[0].visitors.toLocaleString()}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                        Diffusion
                      </tspan>
                    </text>
                  )
                }
              }}
              fill="red"
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ResponsiveContainer>


    </Card>
  )
}

