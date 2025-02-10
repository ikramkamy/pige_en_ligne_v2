import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom";
import logoImmar from "assets/logo (2).png";
import { UseLoginStore } from "store/dashboardStore/useLoginStore";
import powerbi from "assets/img/icons/PowerBI.webp"
import { LogoutIcon, ChartBarIcon, SpeakerphoneIcon, SearchCircleIcon } from '@heroicons/react/outline';
import './navbar.css';
import Navback from 'assets/navbar.png'
function Header() {
  const user_name = window.localStorage.getItem("user_name")
  const location = useLocation();
  const { Loginuser, errormessage, showAlert2, showAlert1,
    email, client, test, setTestvalue, setLoginInputs,
    userIdentifications, LougoutRestErrorMessages } = UseLoginStore((state) => state)

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
    console.log("call logout function")
    // window.localStorage.clear()
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    LougoutRestErrorMessages && LougoutRestErrorMessages()
  }
  return (
    <div className="navbar_back" style={{
      display: "flex", width: "100%",
      justifyContent: "center", alignItems: "center",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: "fixed",
      top: '0px',
      zIndex: "10"
    }}>
      <div style={{
        width: "90%", display: "flex",
        justifyContent: "space-between",
        alignItems: "start", paddingTop: '0px',

      }}>
        <div style={{ paddingTop: "0px" }} >
          <Link to="/main/accueil">
            <img src={logoImmar} alt="immar media" className="logo-immar" />
          </Link>
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
            color: "white"
          }}>
            <Link
              to="/pige/pige_en_ligne"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <SearchCircleIcon className="icon_nav" style={{
                // width: "35px",

                color: "white",
                // "&:hover": {
                //   color: "#1DC7EA", 
                // },

              }} />

            </Link>
            <p style={{ textTransform: "", fontSize: "10px" }}>pige</p>
          </span>


          <span className="no-icon " style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "80px",

          }}>
            <Link
              to="/veille/veille_creations_publicitaires"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <SpeakerphoneIcon className="icon_nav"
                style={{ color: "white", }}
              />

            </Link>
            <p style={{ textTransform: "", fontSize: "10px" }}>veille</p>
          </span>



          <span className="no-icon" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "80px",

          }} >
            <Link to="/media/tableau_de_bord" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <ChartBarIcon
                className="icon_nav"
                style={{ color: "white", }}
              />
            </Link>
            <p style={{ textTransform: "lowercase", fontSize: "10px" }}>dashboard</p>
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
            <Link to="/login"
              style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center"
              }}>
              <LogoutIcon onClick={handelLogout}
                className="icon_nav"
                style={{ color: "white" }}
              />
            </Link>
            <p style={{ textTransform: "", fontSize: "10px" }}>déconnexion</p>
          </span>


        </div>
      </div>

    </div>
  );
}

export default Header;
