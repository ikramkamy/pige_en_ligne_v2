import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom";

import logoImmar from "assets/logo transparent adtrics.png";
import { UseLoginStore } from "store/dashboardStore/useLoginStore";
import powerbi from "assets/img/icons/PowerBI.webp"
import { LogoutIcon, ChartBarIcon, SpeakerphoneIcon, SearchCircleIcon, HomeIcon } from '@heroicons/react/outline';
import './navbar.css';
import Navback from 'assets/navbar.png';
import { FaBullhorn, FaSearch, FaSignOutAlt, FaTachometerAlt, FaHome } from 'react-icons/fa';
function Header() {
  const TokenParam = window.localStorage.getItem('token')
  const { LougoutRestErrorMessages, email } = UseLoginStore((state) => state)

  // const mobileSidebarToggle = (e) => {
  //   e.preventDefault();
  //   document.documentElement.classList.toggle("nav-open");
  //   // var node = document.createElement("div");
  //   // node.id = "bodyClick";
  //   // node.onclick = function () {
  //   //   this.parentElement.removeChild(this);
  //   //   document.documentElement.classList.toggle("nav-open");
  //   // };
  //   document.body.appendChild(node);
  // };

  // const getBrandText = () => {
  //   for (let i = 0; i < routes.length; i++) {
  //     if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
  //       return routes[i].name;
  //     }
  //   }
  //   return "Brand";
  // };

  //  const handelClick=()=>{
  //    console.log("userIdentifications",userIdentifications)
  //     setTestvalue && setTestvalue(15)
  //     //Loginuser && Loginuser()
  //     setLoginInputs && setLoginInputs(userIdentifications)
  //   }
  // const history=useHistory()

  const handelLogout = () => {
    LougoutRestErrorMessages && LougoutRestErrorMessages(email)
  }


  return (
    <div
      className="navbar_back"
      style={{
        display: "flex", width: "100%",
        justifyContent: "center", alignItems: "center",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: "fixed",
        top: '0px',
        zIndex: "10",
        //backgroundColor:"#e5f9ff",
        borderBottom: "3px solid #00a2db"

      }}>
      <div style={{
        width: "90%", display: "flex",
        justifyContent: "space-between",
        alignItems: "center", paddingTop: '0px',
    
      }}>

        <div style={{
          paddingTop: "0px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignContent: "center"
        }} >
          {/* <Link to="https://adtrics.immar.dz/#/home"> */}
          <a href="https://adtrics.immar.dz/#/home">
            <img src={logoImmar} alt="immar media" className="logo-immar" />
          </a>
          {/* </Link> */}
        </div>
        <div style={{
          display: "flex", width: "100%",
          display: "flex", justifyContent: "flex-end", alignItems: "center",
          
        }}>
          <span className="no-icon" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "80px",
            color: "white",
          
          }}>
            <a href="https://adtrics.immar.dz/#/home" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <FaHome className="icon_nav" style={{
                // width: "35px",
                fontSize: "30px",
                color: "white",
                // "&:hover": {
                //   color: "#1DC7EA", 
                // },

              }} />
            </a>
            {/* </Link> */}
            <span style={{ textTransform: "", fontSize: "10px" }}>Accueil</span>
          </span>


          <span className="no-icon" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "80px",
            color: "white"
          }}>
            <a href="https://adtrics.immar.dz/#/advertising" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <FaSearch className="icon_nav" style={{
                // width: "35px",
                fontSize: "30px",
                color: "white",
                // "&:hover": {
                //   color: "#1DC7EA", 
                // },

              }} />
            </a>
            {/* </Link> */}
            <span style={{ textTransform: "", fontSize: "10px" }}>pige</span>
          </span>


          <span className="no-icon " style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "80px",

          }}>
            {/* <Link
              to="/veille/veille_creations_publicitaires"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            > */}
            <a href="https://adtrics.immar.dz/#/monitoring" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <FaBullhorn className="icon_nav"
                style={{ color: "white", fontSize: "30px", }}
              /></a>


            {/* </Link> */}
            <span style={{ textTransform: "", fontSize: "10px" }}>veille</span>
          </span>



          <span className="no-icon" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "80px",

          }} >
            {/* <Link to="/media/tableau_de_bord" 
            style={{ display: "flex", flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center" 
            }}> */}
            <a href={`https://adtrics.immar.dz/#/dashboard/#/media/tableau_de_bord/${TokenParam}`} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <FaTachometerAlt
                className="icon_nav"
                style={{ color: "white", fontSize: "30px", }}
              />
            </a>

            {/* </Link> */}
            <span style={{ textTransform: "lowercase", fontSize: "10px" }}>stats</span>
          </span>

          {/* <span className="no-icon" style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "80px",
         
        }} >
          <Link to="/media/tableau_de_bord_powerbi" 
          style={{ display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center" }}>
            <img src={powerbi} className="" alt="powerbi" width="30px"/>
          </Link>
          <p style={{ textTransform: "lowercase", fontSize: "10px" }}>dashboard</p>
        </span> */}

          <span className="no-icon" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "80px",
          }}>
            {/* <Link to="/login"
              style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center"
              }}> */}
            <a href={`https://adtrics.immar.dz/#/dashboard/media/tableau_de_bord/${TokenParam}`} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <FaSignOutAlt onClick={handelLogout}
                className="icon_nav"
                style={{ color: "white", fontSize: "30px", }}
              />
            </a>

            {/* </Link> */}
            <span style={{ textTransform: "", fontSize: "10px" }}>déconnexion</span>
          </span>


        </div>
      </div>

    </div>
  );
}

export default Header;
