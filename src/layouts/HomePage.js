
import React, { Component } from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import Footer from "components/Footer/Footer";
import routes from "routes.js";
import sidebarImage from "assets/img/sidebar-3.jpg";
import bgimage from 'assets/bg.jpg';
import { UseLoginStore } from "store/dashboardStore/useLoginStore";
function HomeLayout() {
  const [image, setImage] = React.useState(sidebarImage);
  const {usePrevilegesFamilles}=UseLoginStore((state)=>state)
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/login") {
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
    //this is to ensure a login after each page reloaging
      if (usePrevilegesFamilles.length===0) { 
        localStorage.clear(); 
        localStorage.setItem('hasReloaded', 'true');
      } else {
          //do nothing 
      }
    }, []); 
  return (
    <>
    <div className="wrapper" 
     style={{
      backgroundImage: `url(${bgimage})`,
      //backgroundSize: 'cover',
      // backgroundPosition: 'center',
      minHeight: '100vh',
      display:"flex",
      justifyContent:"center", 
      alignItems:"center",
    }}>
        {/* <Sidebar color={color} image={hasImage ? image : ""} routes={routes} /> */}
      
        <div className="" ref={mainPanel} style={{ width: 'auto'}}>
          
          <div className="content" style={{ width: '100vw', padding: 0 }}>
            <Switch>{getRoutes(routes)}</Switch>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
     
    </>
  );
}

export default HomeLayout;
