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
const CustomToolbar = ({filteredData,filteredData2,columns,columns2,searchTerm, 
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
    console.log('Filterannonceursids',Filterannonceursids)
    if(Filterannonceursids.length<30){
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      },5000);
      
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
        user_id,    
      )
    }else{
      
      setNotAllowed(true)
    }  
  }

  const { email } = UseLoginStore((state) => state)
  const handelchange = (size) => {
    setPageSize && setPageSize(size)
  }
  const handeldownloadExcelFile = () => {
    console.log("link to download")

  }
  const client = window.localStorage.getItem('user_name')
  const user_id = window.localStorage.getItem('user_id')
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
        <img src={ExcelIcon} alt="excel file" width="25px"/>
       
          Exporter
        </div>
        <GridToolbarQuickFilter />
        {/* <InputSearchKeyWord  setSearchTerm={setSearchTerm} searchTerm={searchTerm} 
     /> */}
        <Dialog
          open={open}
          onClose={handleClose}
        >
          {/* <div style={{ whidth: "100%", display: "flex", 
            justifyContent: "center", alignItems: "center" }}>           
            </div>*/}
          <DialogContent>
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
            
          </DialogActions>
        </Container>
      </Dialog>
      </GridToolbarContainer>
    // </div>
  );
};

export default CustomToolbar;
