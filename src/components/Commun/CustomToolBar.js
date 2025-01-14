import { useState } from 'react';
import dayjs from "dayjs";
import {
  GridToolbar, GridToolbarContainer, GridToolbarExport, GridToolbarColumnsButton,
  GridToolbarDensitySelector, GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import InputSearchKeyWord from 'components/Commun/InputSearchKeyWord'
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { UseFiltersStore } from 'store/dashboardStore/FiltersStore';
import { UsePigeDashboardStore} from 'store/dashboardStore/PigeDashboardStore';
import * as XLSX from 'xlsx';
import './commun.css';
import { UseLoginStore } from 'store/dashboardStore/useLoginStore';
import EmailPigeAlert from 'components/Commun/EmailPigeAlert'
import Dialog from '@mui/material/Dialog';
import {Typography} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import logoImmar from "assets/images.png";
import Alert from '@mui/material/Alert';
import { Container, Row, Col } from "react-bootstrap";
import WarningIcon from '@mui/icons-material/Warning';
import ExcelIcon from 'assets/img/icons/xls-file.png'
const CustomToolbar = ({ filteredData, filteredData2, columns, columns2, searchTerm, 
  setSearchTerm,
  handelOpenRechercheAvance
}) => {
  const { media, date1, date2, Filtersupports, annonceurs, produits,
    Filterfamilles,
    Filterclassesids,
    Filtersecteursids,
    Filtervarietiesids,
    Filterannonceursids,
    Filtermarquesids,
    rangs,
    loadingshow,
    setLoadingshow,
    Filterproduitsids, setPageSize, pageSize } = UseFiltersStore((state) => state)
  const user_email = window.localStorage.getItem('user_email')
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
  const [notAllowed, setNotAllowed] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { sendDownloadLink } = UsePigeDashboardStore((state) => state)

  const today = dayjs();
  const formattedDate = today.format('DD/MM/YYYY');
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
    sortAsc: 'Trier par ordre croissant',
    sortDesc: 'Trier par ordre décroissant',
    // Sorting
    sortLabel: 'Trier',
    sortAsc: 'Trier par ordre croissant',
    sortDesc: 'Trier par ordre décroissant',
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
  const exportToExcel = () => {
    if(Filterannonceursids<30){
      handleClickOpen()
      sendDownloadLink && sendDownloadLink(Filtersupports, Filterannonceursids,
        Filterproduitsids, date1, date2, media,
        client,
        email,
        user_id,    
      )
    }else{
      setNotAllowed(true)
    }
   
  }

  const { userIdentifications } = UseLoginStore((state) => state)
  //window.localStorage.setItem('pageSize', 100)
  //const pageSize= window.localStorage.getItem('pageSize');
  const handelchange = (size) => {
    setPageSize && setPageSize(size)
    // window.localStorage.setItem('pageSize', size)
    // console.log('page size',size)
    // console.log("pageSize from local storage", pageSize)
    // //return pageSize ? parseInt(pageSize, 10) : 30; 
  }
  const handeldownloadExcelFile = () => {
    console.log("link to download")

  }
  //const [dataTableShow, setDataTableShow] = React.useState(false);
  const client = window.localStorage.getItem('user_name')
  const user_id = window.localStorage.getItem('user_id')
  const email = window.localStorage.getItem('user_email')
  const handeClosePopUpNotAllowed=()=>{
    setNotAllowed(false)
    handelOpenRechercheAvance()
  }
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      marginBottom: '0px', textTransform: 'none',
      textDecoration: "none",
      justifyContent: "center",
    }}>
      <GridToolbarContainer
        sx={{
          textTransform: '',
          backgroundColor: "#f8f9fa",

          //marginRight: 2,
          color: "red",
          display: "flex",
          justifyContent: "space-between",
          width: "100%"
        }}
        localeText={frenchLocaleText}
      >
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarFilterButton />

        {/* <GridToolbarExport    exportToExcel={true} fileExtension/> */}

        <div style={{
          color: "#007bff", cursor: "pointer",
          fontSize: "0.8125rem", fontWeight: "400",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }} onClick={exportToExcel}>
        <img src={ExcelIcon} alt="excel file" />
          {/* <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium 
     css-i4bv87-MuiSvgIcon-root"
            style={{ color: "#007bff", width: "19px", marginRight: "2px" }}
            focusable="false" aria-hidden="true" viewBox="0 0 24 24"
             data-testid="SaveAltIcon">
            <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 
            2h14c1.1 0 2-.9 2-2v-7h-2zm-6 
            .67l2.59-2.58L17 11.5l-5 5-5-5 
            1.41-1.41L11 12.67V3h2z"></path>
            </svg> */}
          Exporter
        </div>
        <GridToolbarQuickFilter />
        {/* <InputSearchKeyWord  setSearchTerm={setSearchTerm} searchTerm={searchTerm} 
     /> */}
        <Dialog
          // fullWidth={fullWidth}
          // maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
        >
          <div style={{ whidth: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {/* <img src={logoImmar} alt="immar media" width="100px" /> */}
            
            </div>
          <DialogTitle>Pige  {media === "radio"
            ? "Radio"
            : media === "presse"
              ? "Presse"
              : media === "television"
                ? "Télévision"
                : "Unknown media type"}</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              Un lien deTélechargement a été envoyé à l'address suivante
              <b style={{ marginLeft: "5px", marginRight: "5px" }}>{user_email}</b>.<br />
              veuillez vérifier SVP
            </DialogContentText> */}
            {/* <Box
              noValidate
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                m: 'auto',
                width: '500',
              }}
            >
            </Box> */}

            <Typography sx={{width:"100%"}}>
           
           <Alert severity="success"
           
           sx={{
            width:'100%',

           }}
           >Un lien de télèchargement a été envoyé à l'adresse suivante:
            
           {email}
            
            </Alert>   
          
         </Typography>
          </DialogContent>
          <DialogActions>

            <Button onClick={handleClose}>Retour</Button>
          </DialogActions>
        </Dialog>




           {/* nombre d'annoncerus dépasse le 30 on envoie pas une requette au backend */}
      <Dialog open={notAllowed} onClose={()=>setNotAllowed(false)}>
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
                vous avez atteint votre total max d'annonceurs !
                Pour une recherche plus ciblée, veuillez cliquer sur 

                <span style={{ color: "#1DC7EA" }}> recherche avancée</span>
              </span>
            </div>
          </Row>
          <DialogActions sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px"
          }}>

            <Col style={{ display: "flex", 
              justifyContent: "center",width:"100%",
             
              }}>
              <Button
                onClick={handeClosePopUpNotAllowed}
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

      </GridToolbarContainer>
      {/* <GridToolbarExport  csvOptions={csvOptions}/> */}

    </div>
  );
};

export default CustomToolbar;
