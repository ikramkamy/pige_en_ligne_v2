
import React, { useState } from "react";
import { useLocation, Route } from "react-router-dom";
import sidebarImage from "assets/img/sidebar-3.jpg";
import { UseLoginStore } from "store/dashboardStore/useLoginStore";
import { PDFPage } from "views/PDFPage";
import { UseFiltersStore } from "store/dashboardStore/FiltersStore";
import { UsePigeDashboardStore } from "store/dashboardStore/PigeDashboardStore";
import { UseCountStore } from "store/dashboardStore/UseCounts";
function PdfLayout() {

    const imageId = sessionStorage.getItem('imageId')
    const imgData = sessionStorage.getItem(imageId);


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
        PicCommunication,
        PicCommunicationLastYear,
    } = UsePigeDashboardStore((state) => state)
    const [image, setImage] = React.useState(sidebarImage);
    const [color, setColor] = React.useState("black");
    const [hasImage, setHasImage] = React.useState(true);
    const { count, countLastYear } = UseCountStore((state) => state)
    const {
        date1, date2,
        supports,
        media,
        familles,
        annonceurs,
        marques } = UseFiltersStore((state) => state)
    const location = useLocation();
    const mainPanel = React.useRef(null);
    const [padding, setPadding] = React.useState('40px');
    const { usePrevilegesFamilles } = UseLoginStore((state) => state)

    // console.log('familles', familles)
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
    const [parameters, setParameters] = useState([])
    // const parameters = [
    //     { name: 'Volume publicitaire', count: count, countLastYear: countLastYear },
    //     { name: 'Annonceurs actifs', count: AnnonceursActif, countLastYear: AnnonceursActifLastYear },
    //     { name: 'Creations uniques', count: CreationUniques, countLastYear: CreationUniquesLastYear },
    //     { name: 'Budget Brut', count: BudgetBrut, countLastYear: BudgetBrutLastYear },
    //     { name: 'Support de diffusion', count: SupportDiffusion, countLastYear: SupportDiffusionLastYear },
    //     { name: 'Diffusions par Création', count: DiffusionParCreation, countLastYear: DiffusionParCreationLastYear },
    //     { name: 'Couleur', count: Couleur, countLastYear: CouleurLastYear },
    //     { name: 'Noir et Blanc', count: NoireBlanc, countLastYear: NoireBlancLastYear },
    //     { name: 'Durée Pub Totale', count: DureeTotal, countLastYear: DureeTotalLastYear },
    //     { name: 'Durée moyenne par spot', count: DureeMoyenne, countLastYear: DureeMoyenneLastYear }
    // ];

    React.useEffect(() => {

        if (media == "presse") {

            setParameters([
                { name: 'Volume publicitaire', count: count, countLastYear: countLastYear },
                { name: 'Annonceurs actifs', count: AnnonceursActif, countLastYear: AnnonceursActifLastYear },
                { name: 'Creations uniques', count: CreationUniques, countLastYear: CreationUniquesLastYear },
                { name: 'Budget Brut', count: BudgetBrut, countLastYear: BudgetBrutLastYear },
                { name: 'Support de diffusion', count: SupportDiffusion, countLastYear: SupportDiffusionLastYear },
                { name: 'Diffusions par Création', count: DiffusionParCreation, countLastYear: DiffusionParCreationLastYear },
                { name: 'Couleur', count: Couleur, countLastYear: CouleurLastYear },
                { name: 'Noir et Blanc', count: NoireBlanc, countLastYear: NoireBlancLastYear },
            ])

        } else {

            setParameters([
                { name: 'Volume publicitaire', count: count, countLastYear: countLastYear },
                { name: 'Annonceurs actifs', count: AnnonceursActif, countLastYear: AnnonceursActifLastYear },
                { name: 'Creations uniques', count: CreationUniques, countLastYear: CreationUniquesLastYear },
                { name: 'Budget Brut', count: BudgetBrut, countLastYear: BudgetBrutLastYear },
                { name: 'Support de diffusion', count: SupportDiffusion, countLastYear: SupportDiffusionLastYear },
                { name: 'Diffusions par Création', count: DiffusionParCreation, countLastYear: DiffusionParCreationLastYear },
                { name: 'Durée Pub Totale', count: DureeTotal, countLastYear: DureeTotalLastYear },
                { name: 'Durée moyenne par spot', count: DureeMoyenne, countLastYear: DureeMoyenneLastYear },
                {
                    name: 'Pic publicitaire',
                    count: `${PicCommunication.count + " => " +
                        PicCommunication.interval_start.slice(0, -3) +" à " +
                        PicCommunication.interval_end.slice(0, -3)}`,
                    countLastYear:
                        `${PicCommunicationLastYear.count + " => " +
                      PicCommunicationLastYear.interval_start.slice(0, -3) 
                          +" à "+ PicCommunicationLastYear.interval_end.slice(0, -3)}`,}

            ])


        }
    }, [])

    console.log("params for pdf", familles, supports, marques, annonceurs)


    const tableData = [
        { title: "Media", value: media == "television" ? "Télévision" : media == "presse" ? "Presse" : media == "radio" ? "Radio" : "" },
        { title: "Date", value: `${formatDateToFrench(date1)}-${formatDateToFrench(date2)}` },
        { title: "familles", value: familles.map((e) => e.Famille_Lib).join(', ') },
        { title: "supports", value: supports.map((e) => e.Support_Lib).join(', ') },
        { title: "marques", value: marques.length },
        { title: "annonceurs", value: annonceurs.length },
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
                    evolutionImageDate={imgData}
                    supports={supports}
                    media={media == "television" ? "Télévision" : 
                      media == "presse" ? "Presse" : media == "radio" ? "Radio" : ""}
                    annonceurs={annonceurs}
                    marques={marques}
                    tableData={tableData}
                    BarChart={<BarChart/>}
                />
            </div>
            {/* <Footer /> */}
        </div>


    );
}

