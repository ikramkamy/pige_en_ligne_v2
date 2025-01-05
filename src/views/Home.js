import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import back from 'assets/back.jpg'
import MediaReviewCard from 'components/Commun/HomeCard2';
import "../components/Commun/commun.css"
import {ChartBarIcon,SpeakerphoneIcon, SearchCircleIcon } from '@heroicons/react/outline';
import {Container,Row} from "react-bootstrap";
import { UseLoginStore } from "store/dashboardStore/useLoginStore";
function Home() {
  document.title='Accueil'
  const history=useHistory();
  const {client,email}=UseLoginStore((state)=>state)
  console.log("email",email,"client",client)

const HomeCardinfo=[{
  icon:<SearchCircleIcon width="25px" style={{marginRight:"10px"}}/>,
  image:back,
  //image:"https://cdn.gencraft.com/prod/user/ca9b8757-6180-4cca-89a1-b1b4d251f340/45cd1f2e-8087-46f6-9f4b-faca65ed9740/image/image1_0.jpg?Expires=1734796930&Signature=gv8gLAfIs9zXEiSLTTR1FE9uKi14OahF0Lwwqq3ps6PppUELriWh1jrIkFyhkI13pCHbmTGnKPEV6UAZKrDK~97VZGIFbdGzJEHIuH5P1v9RJ9ntwbUAipmQ6D~zKdlXE6PXLukTMCpUNJZgDMsqOfsHE9ubvqFVCG~ihHrm1T7xko7CzAYAXW~e7EOIQLir07CX9NIiBlWdAjgOTNDPnPz78Odoc1AezjWHbggIKfPS5xGH4gJbywvMrLHGrC-hZbdRpFvjtQZJ7BTSGAT7jAFnzGYELdCxlavx-QVgwTCXJDSrOa~pNkgn6T4r41lqk30aOuUoSCKrgvpDRP0h2g__&Key-Pair-Id=K3RDDB1TZ8BHT8",
  title:"Pige en ligne",
  description:"Notre outil de pige des créations publicitaires vous permet de suivre en temps réel les campagnes diffusées à la radio, à la télévision et dans la presse écrite.",
  url:'/pige/pige_en_ligne'
},
{
  icon:<SpeakerphoneIcon width="25px" style={{marginRight:"10px"}}/>,
  image:"https://cdn.pixabay.com/photo/2023/07/23/16/39/ai-generated-8145415_960_720.jpg",
  title:"Veille des créations publicitaires",
  description:"Suivez les dernières publicités diffusées à la radio, à la télévision et dans la presse pour rester informé des tendances du marché.",
  url:"/veille/veille_creations_publicitaires"
},
{
  icon:<ChartBarIcon width="25px" style={{marginRight:"10px"}}/>,
 // image:"https://cdn.pixabay.com/photo/2021/10/11/17/36/technology-6701404_1280.jpg",
  image:"https://cdn.pixabay.com/photo/2024/04/05/05/16/businesswoman-8676522_1280.jpg",
  title:"Tableau de bord",
  description:"Visualisez et analysez vos performances publicitaires en temps réel avec notre tableau de bord intuitif.",
  url:"/media/tableau_de_bord"
}]

React.useEffect(() => {
  if (!client) {
    history.push('/login')
    }else{
      //do nothing
    }

},[client])

  return (
<Container fluid style={{ display: "flex", 
  justifyContent: "center", alignItems: "center", height: "auto",
 height:'100%', paddingTop:"5%"}}>
            <Row 
              className="responsive-row " style={{ 
              justifyContent: "center",
              alignItems: "center", 
              height: "100%",
              marginTop:"50px",
              marginBottom:"12%",
              }}             
              >
                {/* {HomeCardinfo.map((e, index) => (
                    <ImgMediaCard key={index} image={e.image} 
                    title={e.title} url={e.url} />
                ))} */}
                {HomeCardinfo.map((e,index)=>(
                <MediaReviewCard key={index} image={e.image} Description={e.description}
                  title={e.title} url={e.url} icon={e.icon}/>
                ))}
            </Row>
</Container>


  );
}

export default Home;
