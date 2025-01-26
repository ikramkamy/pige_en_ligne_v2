import React from "react";
import {
  Badge,
  Button,
  Card,
  Container,
  Row,
  Col
} from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { UseLoginStore } from "store/dashboardStore/useLoginStore";

function User() {
  document.title = 'User  Profile';
const {client,email,date_debut,date_fin}=UseLoginStore((state)=>state)
  const history=useHistory()
  // const client = window.localStorage.getItem('user_name');
  // const email = window.localStorage.getItem('user_email');
  // const date_debut = window.localStorage.getItem('date_debut');
  // const date_fin = window.localStorage.getItem('date_fin');
  if (!client) {
    history.push('/login')
    }

  return (
    <>
      <Container fluid style={{ marginTop: "10%", 
        padding: "20px",display:"flex", flexDirection:"row",
      justifyContent:"center", alignItems:"center"  
        }}>
        <Row className="justify-content-center" style={{width:"50%"}}>
          <Col md="6" style={{width:"100%"}}>
            <Card className="text-center" style={{ borderRadius: "15px", 
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",  }}>
              <div className="card-image" style={{ padding: "20px",height:'150px' }}>
                <img
                  alt="User "
                  src={require("assets/user.jpg")} 
                  style={{ borderRadius: "50%", width: "100px", height: "100px", objectFit: "cover" }}
                />
              </div>
              <Card.Body>
                <h3 className="card-title">{client}</h3>
                <p className="card-text">{email}</p>
                <Badge pill variant="info" style={{ margin: "5px" }}>
                  Active
                </Badge>
                <div className="user-dates" style={{ marginTop: "20px" }}>
                  <p>Date Début: <strong>{date_debut}</strong></p>
                  <p>Date Fin: <strong>{date_fin}</strong></p>
                </div>
                <Button   
                variant="contained"
                disableElevation
                sx={{
            textTransform: "none",
            marginTop: "5px",
            marginBottom: "5px",
            backgroundColor: '#00a6e0',
            width: "100%",
            '&:hover': {
              backgroundColor: '#00a6e0',
            }
          }}
         
          >
                 <Link style={{textDecoration:"none"}} to="/home"> Découvrir</Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;