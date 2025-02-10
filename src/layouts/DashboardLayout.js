
import React, { Component } from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import routes from "routes.js";
import sidebarImage from "assets/img/sidebar-3.jpg";
import {Row, Col ,Container} from 'react-bootstrap';
import bgimage from 'assets/bg.jpg';
import { UseLoginStore } from "store/dashboardStore/useLoginStore";

function DashboardLayout() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const [padding, setPadding] = React.useState('40px'); 
  const {usePrevilegesFamilles}=UseLoginStore((state)=>state)
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/media") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);

  React.useEffect(() => {
    const handleResize = () => {
      setPadding(window.innerWidth < 768 ? '0px' : '40px'); 
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    
   
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


//   React.useEffect(() => {
// //this is to ensure a login after each page reloaging
//   if (usePrevilegesFamilles.length===0) { 
//     localStorage.clear(); 
//     localStorage.setItem('hasReloaded', 'true');
//   } else {
//       //do nothing 
//   }
// }, []);

  return (
    <div style={{
      
      // backgroundImage: `url(${bgimage})`,
      backgroundColor: `#020b42`,
      overflowX: "hidden",
      display: 'flex',
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "column",
      width: "100%",
      height: "auto",
      minHeight:"100vh"
    }}>
      <div ref={mainPanel} style={{
        width: "100%",
        display: 'flex',
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
        height:"100%",
      }}>
        <AdminNavbar />
        <Container fluid>
          <Row className="h-auto justify-content-center">
            <Col style={{ height: "100%", padding:padding}}>
              <div className="content h-auto">
                <Switch>{getRoutes(routes)}</Switch>
              </div>
            </Col>
          </Row>
        </Container>
        <FixedPlugin
          hasImage={hasImage}
          setHasImage={() => setHasImage(!hasImage)}
          color={color}
          setColor={(color) => setColor(color)}
          image={image}
          setImage={(image) => setImage(image)}
          routes={routes}
        />
      </div>
      <Footer />
    </div>
    

  );
}

export default   DashboardLayout;
