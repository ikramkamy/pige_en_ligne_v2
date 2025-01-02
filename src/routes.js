import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Home from "views/Home";
import DataTablePress from "views/PressTable";
import SignIn from "views/Login";
import Register from "./views/SignUp";
import MotDePasseOublier from "views/MotdePassOublier";
import Reinitialiser from "views/ReinitialiserMotdepasse";
import VeillePub from "views/VeillePub";
import Privacy from 'views/Privacy';
import CGV from 'views/Termes';
import ExportPPT from "views/PptFile";
const dashboardRoutes = [
  {
    path: "/home",
    name: "Home IMMAR MEDIA",
    icon: "nc-icon nc-chart-pie-35",
    component: Home,
    layout: "/admin"
  },
  {
    path: `/reinitialiser/:token`,
    name: "Reinitialiser",
    icon: "nc-icon nc-chart-pie-35",
    component:  Reinitialiser,
    layout: "/login"
  },
  {
    path: "/motdepasseoublier",
    name: "Signup",
    icon: "nc-icon nc-chart-pie-35",
    component:  MotDePasseOublier,
    layout: "/login"
  },
  {
    path: "/signup",
    name: "Signup",
    icon: "nc-icon nc-chart-pie-35",
    component: Register,
    layout: "/login"
  },
  {
    path: "/",
    name: "Login",
    icon: "nc-icon nc-chart-pie-35",
    component: SignIn,
    layout: "/login"
  },
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "nc-icon nc-chart-pie-35",
  //   component: Dashboard,
  //   layout: "/admin"
  // },
  {
    path: "/tableau_de_bord",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/media"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/privacy",
    name: "politique de condifentialité",
    icon: "nc-icon nc-circle-09",
    component: Privacy,
    layout: "/admin"
  },
  {
    path: "/termes",
    name: "Conditions générales de vente",
    icon: "nc-icon nc-circle-09",
    component: CGV,
    layout: "/admin"
  },
  {
    path: "/ppt",
    name: "Conditions générales de vente",
    icon: "nc-icon nc-circle-09",
    component: ExportPPT,
    layout: "/admin"
  },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "nc-icon nc-notes",
  //   component: DataTablePress,
  //   layout: "/admin"
  // },
   {
    path: "/pige_en_ligne",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: DataTablePress,
    layout: "/pige"
  },
  {
    path: "/tablepresse",
    name: "Table presse",
    icon: "nc-icon nc-notes",
    component:DataTablePress,
    layout: "/admin"
  },
  {
    path: "/veille_creations_publicitaires",
    name: "Veille Des Créations Publicitaires",
    icon: "nc-icon nc-notes",
    component:VeillePub,
    layout: "/veille"
  },


  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-paper-2",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin"
  },

];

export default dashboardRoutes;
