import React, { useEffect, useState } from "react";
import { UsePigeDashboardStore } from '../store/dashboardStore/PigeDashboardStore';
import { UseFiltersStore } from "../store/dashboardStore/FiltersStore";
import MultipleSelectMedia from '../components/Commun/MediaSelect';
import GridDemo from '../components/Commun/charts/TOP20Charts';
import dash from 'assets/tableSearch.gif';
import iconVolume from 'assets/img/icons/graph-bar.png';
import iconAnnonceur from 'assets/img/icons/advertisement.png';
import iconCreation from 'assets/img/icons/creationpub.png';
import iconBudget from 'assets/img/icons/budget.png';
import iconSupprt from 'assets/img/icons/radio-station.png';
import iconTime from 'assets/img/icons/time.png';
import iconDuree from 'assets/img/icons/stopwatch.png';
import iconPis from 'assets/img/icons/rank.png';
import DiffuIcon from 'assets/img/icons/seo-report.png'
import MultipleSelectBase from 'components/Commun/BaseSelect';
import { UseMediaDashboardStore } from "store/dashboardStore/MediaDashboardStore";
import iconPresse from 'assets/img/icons/press-release.png';
import LoadingIndicator from "components/Commun/LoadingIndcator";
import LoadingButtonData from "components/Commun/LoadingBtnData";
import AutomaticSideFilterBar from 'components/FixedPlugin/AutomatiSideFilterBar';
import {
  Container,
  Row,
  Col
} from "react-bootstrap";
import { Button } from "@mui/material";
import DateRangeTest from 'components/Commun/DateRangePickerTest'
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import { UseLoginStore } from "store/dashboardStore/useLoginStore";
import DataUnavailablePopup from "components/Commun/popups/DataUnavailable";
import { NetworkErrorPopup } from "components/Commun/popups";
import { UseCountStore } from "store/dashboardStore/UseCounts";
import { Widget } from "components/Commun/DashboardWidgets/Widgets";
import { WidgetPresse } from "components/Commun/DashboardWidgets/WidgetPresse";
import { UseGraphStore } from "store/GraphStore";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { FilterIcon, FileDownIcon } from "lucide-react";
import { jwtDecode } from 'jwt-decode';
import PdfCreationPopup from "components/Commun/popups/PdfCreationPopUp";
import logo from "assets/Logo adtrics.png";
import DateRange2 from "components/Commun/DateRangePicker2";
function Dashboard() {
  document.title = 'ADTRICS - BY IMMAR'
  const { getEvolutionData, MarcheOptions ,getEvolutionDataLast} = UseGraphStore((state) => state)
  const [loadingPDF30sec, setLoadingPDF30sec] = useState(true)
  const ParamToken = useParams()
  useEffect(() => {
    LoginWithParamToken && LoginWithParamToken(ParamToken.token)
    StoreParamToken && StoreParamToken(ParamToken.token)
    window.localStorage.setItem('token', ParamToken.token)
    var decoded = jwtDecode(ParamToken.token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const isExpired = decoded.exp < currentTime; // Compare with current time
  }, [])
  const [timeTokenExpiration, setTimeTokenExpiration] = useState(0);

  useEffect(() => {
    // Function to check if the token is expired
    const checkTokenExpiration = () => {
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const tokenExpirationTime = timeTokenExpiration; // Token expiration time (in seconds)

      if (currentTime >= tokenExpirationTime && tokenExpirationTime !== 0) {
        //console.log('Token expired');
        window.localStorage.removeItem('token');
        LougoutRestErrorMessages && LougoutRestErrorMessages(email)
        window.location.href = 'https://adtrics.immar.dz/#/login';
      }
    };

    checkTokenExpiration();
    const intervalId = setInterval(checkTokenExpiration, 6000);
    return () => clearInterval(intervalId);
  }, [timeTokenExpiration]);
  //console.log('timeTokenExpiration', timeTokenExpiration)
  const {
    Top20produits,
    BudgetBrutLastYear,
    DureeTotalLastYear,
    DureeMoyenneLastYear,
    PicCommunicationLastYear,
    getVolumePresseLastYear,
    getBudgetBrutLastYear,
    SupportDiffusion,
    SupportDiffusionLastYear,
    getSupportDiffusion,
    getSupportDiffusionLastYear,
    AnnonceursActif,
    AnnonceursActifLastYear,
    getAnnonceursActifLastYear,
    CreationUniques,
    getCreationUniquesLastYear,
    CreationUniquesLastYear,
    BudgetBrut,
    SupportDiffusionMedia,
    Couleur,
    NoireBlanc,
    getAnnonceursActifPresse,
    getAnnonceursActif,
    BudgetBrutMedia,

    getBudgetBrut,


    DureeTotal,
    PicCommunication,

    getDureeTotalDiffusion,
    getDureeTotalMoyenne,
    DureeMoyenne,
    getPicCommunication,

    getPrtMarchet,
    getVolumePresse,
    getTop20Annonceurs,
    getCreationUniques,
    getBudgetBrutPresse,


    getDureeTotalDiffusionLastYear,
    getDureeTotalMoyenneLastYear,
    getPicCommunicationLastYear,
    getCouleur,
    getTop20famillesSectorielles,


    getVolume,
    getVolumelastyear,
    getTop20Marques,
    getTop20Produits,
    getRepartitionFormat,
    getAnnonceursParSupport,
    getCreationParAnnonceur,
    loadingCalcul,
    CouleurLastYear,
    NoireBlancLastYear,
    getCouleurLastYear,
    DiffusionParCreation,
    getDiffusionParCreation,
    DiffusionParCreationLastYear,
    getDiffusionParCreationLastYear,
    getRepartitionParType,
    getRepartitionParVersion,
    loadingMarche,
    BudgetExact
  } = UsePigeDashboardStore((state) => state)
  const { countLastYear, count, getPigeCount,
    getPigeCountLastYear, CountInK, CountInKLastYear,CountBrut, } = UseCountStore((state) => state)
  const { autoriseDash, client, email,
    LougoutRestErrorMessages,
    LoginWithParamToken,
    StoreParamToken,
    ExpirationToken
  } = UseLoginStore((state) => state)
  const {
    Filtersupports,
    Filterclassesids,
    supports,
    familles,
    annonceurs,
    Filterfamilles,
    marques,
    Filtersecteursids,
    Filtervarietiesids,
    Filterannonceursids,
    Filtermarquesids,
    Filtermarques,
    Filterproduitsids,
    media,
    rangs,
    base,
    date1,
    date2,
    date3,
    date4,
    setDateRangLast,
    setRangFilter,
    setMediaValue,
    getFilters,
    ManageSideBarfilterDisplay,
    SideBarFilterPosition,
    sideBarFilterPosition,
    ErrorFetchFilter,
    messageFilterError,
    HandeErrorFetchFiletrs,
    FilterLoading
  } = UseFiltersStore((state) => state)
  const { getDataMedia, HandelErrorPopup, ErrorHandel } = UseMediaDashboardStore((state) => state)
  const [show, setShow] = useState(false)
  const [dashDisplay, setDashDisplay] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const [fetchDataTime, setFetchDataTime] = useState(0)
  const [dashboardIllustration, setDashboardIllustration] = useState(true)
  const [dataExist, setDataExist] = useState(true)
  const [loadingStep, setLoadingStep] = useState(0.5)
  const [fetchFilter, setFetchFilter] = useState(false)

  const ShowDashboardData = async () => {
    setIsCalculating(true)
    setDashboardIllustration(false)
    setShow(true)
    setLoadingPDF30sec(true)
    setTimeout(() => {
      setLoadingPDF30sec(false);
    }, 70000);
    // 30 seconds
    const startTime = new Date().getTime();

    await Promise.all([
      getCreationUniques && getCreationUniques(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date1,
        date2,
        media,
        email,
        "creationunique"),
      getCreationUniquesLastYear && getCreationUniquesLastYear(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date3,
        date4,
        media,
        email,
        "creationunique"),
      getBudgetBrut && getBudgetBrut(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date1,
        date2,
        media,
        email,
        "budget"),
      getBudgetBrutLastYear && getBudgetBrutLastYear(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date3,
        date4,
        media,
        email,
        "budget"),
      getSupportDiffusion && getSupportDiffusion(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date1,
        date2,
        media,
        email,
        "supportdiffusion"),
      getSupportDiffusionLastYear && getSupportDiffusionLastYear(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date3,
        date4,
        media,
        email,
        "supportdiffusion"),

      getAnnonceursActif && getAnnonceursActif(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date1,
        date2,
        media,
        email, "annonceuractif"),
      getDiffusionParCreation && getDiffusionParCreation(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date1,
        date2,
        media,
        email,
        "diffusionparcreation",
        base,
      ),
      getDiffusionParCreationLastYear && getDiffusionParCreationLastYear(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date3,
        date4,
        media,
        email,
        "diffusionparcreation",
        base,
      ),
      getAnnonceursActifLastYear && getAnnonceursActifLastYear(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date3,
        date4,
        media,
        email,
        "annonceuractif"),

    ])
    getEvolutionData && getEvolutionData(
      Filtersupports,
      Filterfamilles,
      Filterclassesids,
      Filtersecteursids,
      Filtervarietiesids,
      Filterannonceursids,
      Filtermarquesids,
      Filterproduitsids,
      date1,
      date2,
      media,
      email,
      "evolution",
      base,
    )
    getEvolutionDataLast && getEvolutionDataLast(
      Filtersupports,
      Filterfamilles,
      Filterclassesids,
      Filtersecteursids,
      Filtervarietiesids,
      Filterannonceursids,
      Filtermarquesids,
      Filterproduitsids,
      date3,
      date4,
      media,
      email,
      "evolution",
      base,
    )
    if (media === 'presse' && !isCalculating) {
      getCouleur && getCouleur(
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date1,
        date2,
        media,
        email,
        "couleur"
      )
      getCouleurLastYear && getCouleurLastYear(Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date3,
        date4,
        media,
        email,
        "couleur")
    } else {
      getDureeTotalDiffusion && getDureeTotalDiffusion(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date1,
        date2,
        media,
        email,
        "dureetotal")
      getDureeTotalDiffusionLastYear && getDureeTotalDiffusionLastYear(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date3,
        date4,
        media,
        email,
        "dureetotal")
      getDureeTotalMoyenne && getDureeTotalMoyenne(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date1,
        date2,
        media,
        email,
        "dureemoyenne")
      getDureeTotalMoyenneLastYear && getDureeTotalMoyenneLastYear(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date3,
        date4,
        media,
        email,
        "dureemoyenne"
      )
      getPicCommunication && getPicCommunication(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date1,
        date2,
        media,
        email,
        "piccommunication")
      getPicCommunicationLastYear && getPicCommunicationLastYear(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date3,
        date4,
        media,
        email,
        "piccommunication")
      getRepartitionParType && getRepartitionParType(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date1,
        date2,
        media,
        email,
        "type",
        base,

      )
    }
    //pour tout types de media
    await Promise.all([
      getPigeCount && getPigeCount(email,
        media,
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date1,
        date2),
      getPigeCountLastYear && getPigeCountLastYear(
        email,
        media,
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date3,
        date4,
      ),
      getAnnonceursActif && getAnnonceursActif(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date1,
        date2,
        media,
        email,
        "annonceuractif",
        base),
      getTop20famillesSectorielles && getTop20famillesSectorielles(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date1,
        date2,
        media,
        email,
        "top20famille",
        base),
      getTop20Annonceurs && getTop20Annonceurs(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date1,
        date2,
        media,
        email,
        "top20annonceur",
        base),
      getPrtMarchet && getPrtMarchet(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date1,
        date2,
        media,
        email,
        "repartitionmarche",
        base),
      getTop20Marques && getTop20Marques(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date1,
        date2,
        media,
        email,
        "top20marque",
        base),
      getTop20Produits && getTop20Produits(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date1,
        date2,
        media,
        email,
        "top20produit",
        base),
      getRepartitionFormat && getRepartitionFormat(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date1,
        date2,
        media,
        email,
        "repartitionformat",
        base),
      getAnnonceursParSupport && getAnnonceursParSupport(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date1,
        date2,
        media,
        email,
        "annonceurparsupport",
        base),
      getCreationParAnnonceur && getCreationParAnnonceur(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date1,
        date2,
        media,
        email,
        "creationparannonceur",
        base),
      getRepartitionParVersion && getRepartitionParVersion(
        Filtersupports,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        Filtervarietiesids,
        Filterannonceursids,
        Filtermarquesids,
        Filterproduitsids,
        date1,
        date2,
        media,
        email,
        "repartitionversion",
        base,

      )
    ])
    setIsCalculating(false)
    const endTime = new Date().getTime();
    setFetchDataTime(endTime - startTime);
    setDashDisplay(true)
    if (Top20produits?.length === 0) {
      setDataExist(true)
    } else {
      setDataExist(false)
    }
    setTimeout(() => {
      setLoadingStep(fetchDataTime / 100)
    }, fetchDataTime);
  }
  useEffect(() => {
    setLoadingPDF30sec(true)
    if (dashDisplay) {
      setTimeout(() => {
        setLoadingPDF30sec(false);
      }, 70000);
    }

  }, [loadingMarche, MarcheOptions])


  useEffect(() => {
    if (Number(count) === 0) {
      HandelErrorPopup && HandelErrorPopup(true)
    } else {
      //do nothing 
    }
  }, [Number(count)])
  const handeToggleSideBar = () => {
    ManageSideBarfilterDisplay('-100%');
  }

  const handeOpenSideBar = () => {
    if (fetchFilter === true) {
      //console.log("calling filters",fetchFilter)
      getFilters && getFilters(email, media, date1, date2)
      setTimeout(() => {
        ManageSideBarfilterDisplay && ManageSideBarfilterDisplay("0%")
      }, 5000);
      setFetchFilter(false)
    } else {
      //do nothing
      ManageSideBarfilterDisplay && ManageSideBarfilterDisplay("0%")
    }
    //setLoadingFilters(true)

  }
  useEffect(() => {
    setFetchFilter(true)
    setDashboardIllustration(true)
    setPdfIsCreated(false)
    setIsCalculating(false)
    setShow(false)
    setDataExist(true)
  }, [media, date1, date2])

  const [resStyle, setResStyle] = useState({
    FlexDirection: 'row',
    back: '',
    width: "50%",
    widthRightbtns: '',
    paddingLeftBtn: "0px",
    widthLefbtnWrapper: '',
    justifyContentRightBtnWrapper: '',
    marginTopAll: '15vh',
    flexWrap: "nowrap",
    marginBtm: "0px"
  });
  useEffect(() => {
    const handleResize = () => {
      setResStyle({
        FlexDirection: window.innerWidth < 900 ? 'column' : 'row',
        FlexDirection: 628 < window.innerWidth < 900 ? 'row' : 'row',
        back: window.innerWidth < 900 ? 'red' : 'yellow',
        width: window.innerWidth < 900 ? '100%' : '50%',
        widthRightbtns: window.innerWidth < 900 ? '100%' : 'fit-content',
        flexWrap: window.innerWidth < 900 ? 'wrap' : 'nowrap',
        paddingLeftBtn: window.innerWidth < 900 ? '10px' : '0px',
        widthLefbtnWrapper: window.innerWidth < 900 ? '100%' : '',
        justifyContentRightBtnWrapper: window.innerWidth < 900 ? 'space-between' : 'center',
        marginTopAll: window.innerWidth < 900 ? '16vh' : '15vh',
        marginBtm: window.innerWidth < 900 ? '10px' : '0px',
        heightSeperator: window.innerWidth < 900 ? '20px' : '0px',
        alignItems: window.innerWidth < 900 ? 'end' : '',
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [pdfIsCreated, setPdfIsCreated] = useState(false)
  const [success, setSuccess] = useState(false);

  const [loadingPDF, setLoadingPDF] = useState(false)

  const exportToPDF = async () => {
    setLoadingPDF(true);
    const dashboardElement = document.getElementById("dashboard");
    // Get the dashboard element
    if (!dashboardElement) {
      console.error("Dashboard element not found");
      return;
    }
    // Define the sections by their IDs
    let temporaryElement = dashboardElement;
    const sectionIds = ["evolution", "sectionwidget", "section2",
      "section3", "section4", "section5", "repartitionmarche",
      "repartitionformat",
      "type",
      "repartitionversion",
    ];
    // Loop through each section ID
    sectionIds.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (!section) {
        console.warn(`Section ${sectionId} not found. Skipping...`);
        return;
      }

      if (sectionId == "sectionwidget") {
        // Create a new div
        const tempDiv = document.createElement("div");
        const newDiv = document.getElementById("empty_to_inject_pdf_home_page");
        tempDiv.id = `temp-div-${sectionId}`;
        newDiv.innerHTML = `
       <div style="background-color: #020b42; color: white;
         padding: 20px; text-align: center; height: 1000px;
         display: flex; flex-direction: column; justify-content: flex-start; align-items: center;
         font-family: 'Figtree', serif !important;width: 1423px;">
  
  <!-- Logo -->
  <img src="${logo}" style="width: 140px; height: 100px; margin-bottom: 10px;" />

  <!-- Title -->
  <h1 style="font-size: 32px; margin-bottom: 5px;">Adtrics Review</h1>
  <h3 style="font-size: 20px; font-weight: normal; margin-bottom: 20px;">${date1} / ${date2}</h3>

  <!-- Table -->
  <table style="margin: 20px auto; border-collapse: collapse; width: 85%;
                text-align: left; font-family: Arial, sans-serif; font-size: 18px;
                background-color: rgba(255, 255, 255, 0.1); border-radius: 10px; overflow: hidden;">
    <tbody>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #ddd; font-weight: bold; width: 30%;">Media:</td>
        <td style="padding: 12px; border-bottom: 1px solid #ddd;">${media == "television" ? "Télévision" :
            media == "presse" ? "Presse" : media == "radio" ? "Radio" : ""}</td>
      </tr>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #ddd; font-weight: bold;">Famille:</td>
        <td style="padding: 12px; border-bottom: 1px solid #ddd;">${Filterfamilles.length === 0
            ? "tout"
            : (familles?.filter(e => Filterfamilles.includes(e.Famille_Id)) // Filter matching IDs
              .map(e => e.Famille_Lib) // Extract the 'Famille_Lib' property
              .join(", ") || "")}</td>
      </tr>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #ddd; font-weight: bold;">Supports:</td>
        <td style="padding: 12px; border-bottom: 1px solid #ddd;">${Filtersupports.length === 0
            ? "tout"
            : (supports?.filter(e => Filtersupports.includes(e.Support_Id)) // Filter matching IDs
              .map(e => e.Support_Lib) // Extract the 'Support_Lib' property
              .join(", ") || "")}</td>
      </tr>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #ddd; font-weight: bold;">Marque:</td>
        <td style="padding: 12px; border-bottom: 1px solid #ddd;">${Filtermarques.length === 0 ? "tout " : Filtermarques.length}</td>
      </tr>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #ddd; font-weight: bold;">Annonceurs:</td>
        <td style="padding: 12px; border-bottom: 1px solid #ddd;">${Filterannonceursids.length === 0 ? "tout" : Filterannonceursids.length}</td>
      </tr>
    </tbody>
  </table>
</div>
      `;
        // Set the width, height, and background color for the div
        tempDiv.style.width = "1000px"; // Fixed width of 1000px
        tempDiv.style.height = "500px"; // Fixed height of 500px
        tempDiv.style.backgroundColor = "020b42"; // Red background color

        // Optionally, add some additional styling for visibility
        tempDiv.style.marginTop = "10px"; // Add spacing between sections and divs
        tempDiv.style.border = "1px solid #020b42"; // Optional border

        // Insert the div after the current section
        section.parentNode.insertBefore(tempDiv, section.nextElementSibling);
        //section.parentNode.insertBefore(newDiv, section.nextElementSibling);
      } else if (sectionId == "section2") {
        const tempDiv = document.createElement("div");
        // Set the width, height, and background color for the div
        tempDiv.style.width = "1000px"; // Fixed width of 1000px
        tempDiv.id = `temp-div-${sectionId}`;
        tempDiv.style.height = "525px"; // Fixed height of 500px
        tempDiv.style.backgroundColor = "#020b42"; // Red background color

        // Optionally, add some additional styling for visibility
        tempDiv.style.marginTop = "10px"; // Add spacing between sections and divs
        tempDiv.style.border = "1px solid #020b42"; // Optional border

        // Insert the div after the current section
        section.parentNode.insertBefore(tempDiv, section.nextElementSibling);

        //back to section 5 and 6 to remoove decalage
      } else if (sectionId == "section5") {
        const tempDiv = document.createElement("div");
        tempDiv.id = `temp-div-${sectionId}`;
        // Set the width, height, and background color for the div
        section.height = section.offsetHeight - 503
        section.height = section.offsetHeight
        tempDiv.style.width = "1000px"; // Fixed width of 1000px
        tempDiv.style.height = "200px";
        tempDiv.style.backgroundColor = "#020b42"; // Red background color
        tempDiv.style.marginTop = "10px"; // Add spacing between sections and divs
        tempDiv.style.border = "1px solid #020b42"; // Optional border
        // Insert the div after the current section
        section.parentNode.insertBefore(tempDiv, section.nextElementSibling);
        //section.innerHTML=`<h1>IKRAM IS HEARE</h1>`

      } else if (sectionId == "section6") {
        const tempDiv = document.createElement("div");
        tempDiv.id = `temp-div-${sectionId}`;
        // Set the width, height, and background color for the div
        section.height = section.offsetHeight - 503
        section.height = section.offsetHeight
        tempDiv.style.width = "1000px"; // Fixed width of 1000px
        tempDiv.style.height = "200px";
        tempDiv.style.backgroundColor = "#020b42"; // Red background color
        tempDiv.style.marginTop = "10px"; // Add spacing between sections and divs
        tempDiv.style.border = "1px solid #020b42"; // Optional border
        // Insert the div after the current section
        section.parentNode.insertBefore(tempDiv, section.nextElementSibling);
        //section.innerHTML=`<h1>IKRAM IS HEARE</h1>`

      } else if (sectionId == "repartitionmarche") {
        const imageurl = sessionStorage.getItem('repartitionmarche')
        section.height = section.offsetHeight
        section.style.backgroundImage = `url(${imageurl})`
        section.style.backgroundSize = 'cover'
        section.style.backgroundRepeat = "no-repeat"
        section.style.backgroundPosition = "center"
      } else if (sectionId == "repartitionformat") {
        const imageurl = sessionStorage.getItem('repartitionformat')
        section.height = section.offsetHeight
        section.style.backgroundImage = `url(${imageurl})`
        section.style.backgroundSize = 'cover'
        section.style.backgroundRepeat = "no-repeat"
        section.style.backgroundPosition = "center"
      } else if (sectionId == "type") {
        const imageurl = sessionStorage.getItem('type')
        section.height = section.offsetHeight
        section.style.backgroundImage = `url(${imageurl})`
        section.style.backgroundSize = 'cover'
        section.style.backgroundRepeat = "no-repeat"
        section.style.backgroundPosition = "center"
      } else if (sectionId == "repartitionversion") {
        const imageurl = sessionStorage.getItem('repartitionversion')
        section.height = section.offsetHeight
        section.style.backgroundImage = `url(${imageurl})`
        section.style.backgroundSize = 'cover'
        section.style.backgroundRepeat = "no-repeat"
        section.style.backgroundPosition = "center"
      } else if (sectionId == "section4") {
        const tempDiv = document.createElement("div");
        // Set the width, height, and background color for the div
        tempDiv.style.width = "1000px"; // Fixed width of 1000px
        tempDiv.style.height = "200px"; // Fixed height of 500px
        tempDiv.id = "standard_id";
        tempDiv.style.backgroundColor = "#020b42"; // Red background color
        // Optionally, add some additional styling for visibility
        tempDiv.style.marginTop = "10px"; // Add spacing between sections and divs
        // Insert the div after the current section
        section.parentNode.insertBefore(tempDiv, section.nextElementSibling);
      }
      else {
        const tempDiv = document.createElement("div");
        // Set the width, height, and background color for the div
        tempDiv.style.width = "1000px"; // Fixed width of 1000px
        tempDiv.style.height = "500px"; // Fixed height of 500px
        tempDiv.id = "standard_id";
        tempDiv.style.backgroundColor = "#020b42"; // Red background color
        // Optionally, add some additional styling for visibility
        tempDiv.style.marginTop = "10px"; // Add spacing between sections and divs
        // Insert the div after the current section
        section.parentNode.insertBefore(tempDiv, section.nextElementSibling);
      }
    });

    if (!dashboardElement) {
      console.error("Dashboard element not found");
      return;
    } else {
      dashboardElement.style.backgroundColor = "#020b42";

    }

    // Initialize jsPDF
    const pdf = new jsPDF({
      orientation: "landscape", // Set orientation to landscape
      unit: "mm",
      format: "a4",
    });

    // Get PDF page dimensions
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    //console.log("width pdfWidth", pdfWidth, "pdfHeight", pdfHeight)

    const viewportHeight = window.innerHeight;
    //console.log("viewportHeight", viewportHeight)

    const scrollStep = pdfHeight * 3.78 + 200;
    const totalHeight = dashboardElement.scrollHeight;

    //console.log("totalHeight", totalHeight)
    let yPosition = 0; // Starting position for scrolling
    let pageNumber = 1;

    const captureSection = async () => {
      return new Promise((resolve) => {
        // Scroll to the current position
        dashboardElement.scrollTop = yPosition;

        // Create a temporary container to isolate the current section
        const tempContainer = document.createElement("div");
        tempContainer.style.position = "relative";
        tempContainer.style.width = `${dashboardElement.scrollWidth}px`;
        tempContainer.style.height = `${Math.min(scrollStep, totalHeight - yPosition)}px`;

        // Clone the dashboard content and clip it to the current section
        const clonedContent = dashboardElement.cloneNode(true);
        clonedContent.style.transform = `translateY(-${yPosition}px)`;
        clonedContent.style.clipPath = `inset(${yPosition}px 0px ${totalHeight - yPosition - Math.min(scrollStep, totalHeight - yPosition)}px 0px)`;

        tempContainer.appendChild(clonedContent);

        // Append the temporary container to the body (hidden)
        document.body.appendChild(tempContainer);

        // Use html2canvas to capture the isolated section
        html2canvas(tempContainer, {
          scale: 2, // Increase resolution for better quality
          useCORS: true, // Enable CORS for external images
          logging: false, // Optional: Log progress for debugging
        })
          .then((canvas) => {
            // Remove the temporary container
            document.body.removeChild(tempContainer);

            const imgData = canvas.toDataURL("image/png");
            pdf.setFillColor(2, 11, 66); // RGB values for #020b42
            pdf.rect(0, 0, pdfWidth, pdfHeight, "F");
            // Add the captured section to the PDF
            const imgProps = pdf.getImageProperties(imgData);
            const pageWidthRatio = pdfWidth / imgProps.width;
            const pageHeightRatio = imgProps.height * pageWidthRatio;

            // If the section height exceeds the PDF page height, scale it down
            if (pageHeightRatio > pdfHeight) {
              const scaleFactor = pdfHeight / pageHeightRatio;
              pdf.addImage(
                imgData,
                "PNG",
                0,
                0,
                pdfWidth * scaleFactor,
                pdfHeight
              );
            } else {
              pdf.addImage(
                imgData,
                "PNG",
                0,
                0,
                pdfWidth,
                pageHeightRatio
              );
            }

            // Add a new page if there's more content to capture
            if (yPosition + scrollStep < totalHeight) {
              pdf.addPage(); // Add a new page
              pageNumber++;
              yPosition += scrollStep;
              resolve(captureSection()); // Recursively capture the next section
            } else {
              resolve(); // Finish capturing
            }
          })
          .catch((error) => {
            console.error("Error capturing section:", error);
            resolve(); // Stop capturing on error
          });
      });
    };

    // Start capturing sections
    captureSection()
      .then(() => {
        // Save the PDF after all sections are captured
        pdf.save(`Media_Review_${date1}_${date2}.pdf`)
        setLoadingPDF(false);
        const removeDiv = document.getElementById('temp-div-sectionwidget')
        const remove2 = document.getElementById('empty_to_inject_pdf_home_page')
        const remove3 = document.getElementById('temp-div-section2')
        const remove5 = document.getElementById('temp-div-section5')
        const remove6 = document.getElementById('temp-div-section6')
        const remove7 = document.getElementById('standard_id')
        const remove8 = document.getElementById('repartitionmarche')
        const remove9 = document.getElementById('repartitionformat')
        const remove10 = document.getElementById('type')
        const remove11 = document.getElementById('repartitionversion')
        //console.log("repartitionversion", remove11)
        removeDiv.remove()
        remove2.innerHTML = ""
        window.location.reload()
        // remove3.remove()
        // remove5.remove()
        // remove6.remove()
        // remove7.remove()
        // remove8.style.backgroundImage("")
        // remove9.style.backgroundImage("")
        // remove10.style.backgroundImage("")
        // remove11.style.backgroundImage("")
      })
      .catch((error) => {
        //console.error("Error during PDF generation:", error);
      });
  };

  const test = () => {
    getCouleurLastYear && getCouleurLastYear(
      Filtersupports,
      Filterfamilles,
      Filterclassesids,
      Filtersecteursids,
      Filtervarietiesids,
      Filterannonceursids,
      Filtermarquesids,
      Filterproduitsids,
      date3,
      date4,
      media,
      email,
      base,
    )
    console.log("count last year", {
      Filtersupports,
      Filterfamilles,
      Filterclassesids,
      Filtersecteursids,
      Filtervarietiesids,
      Filterannonceursids,
      Filtermarquesids,
      Filterproduitsids,
      date3,
      date4,
      media,
      email,
    })
  }
  useEffect(() => {
    var decoded = jwtDecode(ParamToken.token);
    const currentTime = Math.floor(Date.now() / 1000);
    const isExpired = decoded.exp < currentTime;
    if (isExpired) {
      window.location.href = 'https://adtrics.immar.dz/#/login';
      LougoutRestErrorMessages && LougoutRestErrorMessages(email)
    } else {
    }
  }, [date1, date2, media, base,

  ])
  useEffect(() => {
    if (!client) {
    }
  }, [client])

  if (!autoriseDash && client) {
    return (
      <Container
        fluid
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          backgroundColor: "#f8f9fa",
          textAlign: "center",
          borderRadius: "5px",
          height: "40vh",
          marginTop: "12%"
        }}
      >
        <Row
          className="responsive-row"
          style={{
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <b style={{ color: "#00a6e0" }}>
            vous n'êtes pas abonnés</b>

        </Row>
      </Container>)
  }
  const handleClosePopupDataUnavailable = () => {
    HandelErrorPopup && HandelErrorPopup(false)
  }
  const [showldate, setShowldate] = useState(false)
  const handelShowSecondDatePicker = () => {
    setShowldate(!showldate)
  }

  return (
    <div style={{
      height: "auto", width: "100%",
      paddingTop: "1%",
      marginTop: resStyle.marginTopAll,
      marginBottom: resStyle.marginTopAll,
    }}
      id="dashboard"
    >
      <div id="empty_to_inject_pdf_home_page"></div>
      {/* <Button onClick={test}>TEST</Button> */}
      <Container fluid style={{ display: "flex", flexDirection: "column" }} id="section0" >
        <Row className="mt-3" style={{
          display: "flex",
          alignItems: "center", width: '100%',
          justifyContent: 'space-between',
          marginLeft: "0px",
          marginLeft: '0px'
        }}>
          <Col style={{
            paddingRight: "0px", paddingLeft: "0px", paddingRight: "0px"
          }}>
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "center", width: resStyle.widthRightbtns,
              flexDirection: resStyle.FlexDirection,
              flexWrap: resStyle.flexWrap
            }}>
              <div style={{
                display: 'flex', width: resStyle.widthRightbtns,
                justifyContent: "space-between",
                marginBottom: resStyle.marginBtm,
              }}>
                <MultipleSelectMedia />
                <MultipleSelectBase />
              </div>
              <div style={{
                display: "flex",
                justifyContent: "center", alignItems: "center"
              }}>


                <DateRangeTest />
                <Button onClick={handelShowSecondDatePicker} sx={{
                  backgroundColor: "white",
                  width: '50px', marginLeft: "2px",
                  marginRight: "2px",
                  fontSize:"20px",
                  fontWeight:"bold",
                  height: "40px",
                  '&:hover': {
                    backgroundColor: '#00a6e0',
                  },
                }}>VS</Button>

                {showldate && (<DateRange2 />)}

              </div>
            </div>

          </Col>
          <Col style={{ paddingLeft: "0px", paddingRight: "0px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
              <div style={{
                display: 'flex',
                flexDirection: resStyle.FlexDirection,
                alignItems: resStyle.alignItems,
                width: resStyle.widthRightbtns,
                justifyContent: "space-between",
                marginBottom: resStyle.marginBtm,
                marginTop: resStyle.marginBtm,
                paddingRight: "0px",
                paddingLeft: "0px",


              }}>
                <LoadingButtonData
                  getData={ShowDashboardData}
                  isloading={isCalculating}
                  isSucces={false}
                  title="Afficher"
                  mr="10px"
                  disablebtn={(media == "" || base == "")}
                />
                <LoadingButtonData
                  getData={exportToPDF}
                  isloading={loadingPDF}
                  isSucces={false}
                  title={<div>
                    <FileDownIcon />
                  </div>}
                  mr="10px"
                  disablebtn={loadingPDF30sec}
                />

                {/* <div style={{ width: "20px", height: resStyle.heightSeperator }}>

                </div> */}
                <LoadingButtonData
                  getData={handeOpenSideBar}
                  isloading={FilterLoading}
                  isSucces={false}
                  title={window.innerWidth < 900 ? <div style={{
                    // transform: "rotate(90deg)", 
                    fontWeight: "bold"
                  }}>
                    <FilterIcon />
                  </div> : <div
                    style={{ fontWeight: "400" }}>
                    {/* Recherche avancée */}
                    <FilterIcon />
                  </div>}
                  mr="0px"
                  disablebtn={(media == "" || base == "")}
                />

              </div>

            </div>

          </Col>
        </Row>

        {show && (<div onClick={() => handeToggleSideBar()}>
          <Row className="" >
            {isCalculating && (<LoadingIndicator step={loadingStep}
              totalDuration={fetchDataTime} />)}
          </Row>
          <div id="all">
            {(dashDisplay && !isCalculating &&
              !(Top20produits?.length === 0)) && (<div style={{ width: '100%' }}>
                <div >
                  <Row className="mt-3" id="sectionwidget" style={{ marginTop: 20 }}  >
                    {/* <WidgetShadcn                   
                    /> */}
                    <Widget
                      icon={iconVolume}
                      value={CountInK}
                      title="Volume publicitaire"
                      valueLastYear={CountInKLastYear}
                      exactvalue={CountBrut}
                      unite={" " + CountInK.split(' ')[1]}
                    />
                    <Widget
                      icon={iconAnnonceur}
                      value={AnnonceursActif}
                      title="Annonceurs actifs"
                      valueLastYear={AnnonceursActifLastYear}
                    />
                    <Widget
                      icon={iconCreation}
                      value={CreationUniques}
                      title="Creations uniques"
                      valueLastYear={CreationUniquesLastYear}
                    />
                    <Widget
                      icon={iconBudget}
                      value={BudgetBrut}
                      unite={" " + BudgetBrut.split(' ')[1]}
                      exactvalue={BudgetExact}
                      title="Budget Brut"
                      valueLastYear={BudgetBrutLastYear}
                     
                    />                  
                    <Widget
                      icon={iconSupprt}
                      value={SupportDiffusion}
                      title="Support de diffusion"
                      valueLastYear={SupportDiffusionLastYear}
                    />
                    <Widget
                      icon={DiffuIcon}
                      value={DiffusionParCreation}
                      title="Diffusion par Création"
                      valueLastYear={DiffusionParCreationLastYear}
                    />
                    {(media === 'presse') && (
                      <WidgetPresse
                        icon={iconPresse}
                        value={`${Couleur}/${NoireBlanc}`}
                        title="Couleur/Noir et Blanc"
                        valueLastYear={`${CouleurLastYear}/${NoireBlancLastYear}`}
                      />
                    )}
                    {(media === "radio" || media === "television") &&
                      <>
                        <Widget
                          icon={iconDuree}
                          value={DureeTotal}
                          unite={" " + DureeTotal?.split(' ')[1]}
                          title="Durée Pub Totale"
                          valueLastYear={DureeTotalLastYear}
                        />
                        <Widget
                          icon={iconTime}
                          value={DureeMoyenne}
                          unite={" " + DureeMoyenne?.split(' ')[1]}
                          title="Durée moyenne/spot"
                          valueLastYear={DureeMoyenneLastYear}
                        />
                        <Widget
                          icon={iconPis}
                          valuepic={`${PicCommunication?.interval_start.slice(0, -3)} à 
                          ${PicCommunication?.interval_end.slice(0, -3)}`}
                          value={PicCommunication?.count}
                          title="Pic publicitaire"
                          valueLastYear={`${PicCommunicationLastYear?.interval_start.slice(0, -3)} 
                          à ${PicCommunicationLastYear?.interval_end.slice(0, -3)}`}
                        />
                      </>
                    }

                  </Row>

                  <GridDemo date1={date1} date2={date2} media={media} base={base} />
                </div>
              </div>)}

            {(Top20produits?.length === 0 && !isCalculating) && (<Container
              fluid
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
                backgroundColor: "#f8f9fa",
                textAlign: "center",
                borderRadius: "5px",
                marginTop: "2%"
              }}
            >
              <Row
                className="responsive-row"
                style={{
                  padding: "20px",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <b style={{ color: "#00a6e0" }}>
                  Aucune données {media} n'as été enregistrée. Veuillez changer la date. </b>

              </Row>
            </Container>)}
          </div>
        </div>)
        }
        {dashboardIllustration && (
          <div onClick={() => handeToggleSideBar()} style={{
            display: "flex", justifyContent: "center",
            width: "100%", alignItems: "center"
          }}>

            <img src={dash} alt="IMMAR DASHBOARD" style={{ width: "30%" }} />
          </div>)}

      </Container>
      <AutomaticSideFilterBar getData={ShowDashboardData} />
      <DataUnavailablePopup
        ErrorHandel={ErrorHandel}
        media={media}
        handleClosePopup={handleClosePopupDataUnavailable}
      />
      <NetworkErrorPopup
        OpenNetworkPopup={ErrorFetchFilter}
        handleCloseNetworkPopup={HandeErrorFetchFiletrs}
        message={messageFilterError}
      />

      <PdfCreationPopup
        OpenNetworkPopup={loadingPDF}

        message='Veuillez patienter, la création de votre rapport sera effectuée 
          dans quelques instants'
      />


    </div>

  );
}

export default Dashboard;
