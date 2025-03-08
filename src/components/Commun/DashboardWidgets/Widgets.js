import { TrendingUp } from "lucide-react";
import CountUp from "react-countup";
import { UseFiltersStore } from "store/dashboardStore/FiltersStore";
import { UsePigeDashboardStore } from "store/dashboardStore/PigeDashboardStore";
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

export const Widget = ({ icon, title, value, valueLastYear, valuepic,unite,exactvalue}) => {
  const {date3,date4,date1,date2}=UseFiltersStore((state)=>state);
  const {formatDateToFrench}=UsePigeDashboardStore((state)=>state)
    function isDateInRange(date1, startDate, endDate) {
      // Helper function to parse a date string (YYYY-MM-DD) into a Date object
      const parseDate = (dateStr) => {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day); // Month is 0-indexed in JavaScript
      };
    
      // Parse all dates
      const d1 = parseDate(date1);
      const start = parseDate(startDate);
      const end = parseDate(endDate);
    
      // Check if date1 is within the range [startDate, endDate]
      return d1 >= start && d1 <= end;
    }
    const isdate1inRamdan=isDateInRange(date1,"2025-03-01","2025-03-31")
  const isdate2inRamdan=isDateInRange(date2,"2025-03-01","2025-03-31")
  if (title== "Budget Brut" && (isdate1inRamdan || isdate2inRamdan)){
    return (
      <Col lg="4" sm="6">
          <Card className="card-stats" style={{
            cursor: "pointer",
            backgroundColor: "#010A41E6", 
          
            color: "white",
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
                  <div className="numbers" >
    
                    <Card.Title as="h3" style={{
                      color: "white",
                      fontSize: "14px", fontWeight: "400",      
                    }}>Données indisponibles
                    
                    </Card.Title>
                    
                    {/* <CountUp
                    style={{
                      color: "white",
                      fontSize: "35px", fontWeight: "400", 
                    }}
                      start={0}
                      prefix=""
                      suffix={unite}
                      separator=""
                      end={0}
                      decimals={0}
                      duration={4}
    
                    /> */}
                    {/* <p style={{color:"#4c5479"}}>{exactvalue}</p> */}
                    <p className="text-grey-200 text-sm">{valuepic}</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer  >
              <hr></hr>
    
              <div className="stats" style={{ display: "flex", justifyContent: "space-between",
                 alignItems:"center"
               }}>
                <div style={{
                  color: "#FFFFFF4D",
                  fontSize: "13px",
                  
                  display:"flex",
                  alignItems:"center"
                }}>
                  {/* <UndoIcon /> */}
               < p style={{fontSize:"12px",margin:"0px"}}>{formatDateToFrench(date3)}- {formatDateToFrench(date4)}: 
               <span style={{fontWeight:"bold",color:"white"}}> : {valueLastYear}</span></p>
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
  return (
  <Col lg="4" sm="6">
      <Card className="card-stats" style={{
        cursor: "pointer",
        backgroundColor: "#010A41E6", 
      
        color: "white",
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
              <div className="numbers" >

                {/* <Card.Title as="h3" style={{
                  color: "white",
                  fontSize: "35px", fontWeight: "400",      
                }}>{value}</Card.Title> */}
                
                <CountUp
                style={{
                  color: "white",
                  fontSize: "35px", fontWeight: "400", 
                }}
                  start={0}
                  prefix=""
                  suffix={unite}
                  separator=""
                  end={typeof(value)=='string' ? Number(value?.split(" ")[0]) : value}
                  decimals={0}
                  duration={4}

                />
                <p style={{color:"#4c5479"}}>{exactvalue}</p>
                <p className="text-grey-200 text-sm">{valuepic}</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer  >
          <hr></hr>

          <div className="stats" style={{ display: "flex", justifyContent: "space-between",
             alignItems:"center"
           }}>
            <div style={{
              color: "#FFFFFF4D",
              fontSize: "13px",
              
              display:"flex",
              alignItems:"center"
            }}>
              {/* <UndoIcon /> */}
           < p style={{fontSize:"12px",margin:"0px"}}>{formatDateToFrench(date3)}- {formatDateToFrench(date4)}: 
           <span style={{fontWeight:"bold",color:"white"}}> : {valueLastYear}</span></p>
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

