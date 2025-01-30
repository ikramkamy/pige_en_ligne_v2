import { Button } from "@mui/material";
import {
    Card,
    Container,
    Row,
    Col
  } from "react-bootstrap";
  import UndoIcon from '@mui/icons-material/Undo';
 export  const Widget=({icon,title,value,valueLastYear})=>{
    return ( <Col lg="3" sm="6">
        <Card className="card-stats">
          <Card.Body>
            <Row>
              <Col xs="5">
                <div className="icon-big text-center icon-warning">

                  <img src={icon} alt="immar media" style={{width:"50px"}}/>
                </div>
              </Col>
              <Col xs="7">
                <div className="numbers">
                  <p className="card-category" style={{color:"black"}}>{title}</p>
                  <Card.Title as="h4">{value}</Card.Title>
                </div>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <hr></hr>
            <div className="stats">
              <UndoIcon/>
              {valueLastYear}
            </div>
          </Card.Footer>
        </Card>
      </Col>)
 }