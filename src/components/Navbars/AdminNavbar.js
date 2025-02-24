import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom";
import logoImmar from "assets/logo.png";
import { UseLoginStore } from "store/dashboardStore/useLoginStore";
import {
  LogoutIcon, ChartBarIcon,
  SpeakerphoneIcon,
  SearchCircleIcon, HomeIcon
} from '@heroicons/react/outline';
import './navbar.css';
import Navback from 'assets/navbar.png';
import { FaBullhorn, FaSearch, FaSignOutAlt, FaTachometerAlt, FaHome, FaLock } from 'react-icons/fa';
function Header() {
  const TokenParam = window.localStorage.getItem('token')
  const { LougoutRestErrorMessages,
    email,
    autorisePigePresse,
    autoriseVeillePresse,
    autorisePigeRadio,
    autoriseVeilleRadio,
    autorisePigeTv,
    autoriseVeilleTv,
    autoriseDash,

  } = UseLoginStore((state) => state)

  const handelLogout = () => {
    LougoutRestErrorMessages && LougoutRestErrorMessages(email)
  }
  const handelAlert = () => {
    alert("Ce service n'est pas inclus dans votre abonnement. Veuillez contacter votre chargé de compte pour demander un accès")
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
        borderBottom: "3px solid #00a2db",
        paddingTop:"0.5rem",
        paddingBottom:"0.8rem",
    
      }}>
      <div style={{
        width: "100%", 
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center", 
        paddingRight: '0.75rem',
        paddingLeft: '0.75rem',    
      }}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",   
        }} >
          {/* <Link to="https://adtrics.immar.dz/#/home"> */}
          <a href="https://adtrics.immar.dz/#/home">
            <img src={logoImmar} alt="immar media" className="logo-immar" />
          </a>
          {/* </Link> */}
        </div>
        <div style={{
          display: "flex",
          display: "flex", 
          justifyContent: "flex-end",
           alignItems: "center",
    
        }}>

          <span className="no-icon" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            // height: "80px",
            color: "white",
            // paddingLeft: "0.75rem",
            paddingRight: "0.75rem",

          }}>
            <a href="https://adtrics.immar.dz/#/home" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <FaHome className="icon_nav" style={{
                // width: "35px",
                fontSize: "28px",
                color: "white",
                // "&:hover": {
                //   color: "#1DC7EA", 
                // },

              }} />
            </a>
            {/* </Link> */}
            {/* <span style={{ textTransform: "", fontSize: "10px" }}>Accueil</span> */}
          </span>

          {(autorisePigePresse || autorisePigeRadio || autorisePigeTv) && (<span className="no-icon" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "80px",
            color: "white",
            // paddingLeft: "0.75rem",
            paddingRight: "0.75rem",
          }}>
            <a href="https://adtrics.immar.dz/#/advertising" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <FaSearch className="icon_nav" style={{
                // width: "35px",
               fontSize:"28px",
                color: "white",
               
                // "&:hover": {
                //   color: "#1DC7EA", 
                // },

              }} />
            </a>
            {/* </Link> */}
            {/* <span style={{ textTransform: "", fontSize: "10px" }}>pige</span> */}
          </span>)}

          {(!autorisePigePresse && !autorisePigeRadio && !autorisePigeTv) && (<span className="no-icon" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "80px",
            color: "white",
            // paddingLeft: "0.75rem",
            paddingRight: "0.75rem",
        
          }}
            onClick={handelAlert}
          >
            <FaSearch className="icon_nav" style={{
             fontSize:"28px",
              color: "white",
          
             

            }} />


            {/* <span style={{ textTransform: "", fontSize: "10px" }}>pige</span> */}
          </span>)}
          {(autoriseVeillePresse || autoriseVeilleRadio || autoriseVeilleTv) && (<span className="no-icon " style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "80px",
            // paddingLeft: "0.75rem",
            paddingRight: "0.75rem",
          }}>
            <a href="https://adtrics.immar.dz/#/monitoring" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <FaBullhorn className="icon_nav"
                style={{ color: "white",fontSize:"28px" }}
              />
            </a>
            {/* <span style={{ textTransform: "", fontSize: "10px" }}>veille</span> */}
          </span>)}
          {(!autoriseVeillePresse && !autoriseVeilleRadio && !autoriseVeilleTv) && (<span className="no-icon " style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "80px",
            // paddingLeft: "0.75rem",
            paddingRight: "0.75rem",
          }}
            onClick={handelAlert}
          >

            <FaBullhorn className="icon_nav"
              style={{ color: "white",fontSize:"28px" }}
            />

            {/* <span style={{ textTransform: "", fontSize: "10px" }}>veille</span> */}
          </span>)}
          {autoriseDash && (<span className="no-icon" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "80px",
            // paddingLeft: "0.75rem",
            paddingRight: "0.75rem",

          }} >
            <a href={`https://adtrics.immar.dz/dashboard/#/media/tableau_de_bord/${TokenParam}`} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <FaTachometerAlt
                className="icon_nav"
                style={{ color: "white",fontSize:"28px" }}
              />
            </a>
            {/* <span style={{ textTransform: "lowercase", fontSize: "10px" }}>stats</span> */}
          </span>)}

          {!autoriseDash && (<span className="no-icon" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "80px",
            // paddingLeft: "0.75rem",
            paddingRight: "0.75rem",

          }}
            onClick={handelAlert}
          >
            <FaTachometerAlt
              className="icon_nav"
              style={{ color: "white",fontSize:"28px" }}
            />

            {/* <span style={{ textTransform: "lowercase", fontSize: "10px" }}>stats</span> */}
          </span>)}


          <span className="no-icon" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "80px",
            paddingLeft: "0.75rem",
            //paddingRight: "0.75rem",
           
          }}>
            <a href={`https://adtrics.immar.dz/#/login`} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <FaSignOutAlt onClick={handelLogout}
                className="icon_nav"
                style={{ color: "white",fontSize:"28px",

                 }}
              />
            </a>
            {/* <span style={{ textTransform: "", fontSize: "10px" }}>déconnexion</span> */}
          </span>


        </div>
      </div>

    </div>
  );
}

export default Header;
