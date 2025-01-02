import React, { useState,useEffect } from "react";
import ReactDOM from "react-dom/client";

import { HashRouter,BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";
import HomeLayout from "layouts/HomePage.js";
import DataLayout from "layouts/DataLayout";
import VeilleLayout from "layouts/VeilleLayout";
import DashboardLayout from "layouts/DashboardLayout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />}/>
      <Route path="/login" render={(props) => <HomeLayout {...props} />}/>
      <Route path="/pige" render={(props) => <DataLayout {...props} />}/>
      <Route path="/veille" render={(props) => <VeilleLayout  {...props} />}/>
      <Route path="/media" render={(props) => <DashboardLayout  {...props} />}/>
       <Redirect from="/" to="/login" />
    </Switch>
    </HashRouter>
);
 