export default PdfLayout;

const BarChart = () => {
  // Sample data for the bar chart
  const data = [
    { label: "Jan", value: 30 },
    { label: "Feb", value: 45 },
    { label: "Mar", value: 60 },
    { label: "Apr", value: 70 },
    { label: "May", value: 50 },
    { label: "Jun", value: 80 },
  ];

  // Chart dimensions
  const width = 400;
  const height = 300;
  const barWidth = (width - 20) / data.length; // Adjust spacing between bars
  const maxValue = Math.max(...data.map((d) => d.value));
  const scale = (value) => (height - 40) * (value / maxValue);

  return (
    <svg width={width} height={height} style={{ border: "1px solid #ccc" }}>
      {/* Y-axis labels */}
      <g>
        <text x={-20} y={20} transform="rotate(-90)" fontSize="12" textAnchor="middle">
          Value
        </text>
        <line x1={20} y1={20} x2={20} y2={height - 20} stroke="#aaa" />
        {[...Array(5)].map((_, i) => {
          const y = 20 + (i * (height - 40)) / 4;
          const value = ((maxValue / 4) * (4 - i)).toFixed(0);
          return (
            <>
              <line
                x1={20}
                y1={y}
                x2={width - 20}
                y2={y}
                stroke="#ddd"
                key={`grid-line-${i}`}
              />
              <text x={10} y={y + 4} fontSize="10" fill="#666" textAnchor="end">
                {value}
              </text>
            </>
          );
        })}
      </g>

      {/* X-axis labels */}
      <g>
        <line x1={20} y1={height - 20} x2={width - 20} y2={height - 20} stroke="#aaa" />
        {data.map((d, index) => {
          const x = 20 + index * barWidth + barWidth / 2;
          return (
            <text
              key={`x-label-${index}`}
              x={x}
              y={height - 10}
              fontSize="10"
              fill="#666"
              textAnchor="middle"
            >
              {d.label}
            </text>
          );
        })}
      </g>

      {/* Bars */}
      <g>
        {data.map((d, index) => {
          const x = 20 + index * barWidth;
          const y = height - 20 - scale(d.value);
          return (
            <rect
              key={`bar-${index}`}
              x={x}
              y={y}
              width={barWidth - 5}
              height={scale(d.value)}
              fill="#fec800"
            />
          );
        })}
      </g>
    </svg>
  );
};

