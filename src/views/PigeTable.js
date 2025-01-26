import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { UsePigeDashboardStore } from "store/dashboardStore/PigeDashboardStore";
import { UseMediaDashboardStore } from "store/dashboardStore/MediaDashboardStore";
import LoadingButtonData from 'components/Commun/LoadingBtnData';
import Alert from '@mui/material/Alert';
import CustomToolbar from 'components/Commun/CustomToolBar'
import WarningIcon from '@mui/icons-material/Warning';
import AutomaticSideFilterBar from "components/FixedPlugin/AutomatiSideFilterBar";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid
} from "@mui/material";
import { UseFiltersStore } from "../store/dashboardStore/FiltersStore";
import MultipleSelectMedia from "../components/Commun/MediaSelect";
import { useDemoData } from '@mui/x-data-grid-generator';
import { UseLoginStore } from "../store/dashboardStore/useLoginStore";
import { Container, Row, Col } from "react-bootstrap";
import TableIlustration from 'assets/tableSearch.gif'
import LoadingLineIndicator from "components/Commun/LineLoading";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import DateRangeTest from "components/Commun/DateRangePickerTest";
import '../components/Commun/commun.css';
import MessageLibPopUp from "components/Commun/popups/MessageLibPopup";
import ExportExcelBtn from "components/Commun/ExportExcelBtn";
import LargeDataPopup from "components/Commun/popups/LargeDataPopup";
import DataUnavailablePopup from "components/Commun/popups/DataUnavailable";
import ExcelEmailPopup from "components/Commun/popups/ExcelEmailPopup";
import { UseCountStore } from "store/dashboardStore/UseCounts";
export default function DataTablePige() {
  document.title = 'pige publicitaire'
  const history = useHistory()
  const location = useLocation()
  const { media,
    Filtersupports,
    Filterfamilles,
    Filterclassesids,
    Filtersecteursids,
    Filtervarietiesids,
    Filterannonceursids,
    Filtermarquesids,
    Filterproduitsids,
    rangs,
    loadingshow,
    setLoadingshow,
    date1,
    date2,
    //pageSize,
    showDataGridIfNotEmpty, setShowDataGridIfNotEmpty,
    showDataGrid, setShowDataGrid,
    dataTableShow, setDataTableShow,
    ManageSideBarfilterDisplay,
    SideBarFilterPosition,
    getFilters,
    FilterLoading
  } = UseFiltersStore((state) => state);
  const widthSmallData = 200
  const widthXsmallData = 70
  const widthLargeData = 250
  const columns = [
    { field: "id", headerName: "id", width: 130, hide: false },
    { field: "Support_Lib", headerName: "Support", width: 100 },
    { field: "Date", headerName: "Date", width: 100 },
    { field: "Produit_Lib", headerName: "Produit", width: 130, sortable: true },
    { field: "Classe_Lib", headerName: "Classe", width: 130, sortable: true },

    {
      field: "Format",
      headerName: "Format",
      width: widthLargeData,
      sortable: true,
      renderCell: (params) => (
        <div>
          {`${params.row.Format} - ${params.row.NB_C} - ${params.row.Rubrique}`}
        </div>
      ),
    },
    { field: "Page", headerName: "Page", width: 130, sortable: true },
    { field: "Annonceur_Lib", headerName: "Annonceur", width: 130, sortable: true, hide: true },
    { field: "Famille_Lib", headerName: "Famille", width: 130, sortable: true, hide: false },
    { field: "Secteur_Lib", headerName: "Catégorie", width: 130, sortable: true, hide: false },
    { field: "Marque_Lib", headerName: "Marque", width: 130, sortable: true, hide: false },
    { field: "Version", headerName: "Version", width: 130, sortable: true, hide: false },
    { field: "Tarif", headerName: "Tarif", width: 130, sortable: true, hide: false },
    { field: "Période", headerName: "Période", width: 130, sortable: true, hide: false },
    { field: "Variété_Lib", headerName: "Varieté", width: 130, sortable: true, hide: false },
    { field: "Année", headerName: "Année", width: 130, sortable: true, hide: false },
    { field: "Mois", headerName: "Mois", width: 130, sortable: true, hide: false },

    {
      field: "Message_Id",
      headerName: "Msg",
      width: 90,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          variant="contained"
          color="primary"
          onClick={() => handleRowClick(params.row)}
        >
          {params.value}
        </div>
      ),
    },
  ];
  const columns2 = [
    { field: "id", headerName: "id", width: 130 },
    { field: "Support_Lib", headerName: "Support", width: 130 },
    { field: "Date", headerName: "Date", width: 130 },
    { field: "Produit_Lib", headerName: "Produit", width: widthLargeData, sortable: true },
    {
      field: "Message_Id",
      headerName: "Msg",
      width: 90,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          variant="contained"
          color="primary"
          onClick={() => handleRowClick(params.row)}
        >
          {params.value}
        </div>
      ),
    },
    { field: "Heure", headerName: "Heure", width: 100, sortable: true },
    { field: "Durée", headerName: "Durée", width: widthXsmallData, sortable: true },
    { field: "Rang", headerName: "Rang", width: widthXsmallData, sortable: true },
    { field: "Encombrement", headerName: "Encomb", width: widthXsmallData, sortable: true },
    { field: "Annonceur_Lib", headerName: "Annonceur", width: 130, sortable: true, hide: true },
    { field: "Famille_Lib", headerName: "Famille", width: 130, sortable: true, hide: false },
    { field: "Secteur_Lib", headerName: "Secteurs", width: 130, sortable: true, hide: false },
    { field: "Classe_Lib", headerName: "Classe", width: 130, sortable: true, hide: false },
    { field: "Marque_Lib", headerName: "Marque", width: 130, sortable: true, hide: false },
    { field: "Version", headerName: "Version", width: 130, sortable: true, hide: false },
    { field: "Tarif", headerName: "Tarif", width: 130, sortable: true, hide: false },
    { field: "Variété_Lib", headerName: "Varieté", width: 130, sortable: true, hide: false },
    { field: "Année", headerName: "Année", width: 130, sortable: true, hide: false },
    { field: "Mois", headerName: "Mois", width: 130, sortable: true, hide: false },
    { field: "Prog_avant", headerName: "Prog avant", width: widthLargeData, sortable: true },
    { field: "Prog_après", headerName: "Prog après", width: widthLargeData, sortable: true },

  ];

  const frenchLocaleText = {
    // Toolbar
    toolbarDensity: 'Densité',
    toolbarDensityLabel: 'Densité',
    toolbarDensityCompact: 'Compact',
    toolbarDensityStandard: 'Standard',
    toolbarDensityComfortable: 'Confortable',
    toolbarColumns: 'Colonnes',
    toolbarColumnsLabel: 'Afficher/masquer les colonnes',
    toolbarFilters: 'Filtres',
    toolbarFiltersLabel: 'Afficher/masquer les filtres',
    toolbarExport: 'Exporter',
    toolbarExportLabel: 'Exporter les données',
    toolbarExportCSV: 'Télécharger en CSV',
    toolbarExportPrint: 'Imprimer',
    // Pagination
    paginationLabel: '{from} - {to} sur {count}',
    paginationNoRowsLabel: 'Aucune ligne',
    paginationPage: 'Page',
    paginationRowsPerPage: 'Lignes par page',
    paginationRowsPerPage: 'Lignes par page',
    paginationRowsPerPageOptions: 'Options de lignes par page',
    // Other texts can be added here as needed
    // Filtering
    filterOperatorContains: 'Contient',
    filterOperatorEquals: 'Égal',
    filterOperatorStartsWith: 'Commence par',
    filterOperatorEndsWith: 'Finit par',
    filterOperatorIs: 'Est',
    filterOperatorIsNot: 'N\'est pas',
    filterOperatorAfter: 'Après',
    filterOperatorOnOrAfter: 'Le ou après',
    filterOperatorBefore: 'Avant',
    filterOperatorOnOrBefore: 'Le ou avant',
    filterOperatorIsEmpty: 'Est vide',
    filterOperatorIsNotEmpty: 'N\'est pas vide',
    // Sorting
    sortLabel: 'Trier',
    sortbyAsc: 'Trier par ordre croissant',
    sortbyDesc: 'Trier par ordre décroissant',
    // Column Management
    hideColumn: 'Masquer la colonne',
    // Column Management
    hideColumn: 'Masquer la colonne',
    showColumn: 'Afficher la colonne',
    manageColumns: 'Gérer les colonnes',
    // Other texts
    noRowsLabel: 'Aucune ligne',
    errorOverlayDefaultLabel: 'Une erreur est survenue.',
  };
  const [pageSize, setPageSize] = React.useState(25);
  const { autorisePigePresse,
    autorisePigeRadio,
    autorisePigeTv, client, email } = UseLoginStore((state) => state)
  const { sendDownloadLink,
    IsPressdataisFetched, ResePressdataisFetched, ExportExcelPending, DisplayEmailSent, CloseEmailExcel } =
    UsePigeDashboardStore((state) => state);
  const { getPigeCount, PigeCount, ResetPigeCount, count } = UseCountStore((state) => state)

  const [pressData, setPressData] = React.useState([])
  const { MediaData, getDataMedia, IsMediadataisFetched,
    ReseMediadataisFetched, FilterDataMediaByrangs, HandelErrorPopup,
    ErrorHandel

  } = UseMediaDashboardStore((state) => state);
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [popupData, setPopupData] = React.useState(null);
  const [popupDataLageData, setPopupDataLageData] = React.useState(false)
  const [showLoadingComponenet, setShowLoadingComponenet] = React.useState(true)
  const [open, setOpen] = React.useState(false);
  var list = [];
  var list2 = [];

  const [filteredData, setFilteredData] = React.useState(list);
  const [filteredData2, setFilteredData2] = React.useState(list2);
  React.useEffect(() => {
    if (media === "presse") {
      setPressData(MediaData)
      setFilteredData(MediaData)
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      //console.log("MediaData",MediaData)
      const newFilteredData = MediaData.map((elem) => ({
        id: elem.Id,
        Support_Lib: elem.Support_Lib,
        Période: elem.Période,
        Date: elem.Date,
        Message_Id: elem.Message_Id,
        Message_Lib: elem.Message_Lib,
        Produit_Lib: elem.Produit_Lib,
        Classe_Lib: elem.Classe_Lib,
        Format: `${elem.Format} - ${elem.NB_C} - ${elem.Rubrique}`,
        Format: elem.Format,
        NB_C: elem.NB_C,
        Rubrique: elem.Rubrique,
        Page: elem.Page,
        Annonceur_Lib: elem.Annonceur_Lib,
        Famille_Lib: elem.Famille_Lib,
        Secteur_Lib: elem.Secteur_Lib,
        Marque_Lib: elem.Marque_Lib,
        Version: elem.Version,
        Tarif: elem.Tarif,
        Période: elem.Période,
        Variété_Lib: elem.Variété_Lib,
        Année: elem.Année,
        Mois: elem.Mois,
      })).filter((item) =>
        Object.values(item).some((value) =>
          value?.toString()?.toLowerCase()?.includes(lowercasedSearchTerm)
        )
      );
      setFilteredData(newFilteredData);
    } else {
      //do nothing
    }


  }, [MediaData, searchTerm]);

  let i = 0;
  React.useEffect(() => {
    if (media !== "presse") {
      setFilteredData2(MediaData)
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const newFilteredData = MediaData.map((elem) => ({
        id: elem.Id,
        Support_Lib: elem.Support_Lib,
        Date: elem.Date,
        Message_Id: elem.Message_Id,
        Message_Lib: elem.Message_Lib,
        Produit_Lib: elem.Produit_Lib,
        Heure: elem.Heure,
        Durée: elem.Durée,
        Durée_Réelle: elem.Durée_Réelle,
        Rang: elem.Rang,
        Encombrement: elem.Encombrement,
        Annonceur_Lib: elem.Annonceur_Lib,
        Famille_Lib: elem.Famille_Lib,
        Secteur_Lib: elem.Secteur_Lib,
        Classe_Lib: elem.Classe_Lib,
        Marque_Lib: elem.Marque_Lib,
        Version: elem.Version,
        Tarif_30: elem.Tarif_30,
        Tarif: elem.Tarif,
        Variété_Lib: elem.Variété_Lib,
        Année: elem.Année,
        Mois: elem.Mois,
        Prog_avant: elem.Prog_avant,
        Prog_après: elem.Prog_après,
      })).filter((item) =>
        Object.values(item).some((value) => {
          if (value !== undefined && value !== null) {
            return value.toString().toLowerCase().includes(lowercasedSearchTerm);
          }
          return false;
        }
        )
      );
      setFilteredData2(newFilteredData);
      // console.log("newFilteredData2", newFilteredData);
    } else {
      //do nothing
    }

  }, [MediaData, searchTerm])

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 130,
    maxColumns: 6,
  });
  // Handle row click event
  const handleRowClick = (row) => {
    // Fetch additional information here if needed
    // For demonstration, we are setting the row data directly
    //console.log("row", row)
    setPopupData(row);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setPopupData(null);
  };
  const handleClosePopupLargeData = () => {
    setPopupDataLageData(false)
  }
  const handleClosePopupDataUnavailable = () => {
    HandelErrorPopup && HandelErrorPopup(false)
  }
  const [fetchDataTime, setFetchDataTime] = React.useState(0)
  const [popupOpenEmailexport, setPopupOpenEmailexport] = React.useState(false)
  React.useEffect(() => {
    setFetchDataTime(0)
    if (media === "radio" || media === 'television') {
      setLoading(false)
      setLoadingshow && setLoadingshow(false)
      setDataTableShow && setDataTableShow(false);
      setFilteredData([])
      setFilteredData2([])
    } else if (media === "presse") {
      setLoading(false)
      setLoadingshow && setLoadingshow(false)
      setDataTableShow && setDataTableShow(true);
      setFilteredData2([])
      setFilteredData([])
      //setLoadingshow(true)

    }
  }, [media, date1, date2,]);
  const [increment, setIncrement] = React.useState(0)
  const [callGetData, setCallGetData] = React.useState(-3)
  const [loadingWithCount, setLoadingWithCount] = React.useState(false)
  React.useEffect(() => {
    const startTime = new Date().getTime();
    setCallGetData(Number(count))
    if (Number(count) > 0 && Number(count) < 200000) {
      // alert('fetchdata')

      getDataMedia && getDataMedia(
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
        rangs,
        date1,
        date2
      )
      if (media === "presse") {
        setDataTableShow(true)
        setLoadingshow(true)
        setPressData(MediaData)
      } else {
        setDataTableShow(false)
        setLoadingshow(true)
      }

    } else if (Number(count) > 200000) {
      // alert('data too large')
      setPopupDataLageData(true)
      //Data Too Large
    } else if (Number(count) === 0) {
      //no data in this date
       //alert('data non available')
      HandelErrorPopup && HandelErrorPopup(true)
    } else if (Number(count) === -3) {
      //
    }
    const endTime = new Date().getTime();
    setFetchDataTime(endTime - startTime);
    ResetPigeCount && ResetPigeCount()
    setLoadingWithCount(false)
  }, [Number(count)])
  async function getData() {
    ResetPigeCount && ResetPigeCount()
    setLoadingWithCount(true)
    const pigeCountResult = await getPigeCount(
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
      date2
    );
    setIncrement(increment + 1)
    setCallGetData(Number(count))
  }
  //console.log('isloading in autmatic filters', loadingWithCount)
  React.useEffect(() => {
    ResePressdataisFetched && ResePressdataisFetched()
    setShowDataGridIfNotEmpty && setShowDataGridIfNotEmpty(true)
    setShowDataGrid && setShowDataGrid(false)
    if (filteredData.length > 0) {
      setTimeout(() => {
        setShowDataGridIfNotEmpty && setShowDataGridIfNotEmpty(true)
        setShowDataGrid && setShowDataGrid(true)
      }, 5000)
    } else if ((filteredData.length === 0 && IsPressdataisFetched)) {
      setShowDataGridIfNotEmpty && setShowDataGridIfNotEmpty(false)
      setShowDataGrid && setShowDataGrid(false)
    }

  }, [filteredData, increment])

  React.useEffect(() => {
    setShowDataGridIfNotEmpty && setShowDataGridIfNotEmpty(true)
    setShowDataGrid && setShowDataGrid(false)
    ReseMediadataisFetched && ReseMediadataisFetched()
    if (filteredData2.length > 0) {
      setTimeout(() => {
        setShowDataGridIfNotEmpty && setShowDataGridIfNotEmpty(true)
        setShowDataGrid && setShowDataGrid(true)
      }, 5000)
    } else if (filteredData2.length === 0) {
      setShowDataGridIfNotEmpty && setShowDataGridIfNotEmpty(true)
      setShowDataGrid && setShowDataGrid(false)
      if (IsMediadataisFetched == true) {
        setShowDataGridIfNotEmpty && setShowDataGridIfNotEmpty(false)
        setShowDataGrid && setShowDataGrid(true)
      }
    }
  }, [filteredData2, increment])

  const [loadingFilters, setLoadingFilters] = React.useState(false)
  const [fetchFilter, setFetchFilter] = React.useState(false)
  React.useEffect(() => {
    setFetchFilter(true)
  }, [media, date1, date2])
  const HandelSideBarPisition = async () => {
    if (fetchFilter === true) {
      //console.log("calling filters",fetchFilter)
      getFilters && getFilters(email, media, date1, date2)
      setTimeout(() => {
        ManageSideBarfilterDisplay && ManageSideBarfilterDisplay("0%")
      }, 5000);
      setFetchFilter(false)
    } else {
      //do nothing
      setLoadingFilters(false)
      ManageSideBarfilterDisplay && ManageSideBarfilterDisplay("0%")
    }
    //setLoadingFilters(true)
    setPopupDataLageData(false) 
  }
  const handeToggleSideBar = () => {
    ManageSideBarfilterDisplay('-100%');
  }
  React.useEffect(() => {
    if (filteredData2.length !== 0) {
      FilterDataMediaByrangs && FilterDataMediaByrangs(rangs, filteredData2, media)

    } else {
      //nothing
    }

  }, [rangs])
  //Responsive tool bar on top 
  const [mediaResponsive, setMediaResponsive] = React.useState(false)
  const [resStyle, setResStyle] = React.useState({
    justifyContent: 'space-between',
    width: "50%",
    widthRightbtns: '',
    paddingLeftBtn: "0px",
    widthLefbtnWrapper: '',
    justifyContentRightBtnWrapper: '',
    marginTopAll: '4%',
    jCToolbar: "space-between"
  });

  React.useEffect(() => {
    const handleResize = () => {
      setResStyle({
        FlexDirection: window.innerWidth < 1154 ? 'column' : 'row',
        back: window.innerWidth < 768 ? 'red' : 'yellow',
        width: window.innerWidth < 1154 ? '100%' : '50%',
        widthRightbtns: window.innerWidth < 1154 ? '100%' : 'fit-content',
        flexWrap: window.innerWidth < 1154 ? 'wrap' : 'nowrap',
        paddingLeftBtn: window.innerWidth < 1154 ? '10px' : '0px',
        MarginLoadingbtn: window.innerWidth < 1154 ? '0px' : '10px',
        widthLefbtnWrapper: window.innerWidth < 1154 ? '100%' : '',
        justifyContentRightBtnWrapper: window.innerWidth < 1154 ? 'space-between' : 'center',
        marginTopAll: window.innerWidth < 1154 ? '14vh' : '4%',
        marginBtm: window.innerWidth < 1154 ? '10px' : '0px',
        widthImage: window.innerWidth < 1154 ? '250px' : '250px',
        jCToolbar: window.innerWidth < 1154 ? 'center' : 'space-between',
        DisplayRechecheAvance: window.innerWidth < 1154 ? true : false,
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // console.log('is loadind', !showDataGrid && showDataGridIfNotEmpty)
  const [notAllowed, setNotAllowed] = React.useState(false);
  const exportToExcel = () => {
    if (Filterannonceursids.length < 30) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 5000);

      sendDownloadLink && sendDownloadLink(
        email,
        date1,
        date2,
        media,
        Filterannonceursids,
        Filterproduitsids,
        Filtervarietiesids,
        Filtermarquesids,
        Filterfamilles,
        Filterclassesids,
        Filtersecteursids,
        client,

      )
    } else {
      setNotAllowed(true)
    }
  }
  const handleClosePopupExcelEmail = () => {
    CloseEmailExcel && CloseEmailExcel()
  }
  if (!(autorisePigePresse || autorisePigeRadio || autorisePigeTv) && client) {
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
            vous n'êtes pas abonnés
          </b>

        </Row>
      </Container>)
  }

  if (!client) {
    history.push('/login')
  }
  return (
    <div style={{
      height: "auto", width: "100%", padding: "2%",
      marginTop: resStyle.marginTopAll,


    }} >
      <div class="" style={{
        width: "100%",
      }}>

        <div class="" style={{
          display: "flex", flexWrap: "nowrap",
          alignItems: "center", marginBottom: "10px",
          flexDirection: resStyle.FlexDirection,

          justifyContent: resStyle.jCToolbar
        }}>
          <div class="" style={{
            marginLeft: "0px", display: "flex",
            justifyContent: "space-between", alignItems: "center",
            width: resStyle.widthRightbtns,
            flexDirection: resStyle.FlexDirection,

          }}>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <MultipleSelectMedia />
              {mediaResponsive && (<div><MultipleSelectMedia /></div>)}
              {resStyle.DisplayRechecheAvance && (
                <LoadingButtonData
                  getData={HandelSideBarPisition}
                  isloading={FilterLoading}
                  isSucces={(showDataGridIfNotEmpty && showDataGrid && filteredData2.length > 0)}
                  //disablebtn={!(showDataGridIfNotEmpty && showDataGrid && filteredData2.length > 0)} 
                  disablebtn={!media}
                  title="Recherche avancée"
                />
              )}
            </div>
           
            <div style={{ width: "100%", height: "auto", marginTop: resStyle.paddingLeftBtn }}>
              <DateRangeTest />
            </div>
          </div>
          <div style={{
            display: "flex", width: resStyle.width,
            justifyContent: "flex-end", alignItems: "center",
            paddingTop: resStyle.paddingLeftBtn
          }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: resStyle.justifyContentRightBtnWrapper,
              width: resStyle.widthRightbtns
            }}>
              <ExportExcelBtn
                getData={exportToExcel}
                disablebtn={!media || ExportExcelPending}
                isloading={ExportExcelPending}
                isSucces={ExportExcelPending}
                title="Exporter"

              />

              <LoadingButtonData
                getData={getData}
                //isloading={loadingshow && (!showDataGrid && showDataGridIfNotEmpty)}
                isloading={loadingWithCount}
                isSucces={(showDataGridIfNotEmpty && showDataGrid && filteredData2.length > 0)}
                //disablebtn={!(showDataGridIfNotEmpty && showDataGrid && filteredData2.length > 0)} 
                disablebtn={!media}
                title="Afficher"
                mr={resStyle.MarginLoadingbtn}
              />

              {!resStyle.DisplayRechecheAvance && (
                <LoadingButtonData
                  getData={HandelSideBarPisition}
                  isloading={FilterLoading}
                  isSucces={(showDataGridIfNotEmpty && showDataGrid && filteredData2.length > 0)}
                  //disablebtn={!(showDataGridIfNotEmpty && showDataGrid && filteredData2.length > 0)} 
                  disablebtn={!media}
                  title="Recherche avancée"
                />
              )}
              <AutomaticSideFilterBar getData={getData} />

            </div>
          </div>
        </div>

        <div style={{ width: "100%" }} onClick={() => handeToggleSideBar()}>
          {dataTableShow && (
            <div style={{
              display: "flex",
              justifyContent: "center", width: "100%", padding: "0px"
            }}>
              {loadingshow ? (
                <Box sx={{ marginBottom: "0px", width: "100%", }}>

                  {(showDataGridIfNotEmpty && showDataGrid && filteredData.length) && (
                    <DataGrid
                      className="table_styling"
                      density="compact"
                      style={{ marginBottom: "0px", width: '100%', backgroundColor: "white" }}
                      rows={filteredData}
                      columns={columns}
                      pagination
                      pageSize={pageSize}
                      initialState={{
                        columns: {
                          columnVisibilityModel: {
                            famille: true,
                            id: false,
                            annonceur: false,
                            categorie: true,
                            marque: true,
                            classe: true,
                            pub: false,
                            version: false,
                            tarif: false,
                            periode: false,
                            variete: true,
                            annee: false,
                            langue: false,
                            mois: false,
                            supprimer: false,

                          },
                        },
                      }}
                      slots={{
                        toolbar: CustomToolbar,
                      }}
                      slotProps={{
                        toolbar:
                        {
                          filteredData: filteredData, filteredData2:
                            filteredData2, columns: columns, columns2: columns2,
                          setSearchTerm: setSearchTerm, searchTerm: searchTerm,
                          handelOpenRechercheAvance: HandelSideBarPisition,

                        }
                      }}
                      pageSizeOptions={[25, 50, 80, 100]}
                      //
                      getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'light-blue-row' : 'normal-row')}
                      localeText={frenchLocaleText}
                    />)}
                  {(!showDataGrid && showDataGridIfNotEmpty) && (<LoadingLineIndicator totalDuration={fetchDataTime} />)}
                  {(Number(count) === 0) && (<div>
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
                        borderRadius: "5px"
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
                        <b style={{ color: "#00a6e0" }}>Aucune données {media} n'as été enregistrée. Veuillez changer la date. </b>

                      </Row>
                    </Container></div>)}
                </Box>
              ) : (<div className="w-100 justify-content-center" style={{ display: "flex" }}>
                <img src={TableIlustration} alt="immar media"
                  width={resStyle.widthImage} height={resStyle.widthImage} />
              </div>
              )

              }
            </div>

          )}
          {!dataTableShow && (
            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
              {loadingshow ? (

                <Box sx={{ marginBottom: 20, width: "100%" }}>
                  {(showDataGridIfNotEmpty && showDataGrid && filteredData2.length > 0) && (
                    <DataGrid
                      density="compact"
                      style={{
                        marginBottom: 10,
                        width: '100%',
                        backgroundColor: "white",
                        boxShadow: 2,
                        border: 2,
                        borderColor: 'primary.light',
                      }}

                      rows={filteredData2}
                      columns={columns2}
                      pageSize={pageSize}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: pageSize },
                        },
                        columns: {
                          columnVisibilityModel: {
                            famille: false,
                            id: false,
                            annonceur: false,
                            categorie: false,
                            classe: false,
                            marque: false,
                            heure: false,
                            prog_avant: true,
                            prog_apres: true,
                            pub: false,
                            version_pub: false,
                            version: false,
                            tarif: false,
                            periode: false,
                            variete: false,
                            annee: false,
                            langue: false,
                            mois: false,
                            supprimer: false,
                            url: false,
                            utilisateurs: false,
                          },
                        },

                      }}
                      pageSizeOptions={[25, 50, 80, 100]}
                      slots={{
                        toolbar: CustomToolbar,
                      }}
                      slotProps={{
                        toolbar:
                        {
                          filteredData: filteredData, filteredData2:
                            filteredData2, columns: columns, columns2: columns2,
                          setSearchTerm: setSearchTerm, searchTerm: searchTerm,
                          handelOpenRechercheAvance: HandelSideBarPisition,

                        }
                      }}
                      getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'light-blue-row' : 'normal-row')}
                      //checkboxSelection
                      localeText={frenchLocaleText}

                    />)}

                  {(!showDataGrid && showDataGridIfNotEmpty) && (<LoadingLineIndicator totalDuration={fetchDataTime} />)}

                  {(Number(count) === 0) && (<div>

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
                        borderRadius: "5px"
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
                    </Container>
                  </div>)}
                </Box>
              ) : (
                <div className="w-100 justify-content-center" style={{
                  display: "flex",
                  justifyContent: "center", alignItems: "start"
                }}>

                  <img
                    src={TableIlustration}
                    alt="immar media"
                    width={resStyle.widthImage} height={resStyle.widthImage} />
                  {/* <CircularProgressWithLabel value={50} /> */}
                  {/* <LinearIndeterminate/> */}
                </div>
              )
              }
            </div>
          )}
        </div>
      </div>
      {/* data too large */}
      <LargeDataPopup
        media={media}
        popupDataLageData={popupDataLageData}
        handleClosePopupLargeData={handleClosePopupLargeData}
        HandelSideBarPisition={HandelSideBarPisition}
      />
      {/* Popup Dialog Message*/}

      <MessageLibPopUp popupOpen={popupOpen}
        handleClosePopup={handleClosePopup}
        popupData={popupData}
        media={media}
      />
      {/* Popup Dialog Email export envoyé */}
      <ExcelEmailPopup
        DisplayEmailSent={DisplayEmailSent}
        handleClosePopupExcelEmail={handleClosePopupExcelEmail}
        email={email}
      />
      {/* Data non disponible */}
      <DataUnavailablePopup
        HandelErrorPopup={HandelErrorPopup}
        ErrorHandel={ErrorHandel}
        media={media}
        handleClosePopup={handleClosePopupDataUnavailable}
      />
    </div>
  );
}
