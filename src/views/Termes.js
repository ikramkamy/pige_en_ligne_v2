import React, { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import {
  Container,
  Row} from "react-bootstrap";
import { UseLoginStore } from "store/dashboardStore/useLoginStore";
function CGV() {
  const { client, email,LougoutRestErrorMessages } = UseLoginStore((state) => state)
  const history = useHistory()

  useEffect(()=>{
    if (!client) {
      history.push('/login')
      LougoutRestErrorMessages && LougoutRestErrorMessages(email)
    }
  },[client])
 
  return (
    <>
      <Container fluid style={{ marginTop: '10%', }}>
        <Row className="justify-content-center ">
          <Container
            fluid
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
              //backgroundColor: "#f8f9fa",
              backgroundColor: "transparent",
              textAlign: "center",
            }}
          >
            <Row
              className="responsive-row"
              style={{
                padding: "20px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <b style={{ color: "#00a6e0" }}>
                Conditions générales de vente



              </b>

            </Row>
          </Container>
        </Row>
      </Container>
    </>
  );
}

export default CGV;
