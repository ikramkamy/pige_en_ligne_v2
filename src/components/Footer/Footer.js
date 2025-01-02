import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
function Footer () {
  
    return (
      <footer  className="" style={{backgroundColor:"transparent", width:'100%',
       display:"flex",
       justifyContent:'center',
       alignItems:"center",
       backgroundColor: "rgba(255, 255, 255, 0.3)",
       fontSize:"15px",
       paddingTop:"1%",
       paddingBottom:"1%",
       position:"fixed",
       bottom:"0px"

      }} >
    
          <nav style={{backgroundColor:"transparent", width:'90%',
           display:"flex",
          justifyContent:'space-between',
           alignItems:"center"}}>

            <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
       <div className="links">  
       <Link to="/admin/user"  
       style={{color:"white", 
        textDecoration:"none",
         marginRight:"15px"
        }}>profile</Link>             
            
              <Link to="/admin/privacy" style={{color:"white", textDecoration:"none",
                marginRight:"5px"
              }}>politique de confidentialité</Link>             
            
                <Link to="/admin/termes" style={{color:"white", textDecoration:"none", marginRight:"5px"}}>CGV</Link>   
                </div> 
            <div className="year" style={{width:"fitContent"}}>
            <Link style={{color:"white", textDecoration:"none",}} >© {new Date().getFullYear()}{" "}IMMAR</Link> 
            </div>



            </div>

        
          
             
    
          </nav>
        
      </footer>
    );
  }


export default Footer;
