import React ,{useEffect} from "react";
import axios from 'axios';
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";


function TvTable() {
  const [data, setData] = React.useState([]);
  useEffect(()=>{
    axios.post("http://localhost/pigeonligne/getfilters2.php",
      {
      supports:[],
      familles:[],
      classes:[],
      secteurs:[],
      varieties:[],
      annonceurs:[],
      marques:[],
      produits:[],
      rang:[],
      media:"television",
      fetchdata:"fetchdata",
      date1:'2024-07-01',
      date2:'2024-07-01',
    }
    )
    .then(response => {
      console.log("response from sql data base",response);
      setData(response.data.data.splice(0,19));
    })
    .catch(error => {
      console.error(error);
    });
  
  
  },[])
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Presse </Card.Title>
                <p className="card-category">
                  
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Support</th>
                      <th className="border-0">Famille</th>
                      <th className="border-0">Classe</th>
                      <th className="border-0">Secteur</th>
                      <th className="border-0">Variété</th>
                      <th className="border-0">Annonceur</th>
                      <th className="border-0">Marque</th>
                      <th className="border-0">Produit</th>
                      <th className="border-0">Rang</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item, index) => (
                    <tr>
                      <td>1</td>
                      <td>{item.Groupe_Lib}</td>
                      <td>{item.Famille}</td>
                      <td>{item.Chaine_Lib}</td>
                      <td>{item.Diffusion_Date}</td>
                      <td>{item.Diffusion_Encomb}</td>
                      <td>{item.Diffusion_Heure}</td>
                      <td>{item.Diffusion_Rang}</td>
                      <td>{item.Produit_Lib}</td>
                      <td>{item.Prog_Apres}</td>
                      <td>{item.Prog_Avant}</td>
                      <td>{item.TelePub_Format}</td>
                      <td>{item.TelePub_Lib}</td>
                      


                      <td>Rang</td>
                    </tr>
                    ))}
                     
                   
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Table on Plain Background</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Salary</th>
                      <th className="border-0">Country</th>
                      <th className="border-0">City</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>$36,738</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Minerva Hooper</td>
                      <td>$23,789</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Sage Rodriguez</td>
                      <td>$56,142</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Philip Chaney</td>
                      <td>$38,735</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Doris Greene</td>
                      <td>$63,542</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Mason Porter</td>
                      <td>$78,615</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TvTable;
