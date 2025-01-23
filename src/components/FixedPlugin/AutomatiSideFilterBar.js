import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import MultipleSelectFamilles from "../Commun/MultiSelect";
import MultipleSelectClasses from "../Commun/SelectClasses";
import MultipleSelectSecteurs from "../Commun/SelectSecteurs";
import MultipleSelectProducts from "../Commun/SelectProduits";
import MultipleSelectSupports from "../Commun/SupportSelect";
import MultipleSelectVarieties from "../Commun/VarieteSelect";
import MultipleSelectAnnoneurs from "../Commun/SelectAnnonceurs";
import MultipleSelectMarques from "../Commun/SelectMarques";
import Button from "@mui/material/Button";
import { Row, Col } from "react-bootstrap";
import { UseMediaDashboardStore } from "store/dashboardStore/MediaDashboardStore";
import { UseFiltersStore } from "store/dashboardStore/FiltersStore";
import { UseVeilleStore } from 'store/dashboardStore/VeilleMediaStore';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocation } from 'react-router-dom';
import TypePub from 'components/Commun/TypePub';
import LoadingButtonData from 'components/Commun/LoadingBtnData';
import { UseLoginStore } from "store/dashboardStore/useLoginStore";
import './sidebar.css';
import SimpleTextInput from 'components/Commun/veille/SeachByIdInput';

const AutomaticSideFilterBar = ({ getData, DashboardData,
    //props for loading button,
    isloading,
    isSucces,
}) => {
    const exportRef = React.useRef(null);
    const { getDataMedia } = UseMediaDashboardStore((state) => state);
    const { filterVeilledata, veilletvData } = UseVeilleStore((state) => state);
    const [sideShow, setSideShow] = React.useState(false)
    const { email } = UseLoginStore((state) => state)
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
    const user_id = window.localStorage.getItem('user_id')
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
    const [width, setWidth] = React.useState(window.innerWidth < 768 ? '350px' : '550px');
    React.useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth < 768 ? '350px' : '650px');
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    console.log('isloading in autmatic filters', isloading)
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
                overflowY: "hidden"
            }}
        >
            {!Filterproduitsids && (<div>Recherche des filtres...</div>)}
            {Filterproduitsids && (<Box
                role="presentation"
            >
                <List style={{ overflowX: "hidden" }}>

                    <Row style={{ justifyContent: "center", padding: "20px" }} >
                        <Col style={{ width: "30%" }}>
                            {(showRang && !showVeilleFilters) && (<MultipleSelectSupports />)}
                            {showVeilleFilters && (<SimpleTextInput />)}
                            {showVeilleFilters && (<TypePub />)}
                            <MultipleSelectFamilles />

                            {!showVeilleFilters && <MultipleSelectClasses />}
                            {!showVeilleFilters && <MultipleSelectSecteurs />}

                        </Col>
                        <Col style={{ width: "30%" }}>
                            {/* {showVeilleFilters && (<div style={{visibility:"hidden"}}><TypePub/></div>)} */}
                            {/* <MultipleSelectVarietiesWindow/> */}
                            {!showVeilleFilters && <MultipleSelectVarieties />}
                            <MultipleSelectAnnoneurs />
                            <MultipleSelectMarques />
                            <MultipleSelectProducts />
                        </Col>
                    </Row>
                    {showVeilleFilters && <div style={{ height: "30vh", width: "100%" }}></div>}
                    <div
                        style={{
                            bottom: "0px", width: "100%",
                            display: "flex", justifyContent: "center", alignItems: "center"
                        }}>
                        <LoadingButtonData
                            getData={getData}
                            isloading={isloading}
                            isSucces={isSucces}
                            disablebtn={!media}
                            title="Afficher"
                            mr="10px"
                        />
                        <Button
                            sx={{
                                textTransform: "none", width: "fit-content",
                                backgroundColor: "#00a6e0",
                                '&:hover': {
                                    backgroundColor: '#00a6e0',
                                }
                            }}
                            variant="contained"
                            color="primary"
                            onClick={handeCloseSideBar} >
                            Fermer
                        </Button>

                    </div>
                </List>
            </Box>)}
        </div>
    );
}
export default AutomaticSideFilterBar;