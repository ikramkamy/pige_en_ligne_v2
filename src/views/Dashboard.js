import React, { useEffect, useState, useRef } from "react";
import { UsePigeDashboardStore } from '../store/dashboardStore/PigeDashboardStore';
import { UseFiltersStore } from "../store/dashboardStore/FiltersStore";
import MultipleSelectMedia from '../components/Commun/MediaSelect';
import ResponsiveDateRangePickers from '../components/Commun/DatePicker';
import GridDemo from '../components/Commun/charts/TOP20Charts';
import Animated from 'assets/img/loading1.gif';
import dash from 'assets/tableSearch.gif';
import iconVolume from 'assets/img/icons/graph-bar.png';
import iconAnnonceur from 'assets/img/icons/advertisement.png';
import iconCreation from 'assets/img/icons/creationpub.png';
import iconBudget from 'assets/img/icons/budget.png';
import iconSupprt from 'assets/img/icons/radio-station.png';
import iconTime from 'assets/img/icons/time.png';
import iconDuree from 'assets/img/icons/stopwatch.png';
import iconPis from 'assets/img/icons/rank.png';
import MultipleSelectBase from 'components/Commun/BaseSelect';
import { UseMediaDashboardStore } from "store/dashboardStore/MediaDashboardStore";
import iconPresse from 'assets/img/icons/press-release.png';
import LoadingIndicator from "components/Commun/LoadingIndcator";
import AnchorTemporaryDrawer from 'components/FixedPlugin/SideDrawer';
import LoadingButtonData from "components/Commun/LoadingBtnData";
import AutomaticSideFilterBar from 'components/FixedPlugin/AutomatiSideFilterBar';
import LoadingBaseChangeBtn from 'components/Commun/LoadingBaseChangeBtn';
import ExportPPT from './PptFile'
import {
  Card,
  Container,
  Row,
  Col
} from "react-bootstrap";
import { Button } from "@mui/material";
import DateRangeTest from 'components/Commun/DateRangePickerTest'
import { Link, useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import {
  CustomDataLabelFamilles, CustomDataLabelAnnonceurs,
  CustomDataLabelMarques, CustomDataLabelProduits,
  CustomDataLabelAnnonceurParSupport,
  CustomDataLabelCreationParAnnonceur
} from '../components/Commun/charts/BarCharts';
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import { PieChartVelson, PieChartRepartitionFormat } from '../components/Commun/charts/PieChart';
import { CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { UseLoginStore } from "store/dashboardStore/useLoginStore";
import CIcon from '@coreui/icons-react'
import { cilArrowTop, cilOptions } from '@coreui/icons'
import { CChartBar, CChartLine } from '@coreui/react-chartjs';
import {
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
  CWidgetStatsA,
} from '@coreui/react'
function Dashboard() {
  const slides = [
    <CustomDataLabelFamilles />,
    <CustomDataLabelAnnonceurs />,
    <CustomDataLabelMarques />,
    <CustomDataLabelProduits />,
    <PieChartVelson />,
    <PieChartRepartitionFormat />,
    <CustomDataLabelAnnonceurParSupport />,
    <CustomDataLabelCreationParAnnonceur />,

  ];
  //document.title='Tableau de bord'
  const history = useHistory()
  const {
    Top20produits,
    VolumePresse,
    VolumePresseLastYear,
    VolumeMedia,
    VolumeMediaLastyear,
    BudgetBrutPresseLastYear,
    BudgetBrutMediaLastYear,
    DureeTotalLastYear,
    DureeMoyenneLastYear,
    PicCommunicationLastYear,

    getVolumePresseLastYear,
    getBudgetBrutPresseLastYear,
    getCreationUniquesLastYear,
    getBudgetBrutLastYear,
    getAnnonceursActifPresseLastYear,

    getSupportDiffusionLastYear,
    SupportDiffusionMediaLastYear,

    AnnonceursActifPresse,
    AnnonceursActifPresseLastYear,
    AnnonceursActifMediaLastYear,
    getAnnonceursActifLastYear,
    AnnonceursActifMedia,


    CreationUniquesPresse,
    getCreationUniquesPresseLastYear,
    CreationUniquesPresseLastYear,
    CreationUniquesMedia,

    CreationUniquesMediaLastYear,
    BudgetBrutPresse,
    SupportDiffusionPresse,
    SupportDiffusionMedia,
    Couleur,
    NoireBlanc,
    getAnnonceursActifPresse,
    getAnnonceursActif,
    getCreationUniques,
    BudgetBrutMedia,

    getBudgetBrut,
    getSupportDiffusion,

    DureeTotal,
    PicCommunication,

    getDureeTotalDiffusion,
    getDureeTotalMoyenne,
    DureeMoyenne,
    getPicCommunication,

    getPrtMarchet,
    getVolumePresse,
    getTop20Annonceurs,
    getCreationUniquesPresse,
    getBudgetBrutPresse,
    getSupportDiffusionPresse,
    getSupportDiffusionPresseLastYear,
    SupportDiffusionPresseLastYear,

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

  } = UsePigeDashboardStore((state) => state)
  const { autoriseDash, client, email } = UseLoginStore((state) => state)
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

  } = UseFiltersStore((state) => state)
  const { getDataMedia } = UseMediaDashboardStore((state) => state)
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
  useEffect(() => {
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

    //     marques
    // Filtermarques
    console.log("Filtermarques  in ppt", Filtermarques)
  }, [Filtersupports, Filterfamilles, Filterannonceursids, Filtermarques])
  const ShowDashboardData = async () => {
    setIsCalculating(true)
    setDashboardIllustration(false)
    setShow(true)
    setDashDisplay(true)
    console.log("dash display", dashDisplay)
    const startTime = new Date().getTime();
    if (media === 'presse') {
      await Promise.all([
        getVolumePresse && getVolumePresse(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, date1, date2),
        getCreationUniquesPresse && getCreationUniquesPresse(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, date1, date2),
        getCreationParAnnonceur && getCreationUniquesPresseLastYear(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, date1, date2),
        getBudgetBrutPresse && getBudgetBrutPresse(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, date1, date2),
        getBudgetBrutPresseLastYear && getBudgetBrutPresseLastYear(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, date1, date2),
        getSupportDiffusionPresse && getSupportDiffusionPresse(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, date1, date2),
        getSupportDiffusionPresseLastYear && getSupportDiffusionPresseLastYear(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, date1, date2),
        getCouleur && getCouleur(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, date1, date2),
        getAnnonceursActifPresse && getAnnonceursActifPresse(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, date1, date2),
        getAnnonceursActifPresseLastYear && getAnnonceursActifPresseLastYear(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, date1, date2),
        getVolumePresseLastYear && getVolumePresseLastYear(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, date1, date2)

      ])
    } else if (media === 'radio' || media === 'television') {
      await Promise.all([
        getVolume && getVolume(Filtersupports, Filterfamilles, Filterclassesids,
          Filtersecteursids, Filtervarietiesids, Filterannonceursids,
          Filtermarquesids, Filterproduitsids, media,
          rangs, date1, date2),

        getVolumelastyear && getVolumelastyear(Filtersupports, Filterfamilles, Filterclassesids,
          Filtersecteursids, Filtervarietiesids, Filterannonceursids,
          Filtermarquesids, Filterproduitsids, media,
          rangs, date1, date2),


      ])
    }
    await Promise.all([
      getTop20famillesSectorielles && getTop20famillesSectorielles(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, base, media, rangs, date1, date2),
      getTop20Annonceurs && getTop20Annonceurs(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, base, media, rangs, date1, date2),
      getAnnonceursActif && getAnnonceursActif(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, media, rangs, date1, date2),
      getAnnonceursActifLastYear && getAnnonceursActifLastYear(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, media, rangs, date1, date2),
      getCreationUniques && getCreationUniques(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, media, rangs, date1, date2),
      getCreationUniquesLastYear && getCreationUniquesLastYear(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, media, rangs, date1, date2),
      getSupportDiffusion && getSupportDiffusion(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, media, rangs, date1, date2),
      getSupportDiffusionLastYear && getSupportDiffusionLastYear(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, media, rangs, date1, date2),
      getBudgetBrut && getBudgetBrut(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, media, rangs, date1, date2),
      getBudgetBrutLastYear && getBudgetBrutLastYear(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, media, rangs, date1, date2),
      getDureeTotalDiffusion && getDureeTotalDiffusion(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, media, rangs, date1, date2),
      getDureeTotalDiffusionLastYear && getDureeTotalDiffusionLastYear(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, media, rangs, date1, date2),
      getDureeTotalMoyenne && getDureeTotalMoyenne(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, media, rangs, date1, date2),
      getDureeTotalMoyenneLastYear && getDureeTotalMoyenneLastYear(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, media, rangs, date1, date2),
      getPicCommunication && getPicCommunication(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, media, rangs, date1, date2),
      getPicCommunicationLastYear && getPicCommunicationLastYear(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, media, rangs, date1, date2),
      getPrtMarchet && getPrtMarchet(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, base, media, rangs, date1, date2),
      getTop20Marques && getTop20Marques(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, base, media, rangs, date1, date2),
      getTop20Produits && getTop20Produits(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, base, media, rangs, date1, date2),
      getRepartitionFormat && getRepartitionFormat(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, base, media, rangs, date1, date2),
      getAnnonceursParSupport && getAnnonceursParSupport(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, base, media, rangs, date1, date2),
      getCreationParAnnonceur && getCreationParAnnonceur(Filtersupports, Filterfamilles, Filterclassesids, Filtersecteursids, Filtervarietiesids, Filterannonceursids, Filtermarquesids, Filterproduitsids, base, media, rangs, date1, date2)

    ])
    const endTime = new Date().getTime();
    setFetchDataTime(endTime - startTime);
    setIsCalculating(false)
    if (Top20produits?.length === 0) {
      setDataExist(true)
    } else {
      setDataExist(false)
    }
    /// setShow(false)  why?????
    setTimeout(() => {
      //setShow(false)
      setLoadingStep(fetchDataTime / 100)
      // console.log("fetchDataTime", fetchDataTime)
      // console.log("step",loadingStep)
    }, fetchDataTime);

  }
  const disableButton = (!(media && base))
  const HandelSideBarPisition = () => {
    ManageSideBarfilterDisplay && ManageSideBarfilterDisplay('0%')
  }

  const handeToggleSideBar = () => {
    ManageSideBarfilterDisplay('-100%');
  }

  const handeOpenSideBar = () => {
    const newPosition = sideBarFilterPosition === '100%' ? '0%' : '0%';
    console.log("newPosition", newPosition)
    ManageSideBarfilterDisplay('0%');
  }
  useEffect(() => {
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
  const exportToPDF = () => {
    setPdfIsCreated(true)
    const container0 = document.getElementById('dashboard');
    const container7 = document.getElementById('charts-container7');
    const container8 = document.getElementById('charts-container8');
    const container3 = document.getElementById('charts-container3');
    const container4 = document.getElementById('charts-container4');
    const container2 = document.getElementById('charts-container2');
    const container1 = document.getElementById('charts-container1');
    const container5 = document.getElementById('charts-container5');
    const container6 = document.getElementById('charts-container6');
    const components = [
      container5, container6, container0, container1, container2, container3,
      container4, container7, container8
    ];

    const pdf = new jsPDF('l', 'mm', 'a4');
    const imgWidth = 97;
    const pageWidth = 297;
    const pageHeight = 210;
    const leftMargin = 20;
    const rightMargin = 10;
    const topMargin = 10;
    const bottomMargin = 10;

    let usableWidth = imgWidth - leftMargin - rightMargin;
    let usableHeight = pageHeight - topMargin - bottomMargin;
    // Function to limit text width and automatically break lines
    const drawText = (pdf, text, x, y, maxWidth) => {
      let lines = pdf.splitTextToSize(text, maxWidth);
      pdf.text(lines, x, y);
      return y + (lines.length * 10); // Increase Y position after the lines
    };

    // Create a table-like structure for the text information
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor("black");

    // Set table headers and borders
    const rowHeight = 10;
    const columnWidth = [70, 120];

    let currentY = topMargin + rowHeight;
    const borderColor = [211, 211, 211];
    const verticalCenter = pageHeight / 2;
    pdf.setDrawColor(...borderColor);
    pdf.setFillColor('#00a6e0');
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    pdf.setFontSize(50)
    pdf.setFont('poppins', 'bold');
    pdf.setTextColor("white");
    currentY = drawText(pdf, "", leftMargin + columnWidth[0] + 5, currentY + 6, columnWidth[1]);
    pdf.text('Immar Media', pageWidth / 2, verticalCenter, { align: 'center' });
    currentY = drawText(pdf, "", leftMargin + columnWidth[0] + 5, currentY + 6, columnWidth[1]);

    pdf.addPage();

    function getTextHeight(pdf, text, columnWidth) {
      const lines = pdf.splitTextToSize(text, columnWidth);
      const fontSize = pdf.getFontSize();
      const lineHeight = fontSize * 1.2;
      return lines.length * lineHeight;
    }
    // Add title
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(50);
    pdf.setTextColor("#00a6e0");
    pdf.text('Media Review', pageWidth / 2, topMargin + 10, { align: 'center' });
    currentY = drawText(pdf, "", leftMargin + columnWidth[0] + 5, currentY + 1, columnWidth[1]);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(14);
    pdf.setTextColor("black");
    // Media
    pdf.setTextColor("#00a6e0");
    pdf.text('Media:', leftMargin + 5, currentY + 1);
    pdf.setTextColor("black");
    currentY = drawText(pdf, media, leftMargin + columnWidth[0] + 5, currentY + 6, columnWidth[1]);
    // Date
    pdf.setTextColor("#00a6e0");
    pdf.text('Date:', leftMargin + 5, currentY + 6);
    pdf.setTextColor("black");
    currentY = drawText(pdf, `${date1} / ${date2}`,
      leftMargin + columnWidth[0] + 5, currentY + 6, columnWidth[1]);
    pdf.setTextColor("#00a6e0");
    pdf.text('Annonceur(s)', leftMargin + 5, currentY + 6);
    pdf.setTextColor("black");
    currentY = drawText(pdf, `${annonceurnames.length}`,
      leftMargin + columnWidth[0] + 5, currentY + 6, columnWidth[1]);
    pdf.setTextColor("#00a6e0");
    pdf.text('Marque(s)', leftMargin + 5, currentY + 6);
    pdf.setTextColor("black");
    currentY = drawText(pdf, `${Filtermarques.length}`,
      leftMargin + columnWidth[0] + 5, currentY + 6, columnWidth[1]);

    // Support(s)
    let supportText = supportnames?.join(', ') || '';
    let familleText = famillenames?.join(', ') || '';
    let supportTextHeight = getTextHeight(pdf, supportText, 200);

    // Adjust the height based on text content
    // pdf.rect(leftMargin, currentY, columnWidth[0] + 200, supportTextHeight); 
    pdf.setTextColor("#00a6e0");
    pdf.text('Support(s):', leftMargin + 5, currentY + 6);
    pdf.setFontSize(10);
    pdf.setTextColor("black");
    currentY = drawText(pdf, supportText, leftMargin + columnWidth[0] + 5, currentY + 3, 200);

    pdf.setFontSize(18);
    pdf.setTextColor("#00a6e0");
    pdf.text('Famille(s):', leftMargin + 5, currentY - 30);
    pdf.setFontSize(10);
    pdf.setTextColor("black");
    currentY = drawText(pdf, familleText,
      leftMargin + columnWidth[0] + 5, currentY - 30, 200);
    html2canvas(container0).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgHeight = canvas.height * usableWidth / canvas.width;
      let currentImgWidth = imgWidth;
      let currentImgHeight = imgHeight;
      const headerHeight = 20;
      const imageTopMargin = topMargin + headerHeight + 10;

      pdf.addPage();
      const verticalOffset = topMargin + (usableHeight - currentImgHeight) / 2;
      const horizontalOffset = leftMargin + (usableWidth - currentImgWidth) / 2;
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor("#00a6e0");
      pdf.text('Vue d\'ensembre-indicateurs de pige', pageWidth / 2, topMargin + 10, { align: 'center' });

      pdf.addImage(imgData, 'PNG', 20, 30, 250, 150);
      let heightLeft = currentImgHeight - pageHeight;
    })
    html2canvas(container1).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgHeight = canvas.height * usableWidth / canvas.width;
      let currentImgWidth = imgWidth;
      let currentImgHeight = imgHeight;
      const headerHeight = 20;
      const imageTopMargin = topMargin + headerHeight + 10;

      pdf.addPage();
      const verticalOffset = topMargin + (usableHeight - currentImgHeight) / 2;
      const horizontalOffset = leftMargin + (usableWidth - currentImgWidth) / 2;
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor("#00a6e0");
      pdf.text('Top 20 familles sectorielles', pageWidth / 2, topMargin + 10, { align: 'center' });

      pdf.addImage(imgData, 'PNG', 20, 30, 200, 150);
      let heightLeft = currentImgHeight - pageHeight;
    })
    html2canvas(container2).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgHeight = canvas.height * usableWidth / canvas.width;
      let currentImgWidth = imgWidth;
      let currentImgHeight = imgHeight;
      const headerHeight = 20;
      const imageTopMargin = topMargin + headerHeight + 10;

      pdf.addPage();
      const verticalOffset = topMargin + (usableHeight - currentImgHeight) / 2;
      const horizontalOffset = leftMargin + (usableWidth - currentImgWidth) / 2;
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor("#00a6e0");
      pdf.text('Top 20 annonceurs', pageWidth / 2, topMargin + 10, { align: 'center' });

      pdf.addImage(imgData, 'PNG', 20, 30, 200, 150);
      let heightLeft = currentImgHeight - pageHeight;

    })
    html2canvas(container3).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgHeight = canvas.height * usableWidth / canvas.width;
      let currentImgWidth = imgWidth;
      let currentImgHeight = imgHeight;
      const headerHeight = 20;
      const imageTopMargin = topMargin + headerHeight + 10;

      pdf.addPage();
      const verticalOffset = topMargin + (usableHeight - currentImgHeight) / 2;
      const horizontalOffset = leftMargin + (usableWidth - currentImgWidth) / 2;
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor("#00a6e0");
      pdf.text('Top 20 des marques', pageWidth / 2, topMargin + 10, { align: 'center' });

      pdf.addImage(imgData, 'PNG', 20, 30, 200, 150);
      let heightLeft = currentImgHeight - pageHeight;
    })
    html2canvas(container4).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgHeight = canvas.height * usableWidth / canvas.width;
      let currentImgWidth = imgWidth;
      let currentImgHeight = imgHeight;
      const headerHeight = 20;
      const imageTopMargin = topMargin + headerHeight + 10;

      pdf.addPage();
      const verticalOffset = topMargin + (usableHeight - currentImgHeight) / 2;
      const horizontalOffset = leftMargin + (usableWidth - currentImgWidth) / 2;
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor("#00a6e0");
      pdf.text('Top 20 des produits', pageWidth / 2, topMargin + 10, { align: 'center' });

      pdf.addImage(imgData, 'PNG', 20, 30, 200, 150);
      let heightLeft = currentImgHeight - pageHeight;
    })
    html2canvas(container5).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgHeight = canvas.height * usableWidth / canvas.width;
      let currentImgWidth = imgWidth;
      let currentImgHeight = imgHeight;
      const headerHeight = 20;
      const imageTopMargin = topMargin + headerHeight + 10;

      pdf.addPage();
      const verticalOffset = topMargin + (usableHeight - currentImgHeight) / 2;
      const horizontalOffset = leftMargin + (usableWidth - currentImgWidth) / 2;
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor("#00a6e0");
      pdf.text('Part de Marché', pageWidth / 2, topMargin + 10, { align: 'center' });

      pdf.addImage(imgData, 'PNG', 20, 30, 200, 150);
      let heightLeft = currentImgHeight - pageHeight;
    })
    html2canvas(container6).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgHeight = canvas.height * usableWidth / canvas.width;
      let currentImgWidth = imgWidth;
      let currentImgHeight = imgHeight;
      const headerHeight = 20;
      const imageTopMargin = topMargin + headerHeight + 10;

      pdf.addPage();
      const verticalOffset = topMargin + (usableHeight - currentImgHeight) / 2;
      const horizontalOffset = leftMargin + (usableWidth - currentImgWidth) / 2;
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor("#00a6e0");
      pdf.text('Répartition par Format', pageWidth / 2, topMargin + 10, { align: 'center' });

      pdf.addImage(imgData, 'PNG', 20, 30, 200, 150);
      let heightLeft = currentImgHeight - pageHeight;
    })
    html2canvas(container7).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgHeight = canvas.height * usableWidth / canvas.width;
      let currentImgWidth = imgWidth;
      let currentImgHeight = imgHeight;
      const headerHeight = 20;
      const imageTopMargin = topMargin + headerHeight + 10;

      pdf.addPage();
      const verticalOffset = topMargin + (usableHeight - currentImgHeight) / 2;
      const horizontalOffset = leftMargin + (usableWidth - currentImgWidth) / 2;
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor("#00a6e0");
      pdf.text('Nombre d’annonceurs actifs par support', pageWidth / 2, topMargin + 10, { align: 'center' });

      pdf.addImage(imgData, 'PNG', 20, 30, 200, 150);
      let heightLeft = currentImgHeight - pageHeight;
    })
    html2canvas(container8).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgHeight = canvas.height * usableWidth / canvas.width;
      let currentImgWidth = imgWidth;
      let currentImgHeight = imgHeight;
      const headerHeight = 20;
      const imageTopMargin = topMargin + headerHeight + 10;

      pdf.addPage();
      const verticalOffset = topMargin + (usableHeight - currentImgHeight) / 2;
      const horizontalOffset = leftMargin + (usableWidth - currentImgWidth) / 2;
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor("#00a6e0");
      pdf.text('Nombre de créations uniques par annonceurs', pageWidth / 2, topMargin + 10, { align: 'center' });


      pdf.addImage(imgData, 'PNG', 20, 30, 200, 150);
      let heightLeft = currentImgHeight - pageHeight;

      setPdfIsCreated(false)
      pdf.save(`media_review_${date1}_${date2}.pdf`);
    })
    // components.forEach((component, index) => {
    //   html2canvas(component).then((canvas) => {
    //     const imgData = canvas.toDataURL('image/png');
    //     const imgHeight = canvas.height * usableWidth / canvas.width;
    //     let currentImgWidth = imgWidth;
    //     let currentImgHeight = imgHeight;
    //     if (component.id === 'dashboard') {
    //       currentImgWidth = 200;
    //       currentImgHeight = canvas.height * currentImgWidth / canvas.width;
    //       usableWidth = currentImgWidth - leftMargin - rightMargin;
    //     } else {
    //       currentImgWidth = 97;
    //       currentImgHeight = canvas.height * currentImgWidth / canvas.width;
    //       usableWidth = currentImgWidth - leftMargin - rightMargin;
    //     }
    //     if (component.id === 'charts-container1') {
    //       pdf.setFontSize(18);
    //       pdf.setTextColor("#00a6e0");
    //       pdf.text('Top 20 familles sectorielles', leftMargin + 5, -15);
    //     }else if(component.id === 'charts-container2'){
    //       pdf.setFontSize(18);
    //       pdf.setTextColor("#00a6e0");
    //       pdf.text('Top 20 annonceurs', leftMargin + 5,-15);
    //     }else if(component.id === 'charts-container3'){
    //       pdf.setFontSize(18);
    //       pdf.setTextColor("#00a6e0");
    //       pdf.text('Top 20 marques', leftMargin + 5,-15);
    //     }else if(component.id === 'charts-container4'){
    //       pdf.setFontSize(18);
    //       pdf.setTextColor("#00a6e0");
    //       pdf.text('Top 20 produits', leftMargin + 5,-15);
    //     }else if(component.id === 'charts-container5'){
    //       pdf.setFontSize(18);
    //       pdf.setTextColor("#00a6e0");
    //       pdf.text('parts marché', leftMargin + 5,-15);
    //     }else if(component.id === 'charts-container6'){
    //       pdf.setFontSize(18);
    //       pdf.setTextColor("#00a6e0");
    //       pdf.text('Répartition par format', leftMargin + 5,-15);
    //     }else if(component.id === 'charts-container7'){
    //       pdf.setFontSize(18);
    //       pdf.setTextColor("#00a6e0");
    //       pdf.text('Nombre d’annonceurs actifs par support', leftMargin + 5, -15);
    //     }else if(component.id === 'charts-container8'){
    //       pdf.setFontSize(18);
    //       pdf.setTextColor("#00a6e0");
    //       pdf.text('Nombre de créations uniques par annonceurs', leftMargin + 5, -15);
    //     }



    //     pdf.addPage();

    //     const verticalOffset = topMargin + (usableHeight - currentImgHeight) / 2;
    //     const horizontalOffset = leftMargin + (usableWidth - currentImgWidth) / 2;

    //     pdf.addImage(imgData, 'PNG', horizontalOffset, verticalOffset, currentImgWidth, currentImgHeight);

    //     let heightLeft = currentImgHeight - pageHeight;
    //     while (heightLeft > 0) {
    //       pdf.addPage();
    //       pdf.addImage(imgData, 'PNG', horizontalOffset, verticalOffset - heightLeft, currentImgWidth, currentImgHeight);
    //       heightLeft -= pageHeight;
    //     }

    //     if (index === components.length - 1) {
    //       setPdfIsCreated(false)
    //       pdf.save(`media_review_${date1}_${date2}.pdf`);
    //     }
    //   });
    // });







  };

  if (!client) {
    history.push('/login')
  }
  if (!autoriseDash) {
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
  return (
    <div style={{
      height: "auto", width: "100%", padding: "2%",
      marginTop: resStyle.marginTopAll,
      marginBottom: resStyle.marginTopAll

    }}
    >
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
                display: 'flex', width: resStyle.widthRightbtns, justifyContent: "space-between",

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
                width: resStyle.widthRightbtns, justifyContent: "space-between",
                marginBottom: resStyle.marginBtm,
                marginTop: resStyle.marginBtm,
                paddingRight: "0px",
                paddingLeft: "0px",

              }}>


                <LoadingButtonData
                  getData={ShowDashboardData}
                  isloading={isCalculating}
                  isSucces={Top20produits?.length !== 0}
                  title="Afficher"
                  //disablebtn={!(showDataGridIfNotEmpty && showDataGrid && filteredData2.length > 0)} 
                  disablebtn={!(media !== "" && base !== "")}
                />
                <Button
                  onClick={handeOpenSideBar}
                  disabled={!media}
                  sx={{
                    textTransform: "none",

                    width: "100%",
                    textTransform: "none",
                    backgroundColor: '#00a6e0',
                    textTransform: "none",
                    width: "fit-content",
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#00a6e0',
                    }
                  }}>
                  Recherche avancée
                </Button>
              </div>
              {/* <AnchorTemporaryDrawer DashboardData={ShowDashboardData} /> */}
            </div>

          </Col>
          {/* <ResponsiveDateRangePickers /> */}
          {/* <div>
            <DateRangeTest/>
              </div> */}
        </Row>

        {show && (<div >

          <Row className="" onClick={() => handeToggleSideBar()}>
            {isCalculating && (<LoadingIndicator step={loadingStep} totalDuration={fetchDataTime} />)}
            {/* <div className="w-100 justify-content-center"
              style={{ display: "flex", justifyContent: "flex-start", alignItems: "start" }}>
              <img src={Animated} alt="IMMAR DASHBOARDs" />
            </div> */}
          </Row>
          <div id="all">
            {(dashDisplay && !isCalculating &&
              !(Top20produits?.length === 0)) && (<div style={{ width: '100%' }}>
                <div >
                <h1 style={{color:"white"}}>hello</h1>
                  <Row className="mt-3" style={{ marginTop: 20 }} id="dashboard" >


                    <Col lg="3" sm="6">
                      <Card className="card-stats">
                        <Card.Body>
                          <Row>
                            <Col xs="5">
                              <div className="icon-big text-center icon-warning">

                                <img src={iconVolume} alt="immar media" />
                              </div>
                            </Col>
                            <Col xs="7">
                              <div className="numbers">
                                <p className="card-category">volume de diffusion publicitaire</p>
                                <Card.Title as="h4">{media === 'presse' ? VolumePresse : VolumeMedia}</Card.Title>
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                        <Card.Footer>
                          <hr></hr>
                          <div className="stats">
                            <i className="fas fa-redo mr-1"></i>

                            {media === "presse" ? VolumePresseLastYear : VolumeMediaLastyear}
                          </div>
                        </Card.Footer>
                      </Card>
                    </Col>
                    <CCol sm={6}>
                      <CWidgetStatsA
                        className="mb-4"
                        color="primary"
                        value={
                          <>
                            $9.000{' '}
                            <span className="fs-6 fw-normal">
                              (40.9% <CIcon icon={cilArrowTop} />)
                            </span>
                          </>
                        }
                        title="Widget title"
                        action={
                          <CDropdown alignment="end">
                            <CDropdownToggle color="transparent" caret={false} className="p-0">
                              <CIcon icon={cilOptions} className="text-white" />
                            </CDropdownToggle>
                            <CDropdownMenu>
                              <CDropdownItem>Action</CDropdownItem>
                              <CDropdownItem>Another action</CDropdownItem>
                              <CDropdownItem>Something else here...</CDropdownItem>
                              <CDropdownItem disabled>Disabled action</CDropdownItem>
                            </CDropdownMenu>
                          </CDropdown>
                        }
                        chart={
                          <CChartLine
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={{
                              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                              datasets: [
                                {
                                  label: 'My First dataset',
                                  backgroundColor: 'transparent',
                                  borderColor: 'rgba(255,255,255,.55)',
                                  pointBackgroundColor: '#5856d6',
                                  data: [65, 59, 84, 84, 51, 55, 40],
                                },
                              ],
                            }}
                            options={{
                              plugins: {
                                legend: {
                                  display: false,
                                },
                              },
                              maintainAspectRatio: false,
                              scales: {
                                x: {
                                  border: {
                                    display: false,
                                  },
                                  grid: {
                                    display: false,
                                  },
                                  ticks: {
                                    display: false,
                                  },
                                },
                                y: {
                                  min: 30,
                                  max: 89,
                                  display: false,
                                  grid: {
                                    display: false,
                                  },
                                  ticks: {
                                    display: false,
                                  },
                                },
                              },
                              elements: {
                                line: {
                                  borderWidth: 1,
                                  tension: 0.4,
                                },
                                point: {
                                  radius: 4,
                                  hitRadius: 10,
                                  hoverRadius: 4,
                                },
                              },
                            }}
                          />
                        }
                      />
                    </CCol>
                    <Col lg="3" sm="6">
                      <Card className="card-stats">
                        <Card.Body>
                          <Row>
                            <Col xs="5">
                              <div className="icon-big text-center icon-warning">

                                <img src={iconAnnonceur} alt="immar" />
                              </div>
                            </Col>
                            <Col xs="7">
                              <div className="numbers">
                                <p className="card-category">Annonceurs actifs</p>
                                <Card.Title as="h4">{media === 'presse' ? AnnonceursActifPresse : AnnonceursActifMedia}</Card.Title>
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                        <Card.Footer>
                          <hr></hr>
                          <div className="stats">
                            <i className="fas fa-redo mr-1"></i>
                            {media === "presse" ? AnnonceursActifPresseLastYear : AnnonceursActifMediaLastYear}
                          </div>
                        </Card.Footer>
                      </Card>
                    </Col>
                    <Col lg="3" sm="6">
                      <Card className="card-stats">
                        <Card.Body>
                          <Row>
                            <Col xs="5">
                              <div className="icon-big text-center icon-warning">


                                <img src={iconCreation} alt="immar media" />
                              </div>
                            </Col>
                            <Col xs="7">
                              <div className="numbers">
                                <p className="card-category">Creations uniques</p>
                                <Card.Title as="h4">{media === 'presse' ?
                                  CreationUniquesPresse : CreationUniquesMedia}</Card.Title>
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                        <Card.Footer>
                          <hr></hr>
                          <div className="stats" >
                            <i className="far fa-clock-o mr-1"></i>
                            {media === "presse" ? CreationUniquesPresseLastYear : CreationUniquesMediaLastYear}
                          </div>
                        </Card.Footer>
                      </Card>
                    </Col>

                    <Col lg="3" sm="6">
                      <Card className="card-stats">
                        <Card.Body>
                          <Row>
                            <Col xs="5">
                              <div className="icon-big text-center icon-warning">
                                <img src={iconBudget} alt="immar media" />
                              </div>
                            </Col>
                            <Col xs="7">
                              <div className="numbers">
                                <p className="card-category">Budget Brut</p>
                                <Card.Title as="h4">{media === 'presse' ? BudgetBrutPresse : BudgetBrutMedia}</Card.Title>
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                        <Card.Footer>
                          <hr></hr>
                          <div className="stats" >
                            <i className="fas fa-redo mr-1"></i>
                            {media === "presse" ? BudgetBrutPresseLastYear : BudgetBrutMediaLastYear}
                          </div>
                        </Card.Footer>
                      </Card>
                    </Col>

                    <Col lg="3" sm="6">
                      <Card className="card-stats">
                        <Card.Body>
                          <Row>
                            <Col xs="5">
                              <div className="icon-big text-center icon-warning">
                                <img src={iconSupprt} alt="immar media" />
                              </div>
                            </Col>
                            <Col xs="7">
                              <div className="numbers">
                                <p className="card-category">Support de diffusion</p>
                                <Card.Title as="h4">{media === "presse" ? SupportDiffusionPresse : SupportDiffusionMedia}</Card.Title>
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                        <Card.Footer>
                          <hr></hr>
                          <div className="stats">
                            <i className="fas fa-redo mr-1"></i>
                            {media === "presse" ? SupportDiffusionPresseLastYear : SupportDiffusionMediaLastYear}
                          </div>
                        </Card.Footer>
                      </Card>
                    </Col>

                    {(media === 'presse') && (
                      <Col lg="3" sm="6">
                        <Card className="card-stats">
                          <Card.Body>
                            <Row>
                              <Col xs="5">
                                <div className="icon-big text-center icon-warning">
                                  <img src={iconPresse} alt="immar media" />
                                </div>
                              </Col>
                              <Col xs="7">
                                <div className="numbers">
                                  <p className="card-category">Couleur/Noir et Blanc</p>
                                  <Card.Title as="h4">{Couleur} / {NoireBlanc}</Card.Title>
                                </div>
                              </Col>
                            </Row>
                          </Card.Body>
                          <Card.Footer>
                            <hr></hr>
                            <div className="stats" style={{ color: 'transparent' }}>
                              <i className="fas fa-redo mr-1"></i>
                              Update now
                            </div>
                          </Card.Footer>
                        </Card>
                      </Col>


                    )}


                    {(media === "radio" || media === "television") &&
                      <>
                        <Col lg="3" sm="6">
                          <Card className="card-stats">
                            <Card.Body>
                              <Row>
                                <Col xs="5">
                                  <div className="icon-big text-center icon-warning">
                                    <img src={iconDuree} alt="immar media" />
                                  </div>
                                </Col>
                                <Col xs="7">
                                  <div className="numbers">
                                    <p className="card-category">Durée Pub Totale</p>
                                    <Card.Title as="h4">{DureeTotal}</Card.Title>
                                  </div>
                                </Col>
                              </Row>
                            </Card.Body>
                            <Card.Footer>
                              <hr></hr>
                              <div className="stats">
                                <i className="fas fa-redo mr-1"></i>
                                {DureeTotalLastYear}
                              </div>
                            </Card.Footer>
                          </Card>
                        </Col>
                        <Col lg="3" sm="6">
                          <Card className="card-stats">
                            <Card.Body>
                              <Row>
                                <Col xs="5">
                                  <div className="icon-big text-center icon-warning">
                                    <img src={iconTime} alt="immar medias" />
                                  </div>
                                </Col>
                                <Col xs="7">
                                  <div className="numbers">
                                    <p className="card-category">Durée Myenne par Spot diffusé</p>
                                    <Card.Title as="h4">{Number(DureeMoyenne).toFixed(2)}</Card.Title>
                                  </div>
                                </Col>
                              </Row>
                            </Card.Body>
                            <Card.Footer>
                              <hr></hr>
                              <div className="stats">
                                <i className="fas fa-redo mr-1"></i>
                                {DureeMoyenneLastYear}
                              </div>
                            </Card.Footer>
                          </Card>
                        </Col>

                        <Col lg="3" sm="6">
                          <Card className="card-stats">
                            <Card.Body>
                              <Row>
                                <Col xs="5">
                                  <div className="icon-big text-center icon-warning">
                                    <img src={iconPis} alt="immar media" />
                                  </div>
                                </Col>
                                <Col xs="7">
                                  <div className="numbers">
                                    <p className="card-category">Pic publicitaire</p>
                                    <Card.Title as="h4">{PicCommunication ? PicCommunication.count : 0}</Card.Title>
                                    <p className="card-category">de {PicCommunication ? (
                                      `${PicCommunication.interval_start.slice(0, -3)} à ${PicCommunication.interval_end.slice(0, -3)}`
                                    ) : (
                                      '0'
                                    )}</p>
                                  </div>
                                </Col>
                              </Row>
                            </Card.Body>
                            <Card.Footer>
                              <hr></hr>
                              <div className="stats" style={{ display: "flex", alignItems: "center" }}>
                                <i className="fas fa-redo mr-1"></i>
                                <p className="card-category">de {PicCommunicationLastYear ? (
                                  `${PicCommunicationLastYear.interval_start.slice(0, -3)} à ${PicCommunicationLastYear.interval_end.slice(0, -3)}`
                                ) : (
                                  '0'
                                )}</p>
                              </div>
                            </Card.Footer>
                          </Card>
                        </Col>


                      </>

                    }

                  </Row>

                  <GridDemo />
                </div>
              </div>)}
            {(dashDisplay && !isCalculating &&
              !(Top20produits?.length === 0)) &&
              <Button
                sx={{
                  backgroundColor: '#00a6e0',
                  textTransform: "none",
                  marginTop: "5%",
                  marginBottom: "5%",
                  width: '100%',
                  color: '',
                  '&:hover': {
                    backgroundColor: '#00a6e0',
                  }
                }}
                variant="contained"
                disableElevation

                disabled={pdfIsCreated}
                onClick={exportToPDF}
                startIcon={pdfIsCreated ? <CircularProgress size={20} color="inherit" /> : null}
              //onClick={()=>history.push('/admin/ppt')}
              >

                {pdfIsCreated ? 'Téléchargement...' : success ?
                  'Télécharger le rapport' : 'Télécharger le rapport'}
                {/* {success && (
                  <CheckCircleIcon
                    style={{ color: 'green', marginLeft: '10px' }}
                  />
                )} */}
              </Button>}

            {/* 
    <ExportPPT/>
      <CustomDataLabelFamilles />
      <CustomDataLabelAnnonceurs />
    <CustomDataLabelMarques />
    <CustomDataLabelProduits />
     <PieChartVelson/>
    <PieChartRepartitionFormat/>
    <CustomDataLabelAnnonceurParSupport />
    <CustomDataLabelCreationParAnnonceur /> 
    */}






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
    </div>
  );
}

export default Dashboard;
