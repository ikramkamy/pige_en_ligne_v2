
import React, { Component } from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import routes from "routes.js";
import sidebarImage from "assets/img/sidebar-3.jpg";
import { Row, Col, Container } from 'react-bootstrap';
import { UseLoginStore } from "store/dashboardStore/useLoginStore";
import { PDFPage } from "views/PDFPage";
import { UseFiltersStore } from "store/dashboardStore/FiltersStore";
import { UsePigeDashboardStore } from "store/dashboardStore/PigeDashboardStore";
import { UseCountStore } from "store/dashboardStore/UseCounts";
function PdfLayout() {
    const {
        formatDateToFrench,
        AnnonceursActif,
        AnnonceursActifLastYear,
        CreationUniques,
        CreationUniquesLastYear,
        BudgetBrut,
        BudgetBrutLastYear,
        SupportDiffusion,
        SupportDiffusionLastYear,
        DiffusionParCreation,
        DiffusionParCreationLastYear,
        Couleur,
        NoireBlanc,
        CouleurLastYear,
        NoireBlancLastYear,
        DureeTotal,
        DureeTotalLastYear,
        DureeMoyenne,
        DureeMoyenneLastYear,
        unifiedGraphStructure,
    } = UsePigeDashboardStore((state) => state)
    const [image, setImage] = React.useState(sidebarImage);
    const [color, setColor] = React.useState("black");
    const [hasImage, setHasImage] = React.useState(true);
    const { count, countLastYear } = UseCountStore((state) => state)
    const { date1, date2,
        supports,
        familles,
        annonceurs,
        marques } = UseFiltersStore((state) => state)
    const location = useLocation();
    const mainPanel = React.useRef(null);
    const [padding, setPadding] = React.useState('40px');
    const { usePrevilegesFamilles } = UseLoginStore((state) => state)

    console.log('familles', familles)
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/pdf") {
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

    const parameters = [
        { name: 'Volume publicitaire', count: count, countLastYear: countLastYear },
        { name: 'Annonceurs actifs', count: AnnonceursActif, countLastYear: AnnonceursActifLastYear },
        { name: 'Creations uniques', count: CreationUniques, countLastYear: CreationUniquesLastYear },
        { name: 'Budget Brut', count: BudgetBrut, countLastYear: BudgetBrutLastYear },
        { name: 'Support de diffusion', count: SupportDiffusion, countLastYear: SupportDiffusionLastYear },
        { name: 'Diffusions par Création', count: DiffusionParCreation, countLastYear: DiffusionParCreationLastYear },
        { name: 'Couleur', count: Couleur, countLastYear: CouleurLastYear },
        { name: 'Noir et Blanc', count: NoireBlanc, countLastYear: NoireBlancLastYear },
        { name: 'Durée Pub Totale', count: DureeTotal, countLastYear: DureeTotalLastYear },
        { name: 'Durée moyenne par spot', count: DureeMoyenne, countLastYear: DureeMoyenneLastYear }
    ];
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
            backgroundColor: `#020b42`,
            overflowX: "hidden",
            display: 'flex',
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            height: "auto",
            minHeight: "100vh"
        }}>
            <div ref={mainPanel} style={{
                width: "100%",
                display: 'flex',
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "column",
                height: "100%",
            }}>
                <PDFPage
                    date1={date1 ? formatDateToFrench(date1) : ""}
                    date2={date2 ? formatDateToFrench(date2) : ""}
                    familles={familles}
                    count={count}
                    countLastYear={countLastYear}
                    parameters={parameters}
                    unifiedGraphStructure={unifiedGraphStructure}
                />
            </div>
            {/* <Footer /> */}
        </div>


    );
}

export default PdfLayout;
