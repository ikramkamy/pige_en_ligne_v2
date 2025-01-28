import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import Home from "views/Home";
import DataTablePige from "views/PigeTable";
import SignIn from "views/Login";
import MotDePasseOublier from "views/MotdePassOublier";
import Reinitialiser from "views/ReinitialiserMotdepasse";
import VeillePub from "views/VeillePub";
import Privacy from 'views/Privacy';
import CGV from 'views/Termes';
import ExportPPT from "views/PptFile";
import PowerBiDashbord from "views/PowerBiDashboard";
const dashboardRoutes = [
  {
    path: "/accueil",
    name: "Home IMMAR MEDIA",
    icon: "nc-icon nc-chart-pie-35",
    component: Home,
    layout: "/main"
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
    path: "/",
    name: "Login",
    icon: "nc-icon nc-chart-pie-35",
    component: SignIn,
    layout: "/login"
  },
  {
    path: "/tableau_de_bord",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/media"
  },
  {
    path: "/tableau_de_bord_powerbi",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: PowerBiDashbord,
    layout: "/media"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/main"
  },
  {
    path: "/privacy",
    name: "politique de condifentialité",
    icon: "nc-icon nc-circle-09",
    component: Privacy,
    layout: "/main"
  },
  {
    path: "/termes",
    name: "Conditions générales de vente",
    icon: "nc-icon nc-circle-09",
    component: CGV,
    layout: "/main"
  },
  {
    path: "/ppt",
    name: "Conditions générales de vente",
    icon: "nc-icon nc-circle-09",
    component: ExportPPT,
    layout: "/admin"
  },
   {
    path: "/pige_en_ligne",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: DataTablePige,
    layout: "/pige"
  },
  {
    path: "/veille_creations_publicitaires",
    name: "Veille Des Créations Publicitaires",
    icon: "nc-icon nc-notes",
    component:VeillePub,
    layout: "/veille"
  },


];

export default dashboardRoutes;
