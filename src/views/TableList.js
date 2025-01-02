import React ,{useEffect} from "react";
import axios from 'axios';
import MultipleSelectFamilles from "../components/Commun/MultiSelect";
import MultipleSelectClasses from "../components/Commun/SelectClasses";
import MultipleSelectSecteurs from "../components/Commun/SelectSecteurs";
import MultipleSelectProducts from '../components/Commun/SelectProduits';
import MultipleSelectSupports from '../components/Commun/SupportSelect';
import MultipleSelectVarieties from '../components/Commun/VarieteSelect';
import MultipleSelectAnnoneurs from '../components/Commun/SelectAnnonceurs';
import MultipleSelectMarques from '../components/Commun/SelectMarques';
import ButtonFilters from '../components/Commun/ButtonFilters';
import ResponsiveDateRangePickers from '../components/Commun/DatePicker';
import MultipleSelectMedia from '../components/Commun/MediaSelect';
// react-bootstrap components
import {Card,Table,Container,Row,Col,} from "react-bootstrap";


function TableList() {
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
      media:"presse",
      fetchdata:"fetchdata",
      date1:'2024-07-01',
      date2:'2024-07-01',
    }
    )
    .then(response => {
      console.log("response from sql data base",response);
       setData(response.data.data.splice(0, 10));
    })
    .catch(error => {
      console.error(error);
    });
  
  
  },[])

const getData=()=>{
  console.log('we are getting data')
  alert('hi')
    // axios.post("http://localhost/pigeonligne/getfilters2.php",
    //   {
    //   supports:[],
    //   familles:[],
    //   classes:[],
    //   secteurs:[],
    //   varieties:[],
    //   annonceurs:[],
    //   marques:[],
    //   produits:[],
    //   rang:[],
    //   media:"presse",
    //   fetchdata:"fetchdata",
    //   date1:'2024-07-01',
    //   date2:'2024-07-01',
    // }
    // )
    // .then(response => {
    //   console.log("response from sql data base",response);
    //   //setData(response.data.data.splice(0, 20));
    // })
    // .catch(error => {
    //   console.error(error);
    // });
  
}



  return (
    <>
      <Container fluid>
       <Row>
      <Col md="12">
       <MultipleSelectMedia/>
       <ResponsiveDateRangePickers/>
      
            <Card className="strpied-tabled-with-hover py-2 my-5">
              <Card.Header>
                <Card.Title as="h4">Presse </Card.Title>
  
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0 ">
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
                    <tr key={item.Insertion_Id}>
                      <td>{data.indexOf(item)+1}</td>
                      <td>{item.Groupe_Lib}</td>
                      <td>{item.Famille}</td>
                      <td>{item.Titre_Lib}</td>
                      <td>{item.Categorie_lib}</td>
                      <td>{item.Variete_lib}</td>
                      <td>{item.Annonceur_Nom}</td>
                      <td>{item.Marque_Li}</td>
                      <td>{item.Produit_Lib}</td>
                      <td>{item.Variete_lib}</td>
                      <td>Rang</td>
                    </tr>
                    ))}
                     
                   
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

export default TableList;
