import React, { useEffect, useState, useRef } from "react";
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
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import {
  Container,
  Row,
  Col
} from "react-bootstrap";
import { Button } from "@mui/material";
import DateRangeTest from 'components/Commun/DateRangePickerTest'
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import { CircularProgress } from '@mui/material';
import { UseLoginStore } from "store/dashboardStore/useLoginStore";
import DataUnavailablePopup from "components/Commun/popups/DataUnavailable";
import { NetworkErrorPopup } from "components/Commun/popups";
import { UseCountStore } from "store/dashboardStore/UseCounts";
import { Widget, WidgetShadcn } from "components/Commun/DashboardWidgets/Widgets";
import { WidgetPresse } from "components/Commun/DashboardWidgets/WidgetPresse";
import { UseGraphStore } from "store/GraphStore";

function Dashboard() {
  const { getEvolutionData, EvolutionData } = UseGraphStore((state) => state)
  document.title = 'Tableau de bord'
  const history = useHistory()
  const {
    Top20produits,
    VolumePresse,
    VolumePresseLastYear,
    VolumeMedia,
    VolumeMediaLastyear,
    BudgetBrutLastYear,
    DureeTotalLastYear,
    DureeMoyenneLastYear,
    PicCommunicationLastYear,

    getVolumePresseLastYear,
    getBudgetBrutLastYear,


    getAnnonceursActifPresseLastYear,

    SupportDiffusion,
    SupportDiffusionLastYear,
    getSupportDiffusion,
    getSupportDiffusionLastYear,
    SupportDiffusionMediaLastYear,

    AnnonceursActif,
    AnnonceursActifLastYear,
    AnnonceursActifMediaLastYear,
    getAnnonceursActifLastYear,
    AnnonceursActifMedia,


    CreationUniques,
    getCreationUniquesLastYear,
    CreationUniquesLastYear,
    CreationUniquesMedia,

    CreationUniquesMediaLastYear,
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
    RepartitionParType,
    isloadingRepatitionType,
    getRepartitionParType,

  } = UsePigeDashboardStore((state) => state)

  const { countLastYear, count, getPigeCount,
    getPigeCountLastYear } = UseCountStore((state) => state)
  const { autoriseDash, client, email, LougoutRestErrorMessages } = UseLoginStore((state) => state)
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
  const [supportnames, setSupportnames] = useState([])
  const [famillenames, setFamillenames] = useState([])
  const [annonceurnames, setAnnonceurnames] = useState([])
  const [marquenames, setMarquenames] = useState([])
  const [fetchFilter, setFetchFilter] = useState(false)
  useEffect(() => {
    var selectedSupportnames = []
    //for ppt file
    if (media === 'presse') {
      const selectedSupportnames = []
      const selectedFamillenames = familles.filter((e) => Filterfamilles.includes(e.CodeFamille))
      const selectedAnnonceurnames = annonceurs.filter((e) => Filterannonceursids.includes(e.Annonceur_Id))
      const selectedMarquenames = marques.filter((e) => Filtermarques.includes(e.Marque_id))
      var selection = selectedSupportnames?.map((e) => e.support_name)
      setMarquenames(selectedMarquenames.map((e) => e.Marque_Lib))
      setFamillenames(selectedFamillenames.map((e) => e.Famille))
      //too large number we do not display it in ppt file
      setAnnonceurnames(selectedAnnonceurnames.map((e) => e.Annonceur_Nom))
      setSupportnames(selection)
    } else {
      const selectedSupportnames = supports.filter((e) => Filtersupports.includes(e.support_id))
      const selectedFamillenames = familles.filter((e) => Filterfamilles.includes(e.CodeFamille))
      const selectedAnnonceurnames = annonceurs.filter((e) => Filterannonceursids.includes(e.Annonceur_Id))
      const selectedMarquenames = marques.filter((e) => Filtermarques.includes(e.Marque_id))
      var selection = selectedSupportnames.map((e) => e.support_name)
      setMarquenames(selectedMarquenames.map((e) => e.Marque_Lib))
      setFamillenames(selectedFamillenames.map((e) => e.Famille))
      //too large number we do not display it in ppt file
      setAnnonceurnames(selectedAnnonceurnames.map((e) => e.Annonceur_Nom))
      setSupportnames(selection)
    }

  }, [Filtersupports, Filterfamilles, Filterannonceursids, Filtermarques])


  const ShowDashboardData = async () => {
    setIsCalculating(true)
    setDashboardIllustration(false)
    setShow(true)
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
        date1,
        date2,
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
        date1,
        date2,
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
        date1,
        date2,
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
        date1,
        date2,
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
        date1,
        date2,
        media,
        email,
        "annonceuractif"),
      getVolumePresseLastYear && getVolumePresseLastYear(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, date1, date2)
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
        date1,
        date2,
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
        date1,
        date2,
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
        date1,
        date2,
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
        date1,
        date2,
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
        date1,
        date2),
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
        base)
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
    marginTopAll: '2%',
    flexWrap: "nowrap",
    marginBtm: "0px"
  });
  useEffect(() => {
    const handleResize = () => {
      setResStyle({
        FlexDirection: window.innerWidth < 900 ? 'column' : 'row',
        back: window.innerWidth < 900 ? 'red' : 'yellow',
        width: window.innerWidth < 900 ? '100%' : '50%',
        widthRightbtns: window.innerWidth < 900 ? '100%' : 'fit-content',
        flexWrap: window.innerWidth < 900 ? 'wrap' : 'nowrap',
        paddingLeftBtn: window.innerWidth < 900 ? '10px' : '0px',
        widthLefbtnWrapper: window.innerWidth < 900 ? '100%' : '',
        justifyContentRightBtnWrapper: window.innerWidth < 900 ? 'space-between' : 'center',
        marginTopAll: window.innerWidth < 900 ? '12vh' : '2%',
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
  
const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });
  
  const exportToPDF = () => {
    history.push("/pdf/rapport")
    // setPdfIsCreated(true);

    // const container0 = document.getElementById('dashboard');
    // container0.style.backgroundColor = "#020b42";
    // const container7 = document.querySelector('.top20familles');
    // container7 ? container7.style.backgroundColor = "#020b42" : container7;
    // const container8 = document.querySelector('.top20annonceur');
    // container8.style.backgroundColor = "#020b42";
    // const container3 = document.querySelector('.top20produit');
    // container3.style.backgroundColor = "#020b42";
    // const container4 = document.querySelector('.top20marque');
    // container4.style.backgroundColor = "#020b42";
    // const container2 = document.querySelector('.repartitionmarche');
    // container2.style.backgroundColor = "#020b42";
    // const container1 = document.querySelector('.repartitionformat');
    // container1.style.backgroundColor = "#020b42";
    // const container5 = document.querySelector('.annonceurparsupport');
    // container5.style.backgroundColor = "#020b42";
    // const container6 = document.querySelector('.creationparannonceur');
    // container6.style.backgroundColor = "#020b42";
    // const container9 = document.querySelector('.type');
    // container9.style.backgroundColor = "#020b42";
    // const pdf = new jsPDF('l', 'mm', 'a4'); // Landscape orientation
    // const pageWidth = 297;
    // const pageHeight = 210;
    // const leftMargin = 20;
    // const rightMargin = 10;
    // const topMargin = 10;
    // const bottomMargin = 10;

    // // Function to set background color for a page
    // const setPageBackgroundColor = (pdf, color) => {
    //   pdf.setFillColor(...color); // Set fill color (e.g., blue)
    //   pdf.rect(0, 0, pageWidth, pageHeight, 'F'); // Draw filled rectangle for background
    // };

    // // Add title page
    // pdf.addPage();
    // setPageBackgroundColor(pdf, [2, 11, 66]);


    // pdf.setFont('helvetica', 'bold');
    // pdf.setFontSize(50);
    // pdf.setTextColor("#ffffff"); // White text
    // pdf.text('Media Review', pageWidth / 2, topMargin + 10, { align: 'center' });

    // // Add individual pages for each chart
    // html2canvas(container0, { scale: 2 }).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const imgHeight = canvas.height * (pageWidth - leftMargin - rightMargin) / canvas.width;

    //   pdf.addPage();
    //   setPageBackgroundColor(pdf, [2, 11, 66]); // Set background color (blue)
    //   pdf.setFontSize(18);
    //   pdf.setFont('helvetica', 'bold');
    //   pdf.setTextColor("#ffffff"); // White text
    //   pdf.text('Vue d\'ensemble - indicateurs de pige', pageWidth / 2, topMargin + 10, { align: 'center' });
    //   pdf.addImage(imgData, 'PNG', leftMargin, topMargin + 20, pageWidth - leftMargin - rightMargin, imgHeight);
    // });

    // html2canvas(container1, { scale: 1 }).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const imgHeight = canvas.height * (pageWidth - leftMargin - rightMargin) / canvas.width;

    //   pdf.addPage();
    //   setPageBackgroundColor(pdf, [2, 11, 66]); // Set background color (blue)
    //   pdf.setFontSize(18);
    //   pdf.setFont('helvetica', 'bold');
    //   pdf.setTextColor("#ffffff"); // White text
    //   pdf.text('Top 20 familles sectorielles', pageWidth / 2, topMargin + 10, { align: 'center' });
    //   pdf.addImage(imgData, 'PNG', leftMargin, topMargin + 20, pageWidth - leftMargin - rightMargin, imgHeight);
    // });
    // html2canvas(container2, { scale: 1 }).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const imgHeight = canvas.height * (pageWidth - leftMargin - rightMargin) / canvas.width;

    //   pdf.addPage();
    //   setPageBackgroundColor(pdf, [2, 11, 66]); // Set background color (blue)
    //   pdf.setFontSize(18);
    //   pdf.setFont('helvetica', 'bold');
    //   pdf.setTextColor("#ffffff"); // White text
    //   pdf.text('Top 20 annonceurs', pageWidth / 2, topMargin + 10, { align: 'center' });
    //   pdf.addImage(imgData, 'PNG', leftMargin, topMargin + 20, pageWidth - leftMargin - rightMargin, imgHeight);
    // });
    // html2canvas(container3, { scale: 1 }).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const imgHeight = canvas.height * (pageWidth - leftMargin - rightMargin) / canvas.width;

    //   pdf.addPage();
    //   setPageBackgroundColor(pdf, [2, 11, 66]); // Set background color (blue)
    //   pdf.setFontSize(18);
    //   pdf.setFont('helvetica', 'bold');
    //   pdf.setTextColor("#ffffff"); // White text
    //   pdf.text('Top 20 annonceurs', pageWidth / 2, topMargin + 10, { align: 'center' });
    //   pdf.addImage(imgData, 'PNG', leftMargin, topMargin + 20, pageWidth - leftMargin - rightMargin, imgHeight);
    // });
    // html2canvas(container4, { scale: 1 }).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const imgHeight = canvas.height * (pageWidth - leftMargin - rightMargin) / canvas.width;

    //   pdf.addPage();
    //   setPageBackgroundColor(pdf, [2, 11, 66]); // Set background color (blue)
    //   pdf.setFontSize(18);
    //   pdf.setFont('helvetica', 'bold');
    //   pdf.setTextColor("#ffffff"); // White text
    //   pdf.text('Top 20 annonceurs', pageWidth / 2, topMargin + 10, { align: 'center' });
    //   pdf.addImage(imgData, 'PNG', leftMargin, topMargin + 20, pageWidth - leftMargin - rightMargin, imgHeight);
    // });
    // html2canvas(container5, { scale: 1 }).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const imgHeight = canvas.height * (pageWidth - leftMargin - rightMargin) / canvas.width;

    //   pdf.addPage();
    //   setPageBackgroundColor(pdf, [2, 11, 66]); // Set background color (blue)
    //   pdf.setFontSize(18);
    //   pdf.setFont('helvetica', 'bold');
    //   pdf.setTextColor("#ffffff"); // White text
    //   pdf.text('Top 20 annonceurs', pageWidth / 2, topMargin + 10, { align: 'center' });
    //   pdf.addImage(imgData, 'PNG', leftMargin, topMargin + 20, pageWidth - leftMargin - rightMargin, imgHeight);
    // });
    // html2canvas(container7, { scale: 2 }).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const imgHeight = canvas.height * (pageWidth - leftMargin - rightMargin) / canvas.width;

    //   pdf.addPage();
    //   setPageBackgroundColor(pdf, [2, 11, 66]); // Set background color (blue)
    //   pdf.setFontSize(18);
    //   pdf.setFont('helvetica', 'bold');
    //   pdf.setTextColor("#ffffff"); // White text
    //   pdf.text('Top 20 annonceurs', pageWidth / 2, topMargin + 10, { align: 'center' });
    //   pdf.addImage(imgData, 'PNG', leftMargin, topMargin + 20, pageWidth - leftMargin - rightMargin, imgHeight);
    // });
    // html2canvas(container8, { scale: 2 }).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const imgHeight = canvas.height * (pageWidth - leftMargin - rightMargin) / canvas.width;

    //   pdf.addPage();
    //   setPageBackgroundColor(pdf, [2, 11, 66]); // Set background color (blue)
    //   pdf.setFontSize(18);
    //   pdf.setFont('helvetica', 'bold');
    //   pdf.setTextColor("#ffffff"); // White text
    //   pdf.text('Nombre de créations uniques par annonceurs', pageWidth / 2, topMargin + 10, { align: 'center' });
    //   pdf.addImage(imgData, 'PNG', leftMargin, topMargin + 20, pageWidth - leftMargin - rightMargin, imgHeight);

    //   setPdfIsCreated(false);
    //   pdf.save(`media_review_${date1}_${date2}.pdf`);
    // });
    // html2canvas(container9, { scale: 2 }).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/png');
    //   //const imgHeight = canvas.height * (pageWidth - leftMargin - rightMargin) / canvas.width;
    //   const imgHeight = pageHeight / 4;
    //   const imgWidth = pageHeight / 4;
    //   pdf.addPage();
    //   setPageBackgroundColor(pdf, [2, 11, 66]); // Set background color (blue)
    //   pdf.setFontSize(18);
    //   pdf.setFont('helvetica', 'bold');
    //   pdf.setTextColor("#ffffff"); // White text
    //   pdf.text('Nombre de créations uniques par annonceurs', pageWidth / 2, topMargin + 10, { align: 'center' });
    //   pdf.addImage(imgData, 'PNG', leftMargin, topMargin + 20, pageWidth - leftMargin - rightMargin, imgWidth, imgHeight);

    //   setPdfIsCreated(false);
    //   pdf.save(`media_review_${date1}_${date2}.pdf`);
    // });
  };
  const test = () => {
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
  if (!client) {
    history.push('/login')
    LougoutRestErrorMessages && LougoutRestErrorMessages(email)
  }
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
  return (
    <div style={{
      height: "auto", width: "100%", padding: "2%",
      marginTop: resStyle.marginTopAll,
      marginBottom: resStyle.marginTopAll
    }}
    >
      {/* <Button onClick={test}>TEST</Button> */}
      <Container fluid style={{ display: "flex", flexDirection: "column" }} >
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
              <DateRangeTest />

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
                  getData={exportToPDF}
                  isloading={false}
                  isSucces={false}
                  title="Exporter"
                  mr="10px"
                  disablebtn={Top20produits?.length==0}
                />
                <LoadingButtonData
                  getData={ShowDashboardData}
                  isloading={isCalculating}
                  isSucces={false}
                  title="Afficher"
                  mr="10px"
                  disablebtn={(media == "" || base == "")}
                />
                <div style={{ width: "20px", height: resStyle.heightSeperator }}>

                </div>
                <LoadingButtonData
                  getData={handeOpenSideBar}
                  isloading={FilterLoading}
                  isSucces={false}
                  title="Recherche avancée"
                  mr="10px"
                  disablebtn={(media == "" || base == "")}
                />

              </div>

            </div>

          </Col>
        </Row>

        {show && (<div >

          <Row className="" onClick={() => handeToggleSideBar()}>
            {isCalculating && (<LoadingIndicator step={loadingStep}
              totalDuration={fetchDataTime} />)}
          </Row>
          <div id="all">
            {(dashDisplay && !isCalculating &&
              !(Top20produits?.length === 0)) && (<div style={{ width: '100%' }}>
                <div >

                  <Row className="mt-3" style={{ marginTop: 20 }} id="dashboard" >
                    {/* <WidgetShadcn
                    
                    /> */}
                    <Widget
                      icon={iconVolume}
                      value={count}
                      title="Volume publicitaire"
                      valueLastYear={countLastYear}
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
                          unite={" " + DureeTotal.split(' ')[1]}
                          title="Durée Pub Totale"
                          valueLastYear={DureeTotalLastYear}
                        />
                        <Widget
                          icon={iconTime}
                          value={DureeMoyenne}
                          unite={" " + DureeMoyenne.split(' ')[1]}
                          title="Durée moyenne par spot"
                          valueLastYear={DureeMoyenneLastYear}
                        />
                        <Widget
                          icon={iconPis}
                          valuepic={`${PicCommunication.interval_start.slice(0, -3)} à 
                        ${PicCommunication.interval_end.slice(0, -3)}`}
                          value={PicCommunication.count}
                          title="Pic publicitaire"
                          valueLastYear={`${PicCommunicationLastYear?.interval_start.slice(0, -3)} à ${PicCommunicationLastYear?.interval_end.slice(0, -3)}`}
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

            <img src={dash} alt="IMMAR DASHBOARD" style={{ width: "50%" }} />
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



  
    </div>
  );
}

export default Dashboard;
