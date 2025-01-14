import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MultipleSelectFamilles from "../Commun/MultiSelect";
import MultipleSelectClasses from "../Commun/SelectClasses";
import MultipleSelectSecteurs from "../Commun/SelectSecteurs";
import MultipleSelectProducts from "../Commun/SelectProduits";
import MultipleSelectSupports from "../Commun/SupportSelect";
import MultipleSelectVarieties from "../Commun/VarieteSelect";
import MultipleSelectAnnoneurs from "../Commun/SelectAnnonceurs";
import MultipleSelectMarques from "../Commun/SelectMarques";
import MultipleSelectRangs from "../Commun/RangSelect";
import MultipleSelectBase from "../Commun/BaseSelect";
import Button from "@mui/material/Button";
import { Row, Col } from "react-bootstrap";
import GridDemo from 'components/Commun/charts/TOP20Charts';
import { UseMediaDashboardStore } from "store/dashboardStore/MediaDashboardStore";
import { UsePigeDashboardStore } from "store/dashboardStore/PigeDashboardStore";
import { UseFiltersStore } from "store/dashboardStore/FiltersStore";
import { UseVeilleStore } from 'store/dashboardStore/VeilleMediaStore';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logoImmar from "assets/images.png";
import DataTablePress from "../../views/PigeTable";
import { useLocation } from 'react-router-dom';
import TypePub from 'components/Commun/TypePub';
import LoadingButtonData from 'components/Commun/LoadingBtnData';
import BtnRechercheAvanace from 'components/Commun/BtnRechrcheAvance';
import { CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { UseLoginStore } from "store/dashboardStore/useLoginStore";
import './sidebar.css';
import MultipleSelectVarietiesWindow from 'components/Commun/WindowSelectVarieties';
import SearchPopupVarieties from 'components/Commun/SearchPopupVarities';
const AutomaticSideFilterBar = ({ getData, DashboardData,
    //props for loading button,
    isloading,
    isSucces,
    disablebtn,
}) => {
    const exportRef = React.useRef(null);
    const { getDataMedia } = UseMediaDashboardStore((state) => state);
    const { filterVeilledata, veilletvData } = UseVeilleStore((state) => state);
    const [sideShow, setSideShow] = React.useState(false)
    const {email}=UseLoginStore((state)=>state)
 const {

        Filtersupports,
        supports,
        Filterclassesids,
        Filterfamilles,
        familles,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        veille_diffusion,
        media,
        rangs,
        base,
        date1,
        date2,
        typeVeille,
        setRangFilter,
        setMediaValue,
        getFilters,
        setLoadingshow,
        SideBarFilterPosition,
        ManageSideBarfilterDisplay,
       

    } = UseFiltersStore((state) => state);
    //console.log('familles',Filterclassesids,familles)
    const location = useLocation();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [showRang, setShowRang] = React.useState(false)
    const [showBase, setShowBase] = React.useState(true)
    const [showVeilleFilters, setShowVeilleFilters] = React.useState(false)
    const [disableTimer, setDisableTimer] = React.useState(false)
    const [loadingbtn, setLoadingbtn] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
   const user_id=window.localStorage.getItem('user_id')
    React.useEffect(() => {
        setLoadingbtn(isloading);
        setSuccess(isSucces);
        // getFilters && getFilters()
    }, [media, date1, date2])


    React.useEffect(() => {
        if (location.pathname == "/veille/veille_creations_publicitaires") {
            setShowBase(false)
            setShowVeilleFilters(true)
            setShowRang(false)
        } else if (location.path == "/media/tableau_de_bord") {
            setShowBase(true)
            setShowVeilleFilters(false)
            setShowRang(true)
        } else {
            setShowBase(false)
            setShowVeilleFilters(false)
            setShowRang(false)
        }

    }, [location.pathname, media])
    //le rang ne figure pas dans ,l'ancienne version de veille online 
    React.useEffect(() => {
        // console.log("state.showRang ",showRang)
        if (media == "radio" || media == "television") {
            setShowRang(true)

        } else {
            setShowRang(false)

        }

    }, [media])

    // React.useEffect(() => {
    //     getFilters && getFilters(
    //         media,
    //         user_id,
    //         usePrevilegesSupport_radio,
    //         usePrevilegeschainetv,
    //         usePrevilegesFamilles,
    //         usePrevilegesClasse,
    //         usePrevilegesSecteur,
    //         usePrevilegesVarietes,
    //         usePrevilegesProduit,
    //         usePrevilegesAnnonceurs,
    //         usePrevilegesMarques,)
    // }, [media, date1, date2])


    //I do not use it instead I'm passing functions as props
    const getDataLocationDepend = async () => {
        if (media === "presse") {
            switch (location.pathname) {
                case "/admin/table":
                    console.log("calling press data fetching")
                    setLoading(false)
                    // setFilteredData([])
                    setLoadingshow(false)
                    getData()
                    setLoading(true)
                    setLoadingshow(true)
                    break;

                case "/admin/dashboard":
                    ShowDashboardData()
                    break;


                case "/admin/veille":
                    console.log('type calling filtering', typeVeille)
                    
                    break;

            }

        } else if (media === 'radio' || media === 'television') {


            switch (location.pathname) {
                case '/admin/table':
                    setLoading(false)
                    setFilteredData2([])


                    try {
                        setLoading(false)
                        const data = await getDataMedia && getDataMedia(media,
                            Filtersupports,
                            Filterfamilles,
                            Filterclassesids,
                            Filtersecteursids,
                            Filtervarietiesids,
                            Filterannonceursids,
                            Filtermarquesids,
                            Filterproduitsids,
                            rangs,
                            date1,
                            date2
                        )


                        setLoading(true)
                        setLoadingshow(true)
                    } catch (error) {

                    }
                    break;
                case '/admin/veille':
                    console.log('calling filtering')
                    filterVeilledata && filterVeilledata(veilletvData, Filterfamilles, Filterannonceursids,
                        Filtersupports, supports, Filtervarietiesids, Filterclassesids, Filtermarquesids, Filterclassesids, Filterproduitsids, media, veille_diffusion, date1, date2, typeVeille)
                    break;

                case '/admin/dashboard':

                    break;
            }

        } else {
            alert("Selectionnez la media !")
        }
    }
    const exportToPDF = () => {
        const input = document.getElementById('charts-container');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, heightLeft - imgHeight, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('charts.pdf');
        });
    };

    const handeCloseSideBar = () => {
        console.log("closing", SideBarFilterPosition)
        ManageSideBarfilterDisplay && ManageSideBarfilterDisplay("-100%")
    }
    const [width, setWidth] = React.useState(window.innerWidth < 768 ? '350px' : '650px');
    React.useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth < 768 ? '350px' : '650px');
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
    console.log("produits are readdy",Filterproduitsids.length)
    return (
        <div className="Side_Translate_X"

            style={{
                position: 'fixed',
                borderRadius: "10px",
             
                zIndex: "1000",
                top: 0,
                right: SideBarFilterPosition,
            
               width: width,
                height: '100%',
                backgroundColor: 'white',
                transition: 'right 0.3s ease',
                overflowY: "scroll"
            }}
        >
            {!Filterproduitsids && (<div>Recherche des filtres...</div>)}
            {Filterproduitsids && ( <Box

role="presentation"
>

{/* 
<Row style={{ justifyContent: "center", padding: "50px" }}>
    {showRang && (
        <Col style={{ width: "30%" }}>
            <MultipleSelectRangs />
        </Col>)
    }
    {showBase && (
        <Col style={{ width: "30%" }}>
            <MultipleSelectBase />
        </Col>
    )
    }</Row> */}


{/* {showVeilleFilters && (
    <Row>
        <Col style={{ width: "30%" }}>
            <TypePub />
        </Col>
    </Row>
)} */}


<List >

        
    <Row style={{ justifyContent: "center", padding: "50px" }} >
        <Col style={{ width: "30%" }}>
       
        {showVeilleFilters && (<TypePub />)}
            <MultipleSelectFamilles />
            <MultipleSelectClasses />
            <MultipleSelectSecteurs />
        </Col>
        <Col style={{ width: "30%" }}>
        {showVeilleFilters && (<div style={{visibility:"hidden"}}><TypePub  /></div>)}
            {/* <MultipleSelectVarietiesWindow/> */}
            <MultipleSelectVarieties />
            <MultipleSelectAnnoneurs />
            <MultipleSelectMarques />
            <MultipleSelectProducts />
        </Col>
    </Row>
    <Row style={{ justifyContent: "center",
          width:"50%", paddingLeft:"50px",
          paddingRight:"50px"}}> 
        
    <Col style={{ width: "30%" }}>
        {showRang && (
                 <MultipleSelectSupports />
                // <MultipleSelectRangs />
           )
       }
        {showBase && (<div></div>
                //    <MultipleSelectBase />                           
        )
        }
        </Col>
        
</Row>

    
    <Row className="mt-10">
        <Col className="col-12 d-flex justify-content-center align-items-center mt-5">
            <LoadingButtonData

                getData={getData}
                disabled={!media}
                isloading={isloading}
                isSucces={isSucces}
                disablebtn={!media && !base}
                title="Afficher"
            />
            <Button
                sx={{ textTransform: "none", width: "fit-content", backgroundColor:"#00a6e0",

                    '&:hover': {
          backgroundColor: '#00a6e0',
        }
                 }}
                variant="contained"
                color="primary"
                onClick={handeCloseSideBar} >
                Fermer
            </Button>



            {/* <div style={{
                visibility: 'hidden', position: 'absolute',
                top: 0, left: 0, width: 0, height: 0, display: "none"
            }}>




                <div ref={exportRef}>
                    <GridDemo />
                </div>
                <DataTablePress />
            </div> */}
        </Col>
    </Row>
</List>
                 </Box>)}
           
        </div>
    );
}
export default AutomaticSideFilterBar;