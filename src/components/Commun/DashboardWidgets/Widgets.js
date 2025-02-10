import { TrendingUp } from "lucide-react"
import {
  Label, PolarGrid, PolarRadiusAxis,
  RadialBar, RadialBarChart, ResponsiveContainer
} from "recharts"
import { Button } from "@mui/material";
import {
  Card,
  Container,
  Row,
  Col
} from "react-bootstrap";
import UndoIcon from '@mui/icons-material/Undo';
export const Widget = ({ icon, title, value, valueLastYear, valuepic }) => {
  return (
    <Col lg="4" sm="6">
      <Card className="card-stats" style={{
        cursor: "pointer",
        backgroundColor: "#010A41E6", color: "white",
        border: "1px solid lightgrey"
      }}>
        <Card.Body>
          <Row>
            <Col xs="5">
              <div className="icon-big text-center icon-warning">

                <img src={icon} alt="immar media" style={{ width: "50px" }} />
              </div>
            </Col>
            <Col xs="7">
              <div className="numbers">

                <Card.Title as="h3" style={{
                  color: "white",
                  fontSize: "40px", fontWeight: "400",



                }}>{value}</Card.Title>

                <p className="text-grey-200 text-sm">{valuepic}</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer  >
          <hr></hr>

          <div className="stats" style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{
              color: "white",
              fontSize: "18px"
            }}>
              {/* <UndoIcon /> */}
              VS {new Date().getFullYear() - 1} : {valueLastYear}
            </div>
            <p className="card-category"
              style={{
                color: "white",
                fontSize: "18px"
              }}>{title}</p>
          </div>
        </Card.Footer>
      </Card>
    </Col>)
}









export const WidgetShadcn = ({ value, valueLastYear }) => {
  const chartData = [{ browser: "Télevision", visitors: value, fill: "red" }]
  return (
    <Card className="flex flex-col" style={{ backgroundColor: "lightblue" }}>
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
                        {chartData[0].visitors?.toLocaleString()}
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

