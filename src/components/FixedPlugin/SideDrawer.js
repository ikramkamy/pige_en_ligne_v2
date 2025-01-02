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
import { UsePresseDashboardStore } from "store/dashboardStore/PresseDashboardStore";
import { UseFiltersStore } from "store/dashboardStore/FiltersStore";
import { UseVeilleStore } from 'store/dashboardStore/VeilleMediaStore';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logoImmar from "assets/images.png";
import DataTablePress from "../../views/PressTable";
import { useLocation } from 'react-router-dom';
import TypePub from 'components/Commun/TypePub';
import LoadingButtonData from 'components/Commun/LoadingBtnData';
import BtnRechercheAvanace from 'components/Commun/BtnRechrcheAvance';
import { CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './sidebar.css';
const AnchorTemporaryDrawer = ({ getData, DashboardData,
  //props for loading button,
  isloading,
  isSucces,
  disablebtn,
}) => {
  const exportRef = React.useRef(null);
  const { getDataMedia } = UseMediaDashboardStore((state) => state);
  const { filterVeilledata, veilletvData } = UseVeilleStore((state) => state);
  const [sideShow, setSideShow] = React.useState(false)

  const {
    getAnnonceursActifPresse,
    getAnnonceursActif,
    getCreationUniques,


    getBudgetBrut,
    getSupportDiffusion,


    getDreeTotalDiffusion,
    getDreeTotalMoyenne,

    getPicCommunication,

    getPrtMarchet,
    getVolumePresse,
    getTop20Annonceurs,
    getCreationUniquesPresse,
    getBudgetBrutPresse,
    getSupportDiffusionPresse,
    getCouleur,
    getTop20famillesSectorielles,

    getTop20Marques,
    getTop20Produits,
    getRepartitionFormat,
    getAnnonceursParSupport,
    getCreationParAnnonceur,
  } = UsePresseDashboardStore((state) => state)
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
  } = UseFiltersStore((state) => state);
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
  const handelClose = () => {
    setSideShow(!sideShow)
    console.log('closing dawer')

  }
  React.useEffect(() => {
    console.log("calling filter now")
    setLoadingbtn(isloading);
    setSuccess(isSucces);
    getFilters && getFilters()
  }, [media, date1, date2])
  React.useEffect(() => {
    //setState({ right: true }); 
  }, [])
  const toggleDrawer = (anchor, open) => (event) => {
    //setLoadingbtn(true);
    //setSuccess(isSucces);
    // setTimeout(() => {
    //   setLoadingbtn(false);
    // }, 500);
    //setLoadingbtn(true);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSideShow(!sideShow)
    console.log("sideshow", sideShow)
    setState({ ...state, [anchor]: sideShow });
  };
  const handelApplyFilters = () => {
    setSideShow(false)
  };
  // const handleGetData = async () => {
  //   setLoading(true);
  //   setLoadingshow(false)
  //   try {
  //     if (media === "presse") {
  //       const data = await getDataPresse && getDataPresse(
  //          Filtersupports,
  //          Filterfamilles,
  //          Filterclassesids,
  //          Filtersecteursids,
  //          Filtervarietiesids, 
  //          Filterannonceursids,
  //          Filtermarquesids,
  //          Filterproduitsids

  //         );
  //       setLoading(false);
  //       setLoadingshow(true)

  //     } else if (media !== "presse") {
  //       setLoadingshow(false)
  //       const data = (await getDataMedia) && getDataMedia(
  //         media,
  //          Filtersupports,
  //          Filterfamilles,
  //          Filterclassesids,
  //          Filtersecteursids,
  //          Filtervarietiesids, 
  //          Filterannonceursids,
  //          Filtermarquesids,
  //          Filterproduitsids,
  //          rangs


  //       );
  //       console.log("data media using isloading", data);
  //       setLoading(false);
  //       console.log("is loading", loading);
  //       setLoadingshow(true)
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setLoading(false);
  //   }
  // };

  React.useEffect(() => {
    if (location.pathname == "/admin/veille") {
      setShowBase(false)
      setShowVeilleFilters(true)
      setShowRang(false)
    } else if (location.path == "/admin/dashboard") {
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
  //  React.useEffect(()=>{
  //         // console.log("state.showRang ",showRang)
  //         if(media == "radio" || media == "television"){
  //          setShowRang(true)

  //         }else {
  //           setShowRang(false)

  //         }

  //       },[media])
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
          filterVeilledata && filterVeilledata(veilletvData, Filterfamilles, Filterannonceursids,
            Filtersupports, supports, Filtervarietiesids, Filterclassesids, Filtermarquesids, Filterclassesids, Filterproduitsids, media, veille_diffusion, date1, date2, typeVeille)
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

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 550 }}
      role="presentation"
    // onClick={toggleDrawer(anchor, false)}
    // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {/* <Col md={6} >
        <img src={logoImmar} alt="immar media" width="100px"/>

      </Col> */}
      </List>

      <Row>
        {showRang && (
          <Col md={6}>
            <MultipleSelectRangs />
          </Col>)
        }
        {showBase && (
          <Col md={6}>
            <MultipleSelectBase />
          </Col>
        )
        }</Row>
      {showVeilleFilters && (
        <Row>
          <Col md={6}>
            <TypePub />
          </Col>
        </Row>
      )}
      {/* <Divider />  */}
      <List>
        <Row>
          <Col md={6}>
            <MultipleSelectSupports />
            <MultipleSelectFamilles />
            <MultipleSelectClasses />
            <MultipleSelectSecteurs />
          </Col>
          <Col md={6}>
            <MultipleSelectVarieties />
            <MultipleSelectAnnoneurs />
            <MultipleSelectMarques />
            <MultipleSelectProducts />
          </Col>
        </Row>

        <Row className="mt-10">
          <Col className="col-12 d-flex justify-content-center align-items-center">
            <LoadingButtonData

              getData={getData}
              disabled={!media}
              isloading={isloading}
              isSucces={isSucces}
              disablebtn={disablebtn}
            />
            <div style={{
              visibility: 'hidden', position: 'absolute',
              top: 0, left: 0, width: 0, height: 0, display: "none"
            }}>
              <div ref={exportRef}>
                <GridDemo />
              </div>
              <DataTablePress />
            </div>
          </Col>
        </Row>
      </List>
    </Box>
  );


  return (
    <div className="Side_Translate_X" style={{ backgroundColor: "white",width:"300px", borderRadius: "5px" }}>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            sx={{
              textTransform: "none",
              backgroundColor: '#00a6e0',
              backgroundColor: '#00a6e0',
              textTransform: "none",
              width: "fit-content",
              color: '',
              '&:hover': {
                backgroundColor: '#00a6e0',
              }
            }}
            variant="contained"
            color="primary"
            //onClick={toggleDrawer(anchor, true)}
            disabled={loadingbtn || success || (!media)}
            // disabled={!disablebtn}
            startIcon={loadingbtn ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loadingbtn ? 'Envoi...' : success ? 'Recherche avancée' : 'Recherche avancée'}
          </Button>
          {success && (
            <CheckCircleIcon
              style={{ color: 'green', marginLeft: '10px' }}
            />
          )}
          {/* <Button
            sx={{
              backgroundColor: '#00a6e0',
              textTransform: "none",
              width: "fit-content",
              color: '',
              '&:hover': {
                backgroundColor: '#00a6e0',
              }
            }}
            variant="contained"
            disableElevation
            className=""
            onClick={toggleDrawer(anchor, true)}
            disabled={(!media && disableTimer)}
          >
            Recherche avancée
          </Button> */}

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>

      ))}
    </div>
  );
}
export default AnchorTemporaryDrawer;