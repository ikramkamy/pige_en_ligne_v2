import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { UsePigeDashboardStore } from "store/dashboardStore/PigeDashboardStore";
import { UseMediaDashboardStore } from "store/dashboardStore/MediaDashboardStore";
import AnchorTemporaryDrawer from '../components/FixedPlugin/SideDrawer';
import LoadingButtonData from 'components/Commun/LoadingBtnData';
import * as XLSX from 'xlsx';
import Alert from '@mui/material/Alert';
import CustomToolbar from 'components/Commun/CustomToolBar'
import WarningIcon from '@mui/icons-material/Warning';
import AutomaticSideFilterBar from "components/FixedPlugin/AutomatiSideFilterBar";
import LoadingButtonFilter from "components/Commun/LoadingBtnFilters";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { UseFiltersStore } from "../store/dashboardStore/FiltersStore";
import MultipleSelectMedia from "../components/Commun/MediaSelect";
import ResponsiveDateRangePickers from "../components/Commun/DatePicker";
import Input from "@mui/material/Input";
import illustration from "assets/img/animated.gif";
import { useDemoData } from '@mui/x-data-grid-generator';
import { UseLoginStore } from "../store/dashboardStore/useLoginStore";
import { Container, Row, Col } from "react-bootstrap";
import LoadingIndicator from "components/Commun/LoadingIndcator";
import TableIlustration from 'assets/tableSearch.gif'

import LoadingLineIndicator from "components/Commun/LineLoading";
import { Link, useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import DateRangeTest from "components/Commun/DateRangePickerTest";
import '../components/Commun/commun.css'
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
    getFilters
  } = UseFiltersStore((state) => state);
  const widthSmallData = 200
  const widthXsmallData = 70
  const widthLargeData = 250
  const columns = [
    { field: "Id", headerName: "Id", width: 130, hide: false },
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
      field: "Message_Lib",
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
    { field: "Id", headerName: "Id", width: 130 },
    { field: "Support_Lib", headerName: "Support", width: 130 },
    { field: "Date", headerName: "Date", width: 130 },
    { field: "Produit_Lib", headerName: "Produit", width: widthLargeData, sortable: true },
    {
      field: "Message_Lib",
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
    { field: "Version", headerName: "Version Pub", width: 130, sortable: true, hide: false },
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
    autorisePigeTv ,client,email} = UseLoginStore((state) => state)
  const { getDataPresse,sendDownloadLink, 
    IsPressdataisFetched, ResePressdataisFetched } =
     UsePigeDashboardStore((state) => state);

const [PressData,setPressData]=React.useState([])
  const { MediaData, getDataMedia, IsMediadataisFetched, 
    ReseMediadataisFetched, FilterDataMediaByrangs } = UseMediaDashboardStore((state) => state);
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [popupData, setPopupData] = React.useState(null);
  const [popupDataLageData, setPopupDataLageData] = React.useState(false)
  const [showLoadingComponenet, setShowLoadingComponenet] = React.useState(true)
  var list = [];
  var list2 = [];
  const dataArray = PressData?.map((elem) => {
    var item = {
      Id: elem.Id, // Matches "Id"
      Support_Lib: elem.Support_Lib, // Matches "Support_Lib"
      Date: elem.Date, // Matches "Date"
      Produit_Lib: elem.Produit_Lib, // Matches "Produit_Lib"
      Classe_Lib: elem.Classe_Lib, // Matches "Classe_Lib"
      Format: `${elem.Format} - ${elem.NB_C} - ${elem.Rubrique}`, // Matches "Format", combined values
      Page: elem.Page, // Matches "Page"
      Annonceur_Lib: elem.Annonceur_Lib, // Matches "Annonceur_Lib"
      Famille_Lib: elem.Famille_Lib, // Matches "Famille_Lib"
      Secteur_Lib: elem.Secteur_Lib, // Matches "Secteur_Lib"
      Marque_Lib: elem.Marque_Lib, // Matches "Marque_Lib"
      Version: elem.Version, // Matches "Version"
      Tarif: elem.Tarif, // Matches "Tarif"
      Période: elem.Période, // Matches "Période"
      Variété_Lib: elem.Variété_Lib, // Matches "Variété_Lib"
      Année: elem.Année, // Matches "Année"
      Mois: elem.Mois, // Matches "Mois"
      Message_Lib: elem.Message_Lib, // Matches "Message_Lib"
    };
    
    return list.push(item);
  });

  const dataArray2 = MediaData?.map((elem) => {
    var item2 = {
      Id: elem.media_id,
      Support_Lib: elem.support,
      Date: elem.media_Date,
      Produit_Lib: elem.Product_Name,
      Message_Lib: elem.Pub_ID,
      Heure: elem.media_Hour,
      Durée: elem.Pub_Format,
      Rang: elem.Pub_Rank,
      Encombrement: elem.media_Encomb,
      Annonceur_Lib: elem.annonceur,
      Famille_Lib: elem.famille,
      Secteur_Lib: elem.categorie,
      Classe_Lib: elem.groupe,
      Marque_Lib: elem.marque,
      Version: elem.pubVersion,
      Tarif: elem.tarif,
      Variété_Lib: elem.variete,
      Année: elem.annee,
      Mois: elem.mois,
      Prog_avant: elem.Prog_Avant,
      Prog_après: elem.Prog_Apres
    };
    
    return list2.push(item2);
  });
  const [filteredData, setFilteredData] = React.useState(list);
  const [filteredData2, setFilteredData2] = React.useState(list2);

  React.useEffect(() => {
    console.log("calling use effect presse")
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const newFilteredData = PressData.map((elem) => ({
      id: elem.Insertion_Id,
      Titre_Lib: elem.Titre_Lib,
      date: elem.Insertion_Date,
      message: elem.PressePub_Id,
      produit: elem.Produit_Lib,
      classe: elem.Groupe_Lib,
      //couleur: elem.PressePub_Couleur,
      couleur: `${elem.format} - ${elem.PressePub_Couleur} - ${elem.Rubrique}`,
      format: elem.format,
      PressePub_Couleur: elem.PressePub_Couleur,
      Rubrique: elem.Rubrique,
      page: elem.PressePub_Format,
      PressePub_Lib: elem.PressePub_Lib,
      annonceur: elem.Annonceur_Nom,
      famille: elem.Famille,
      categorie: elem.Categorie_lib,
      marque: elem.Marque_Lib,
      pub: elem.PressePub_Lib,
      version: elem.PressePub_Version,
      tarif: elem.Tarif,
      periode: elem.Titre_Period,
      variete: elem.Variete_lib,
      annee: elem.annee,
      // langue:elem.langue,
      mois: elem.mois,
      // supprimer:elem.supprimer,
      // url:elem.url,
      // utilisateurs:elem.utilisateurs,

    })).filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(lowercasedSearchTerm)
      )
    );
    setFilteredData(newFilteredData);
    //console.log("newFilteredData", newFilteredData);
  }, [searchTerm, PressData]);
  let i = 0;
  React.useEffect(() => {
    console.log("calling use effect media",MediaData )
    setFilteredData2(MediaData)
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const newFilteredData = MediaData.map((elem) => ({
      id: elem.media_id,
      Titre_Lib: elem.support,
      date: elem.media_Date,
      message: elem.Pub_ID,
      produit: elem.Product_Name,
      heure: elem.media_Hour,
      duree: elem.Pub_Format,
      rang: elem.Pub_Rank,
      encomb: elem.media_Encomb,
      annonceur: elem.annonceur,
      famille: elem.famille,
      categorie: elem.categorie,
      classe: elem.groupe,
      marque: elem.marque,
      version_pub: elem.pubVersion,
      tarif: elem.tarif,
      variete: elem.variete,
      annee: elem.annee,
      mois: elem.mois,
      // utilisateur:elem.utilisateur,
      // langue:elem.langue,
      prog_avant: elem.Prog_Avant,
      prog_apres: elem.Prog_Apres,
    })).filter((item) =>
      Object.values(item).some((value) => {
        if (value !== undefined && value !== null) {
          return value.toString().toLowerCase().includes(lowercasedSearchTerm);
        }
        return false;
        // value.toString().toLowerCase().includes(lowercasedSearchTerm)
      }
      )
    );

    setFilteredData2(newFilteredData);
    if (MediaData.length > 100000) {
      setPopupDataLageData(true)
    } else {
      setPopupDataLageData(false)
    }
    // console.log("newFilteredData2", newFilteredData);
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
    console.log("row", row)
    setPopupData(row);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setPopupData(null);
  };
  const handleClosePopupLargeData = () => {
    setPopupOpenEmailexport(true)
    setTimeout(() => {
      setPopupOpenEmailexport(false)
    }, 2000);

    console.log("call large")
    setPopupDataLageData(false)
    sendDownloadLink && sendDownloadLink(Filtersupports, Filterannonceursids, Filterproduitsids, date1, date2, media)


  }
  //const [dataTableShow, setDataTableShow] = React.useState(false);
  const [fetchDataTime, setFetchDataTime] = React.useState(0)
  const [popupOpenEmailexport, setPopupOpenEmailexport] = React.useState(false)
  React.useEffect(() => {
    setFetchDataTime(0)
    console.log("calling use effect")
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
  }, [media, date1, date2,
    // Filtersupports,
    // Filterfamilles,
    // Filterclassesids,
    // Filtersecteursids,
    // Filtervarietiesids,
    // Filterannonceursids,
    // Filtermarquesids,
    // Filterproduitsids,
  
  ]);
  const [increment, setIncrement] = React.useState(0)
  const exportToExcel = () => {
    // Convert JSON data to worksheet
    console.log(filteredData)
    var dataToexport = [];

    if (media == 'presse') {
      dataToexport = filteredData;
    } else {
      dataToexport = filteredData2;
    }
    const worksheet = XLSX.utils.json_to_sheet(dataToexport, { header: columns.map(col => col.field) });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write the workbook to file
    XLSX.writeFile(workbook, 'data.xlsx');
  }
  const handelSendingLink = () => {
    sendDownloadLink && sendDownloadLink(Filtersupports, Filterannonceursids,
      Filterproduitsids, date1, date2, media, client, email, user_id)
  }
  const getData = () => {
    //console.log("calling get data")
    const startTime = new Date().getTime();
    //console.log("Filtermarquesids to gat data with", Filtermarquesids)
    if (media === "presse") {
      setDataTableShow(true)
      setLoadingshow(true)
      setPressData(MediaData)
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
    } else {
      setDataTableShow(false)
      setLoadingshow(true)
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
    }
    const endTime = new Date().getTime();
    setFetchDataTime(endTime - startTime);
  }
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
        console.log("data is really emtpy", IsMediadataisFetched)
        setShowDataGridIfNotEmpty && setShowDataGridIfNotEmpty(false)
        setShowDataGrid && setShowDataGrid(true)
      }
    }
  }, [filteredData2, increment])

  const [loadingFilters,setLoadingFilters]=React.useState(false)
  const HandelSideBarPisition = async() => {
  setLoadingFilters(true)
  try {
    await getFilters && getFilters(email,media,date1,date2) 
  } catch (error) {
    alert("Filtres introuvables")
  }
     console.log('filtres trouvé')
    setPopupDataLageData(false)
    setLoadingFilters(false)
    ManageSideBarfilterDisplay && ManageSideBarfilterDisplay("0%")
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
const [mediaResponsive,setMediaResponsive]=React.useState(false)
  const [resStyle, setResStyle] = React.useState({
    justifyContent: 'space-between',
    width: "50%",
    widthRightbtns: '',
    paddingLeftBtn: "0px",
    widthLefbtnWrapper: '',
    justifyContentRightBtnWrapper: '',
    marginTopAll: '4%',
    jCToolbar:"space-between"
  });

  React.useEffect(() => {
    const handleResize = () => {
      setResStyle({
        FlexDirection: window.innerWidth < 768 ? 'column' : 'row',
        back: window.innerWidth < 768 ? 'red' : 'yellow',
        width: window.innerWidth < 768 ? '100%' : '50%',
        widthRightbtns: window.innerWidth < 768 ? '100%' : 'fit-content',
        flexWrap: window.innerWidth < 768 ? 'wrap' : 'nowrap',
        paddingLeftBtn: window.innerWidth < 768 ? '10px' : '0px',
        widthLefbtnWrapper: window.innerWidth < 768 ? '100%' : '',
        justifyContentRightBtnWrapper: window.innerWidth < 768 ? 'space-between' : 'center',
        marginTopAll: window.innerWidth < 768 ? '14vh' : '4%',
        marginBtm: window.innerWidth < 768 ? '10px' : '0px',
        widthImage: window.innerWidth < 768 ? '250px' : '250px',
         jCToolbar:window.innerWidth < 768 ? 'center' : 'space-between'
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  console.log('is loadind', !showDataGrid && showDataGridIfNotEmpty)
  
  if(!(autorisePigePresse || autorisePigeRadio || autorisePigeTv)){
    return(
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
        marginTop:"12%"
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
      <div class="" style={{ width: "100%" , 
       }}>

        <div class="" style={{
          display: "flex", flexWrap: "nowrap",
          alignItems: "center", marginBottom: "10px",
          flexDirection:resStyle.FlexDirection,
         
         justifyContent:resStyle.jCToolbar
        }}>
          <div class="" style={{
            marginLeft: "0px", display: "flex",
            justifyContent: "space-between", alignItems: "center",
            width: resStyle.widthRightbtns,
            flexDirection:resStyle.FlexDirection,
        
          }}>
            <div style={{display:"flex",justifyContent:"space-between",width:"100%" }}>
              <MultipleSelectMedia />
              {mediaResponsive &&(<div><MultipleSelectMedia /></div>)}
            </div>
            <div style={{ width: "100%", height: "auto",marginTop:resStyle.paddingLeftBtn}}>
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
              <LoadingButtonData
                getData={getData}
                isloading={loadingshow && (!showDataGrid && showDataGridIfNotEmpty)}
                isSucces={(showDataGridIfNotEmpty && showDataGrid && filteredData2.length > 0)}
                //disablebtn={!(showDataGridIfNotEmpty && showDataGrid && filteredData2.length > 0)} 
                disablebtn={!media}
                title="Afficher"
              />
              <LoadingButtonData
                getData={HandelSideBarPisition}
                isloading={loadingFilters}
                isSucces={(showDataGridIfNotEmpty && showDataGrid && filteredData2.length > 0)}
                //disablebtn={!(showDataGridIfNotEmpty && showDataGrid && filteredData2.length > 0)} 
                disablebtn={!media && !date1 && !date2}
                title="Recherche avancée"              
              />
             
              <AutomaticSideFilterBar getData={getData} />
              {/* <Button onClick={handelSendingLink}>download</Button> */}
              {/* <AnchorTemporaryDrawer getData={getData}
                isloading={loadingshow && (!showDataGrid && showDataGridIfNotEmpty)}
                isSucces={(showDataGridIfNotEmpty && showDataGrid && filteredData2.length > 0)}
                disablebtn={!(showDataGridIfNotEmpty && showDataGrid && filteredData2.length > 0)}
              /> */}
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
                      style={{ marginBottom: "0px", width: '100%', backgroundColor: "white" }}
                      rows={filteredData}
                      columns={columns}
                      pagination
                      pageSize={pageSize}
                      //onPageSizeChange={(newPageSize) => setPageSize(newPageSize)} // Update page size on change
                      //rowsPerPageOptions={[30, 50, 100]} // Options for page size
                      initialState={{
                        // pagination: {
                        //   paginationModel: { page: 0, pageSize: pageSize },
                        // },

                        columns: {
                          columnVisibilityModel: {
                            famille: true, // Hide the 'famille' column by default
                            id: false,
                            annonceur: false,
                            categorie: true,
                            marque: true,
                            classe: true,
                            pub: false,
                            // version_pub:false,
                            version: false,
                            tarif: false,
                            periode: false,
                            variete: true,
                            annee: false,
                            langue: false,
                            mois: false,
                            supprimer: false,
                            // url:false,
                            // utilisateurs:false,
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
                          handelOpenRechercheAvance:HandelSideBarPisition,
                          
                        }
                      }}
                      pageSizeOptions={[25, 50, 80, 100]}
                      //
                      getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'light-blue-row' : 'normal-row')}
                      localeText={frenchLocaleText}
                    />)}
                  {(!showDataGrid && showDataGridIfNotEmpty) && (<LoadingLineIndicator totalDuration={fetchDataTime} />)}
                  {(!showDataGridIfNotEmpty && !showDataGridIfNotEmpty) && (<div>  <Container
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
                {/* <CircularProgressWithLabel value={50} /> */}
                {/* <LinearIndeterminate/> */}

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
                      style={{
                        marginBottom: 10,
                        width: '100%',
                        backgroundColor: "white",
                        boxShadow: 2,
                        border: 2,
                        borderColor: 'primary.light',
                        '& .MuiDataGrid-cell:hover': {
                          color: 'primary.main',
                        },
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
                          handelOpenRechercheAvance:HandelSideBarPisition,
                          
                        }
                      }}
                      getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'light-blue-row' : 'normal-row')}
                      //checkboxSelection
                      localeText={frenchLocaleText}
                      
                    />)}

                  {(!showDataGrid && showDataGridIfNotEmpty) && (<LoadingLineIndicator totalDuration={fetchDataTime} />)}

                  {(!showDataGridIfNotEmpty && !showDataGridIfNotEmpty) && (<div>

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
      <Dialog open={popupDataLageData} onClose={handleClosePopupLargeData}>
        {/* <DialogTitle>Taille de donnée large </DialogTitle> */}


        <Container
          fluid
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            padding: "20%"
          }}
        >
          <Row >
            <div style={{
              display: 'flex', flexDirection: "column",
              alignItems: 'center', justifyContent: 'center'
            }}>
              <WarningIcon style={{
                marginRight: '18px',
                marginBottom: "18px", fontSize: '54px', color: 'eba4a8'
              }} />
              <span style={{ textAlign: "center" }}>
                Cliquez sur <span style={{ color: "#1DC7EA" }}>exporter</span>
                pour recevoir un lien de téléchargement.
                Pour une recherche plus ciblée, veuillez cliquer sur
                <span style={{ color: "#1DC7EA" }}>recherche avancée</span>
              </span>
            </div>
          </Row>
          <DialogActions sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px"
          }}>

            <Col style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                sx={{
                  textTransform: "none",
                  //marginRight: "10px",
                  width: "150px",
                  textTransform: "none",
                  backgroundColor: '#00a6e0',
                  textTransform: "none",
                  width: "fit-content",
                  color: '',
                  '&:hover': {
                    backgroundColor: '#00a6e0',
                  }
                }}
                variant="contained"

                onClick={handleClosePopupLargeData} color="primary">
                Exporter
              </Button>
              <Button
                onClick={HandelSideBarPisition}
                disabled={!media}
                sx={{
                  textTransform: "none",
                  width: "150px",
                  textTransform: "none",
                  margin: "0px",
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
            </Col>
            {/* <AnchorTemporaryDrawer getData={getData}

              isloading={loadingshow && (!showDataGrid && showDataGridIfNotEmpty)}
              isSucces={(showDataGridIfNotEmpty && showDataGrid && filteredData2.length > 0)}
              disablebtn={!(showDataGridIfNotEmpty && showDataGrid && filteredData2.length > 0)}
            /> */}
          </DialogActions>
        </Container>

      </Dialog>


      {/* Popup Dialog */}
      <Dialog open={popupOpen} onClose={handleClosePopup}>
        <DialogTitle>Details</DialogTitle>
        <DialogContent>
          {popupData ? (
            <>
              <Typography variant="h6">Id: {popupData.id}</Typography>
              <Typography variant="body1">
                Support: {popupData.Titre_Lib}
              </Typography>
              <Typography variant="body1">Date: {popupData.date}</Typography>
              <Typography variant="body1">
                Produit: {popupData.produit}
              </Typography>
              <Typography variant="body1">
                Format: {media ? (media === "presse" ? popupData.couleur : popupData.duree) : popupData.Pub_Format}


              </Typography>
              {media ? (
                media === "presse" ? (
                  <Typography variant="body1">
                    Page: {popupData.page}
                  </Typography>
                ) : ""
              ) : ""}

              <Typography variant="body1">
                Msg: {media === "presse" ? popupData.PressePub_Lib : popupData.message}
              </Typography>
            </>
          ) : (
            <Typography>No data available</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>


      {/* Popup Dialog Email export envoyé */}
      <Dialog open={popupOpenEmailexport}>
        {/* <DialogTitle>Details</DialogTitle> */}
        <DialogContent sx={{ width: "100%" }}>
          <Typography sx={{ width: "100%" }}>

            <Alert severity="success"

              sx={{
                width: '100%',

              }}
            >Un email a été envoyé à l'adresse suivante:

              {email}

            </Alert>

          </Typography>

        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClosePopup} color="primary">
            Fermer
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
