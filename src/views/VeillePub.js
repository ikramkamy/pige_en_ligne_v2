import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import ResponsiveDateRangePickers from '../components/Commun/DatePicker';
import MultipleSelectMedia from '../components/Commun/MediaSelect';
import { UseVeilleStore } from "store/dashboardStore/VeilleMediaStore";
import { UseFiltersStore } from "../store/dashboardStore/FiltersStore";
import { Button } from "@mui/material";
import RecherchePub from "components/Commun/RechechePub";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Toolbar, Typography, Select, MenuItem, FormControl, InputLabel, Pagination, TextField } from '@mui/material';
import LoadingLineIndicator from "components/Commun/LineLoading";
import DateRangeTest from 'components/Commun/DateRangePickerTest';
import TableIlustration from 'assets/tableSearch.gif';
import AutomaticSideFilterBar from "components/FixedPlugin/AutomatiSideFilterBar";
import LoadingButtonData from "components/Commun/LoadingBtnData";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { UseLoginStore } from "store/dashboardStore/useLoginStore";
import AdvertisementCard from 'components/Commun/veille/MediaCardVeille2';
import BasicSpeedDial from 'components/Commun/veille/SpeedDealToolBar';
import 'components/Commun/commun.css'
export default function VeillePub() {
  const PORT = "https://immar-media.com";
  const { autoriseVeillePresse,
    autoriseVeilleRadio,
    autoriseVeilleTv, client } = UseLoginStore((state) => state)
  const history = useHistory()
  const {
    getveilletvData,
    veilletvData,
    getVeilleSearch,
    getVeilleById,
    dataVeilleISFetched,
    ResetDataveilleFetched,
    ShowSearchKey,
    setShowSearchKey,
  } = UseVeilleStore((state) => state)
  const {
    media, date1, date2, veille_diffusion, Filtersupports,
    Filterfamilles, familles, supports,
    classes,
    Filterclassesids,
    Filtersecteursids,
    secteurs,
    Filtervarietiesids,
    varieties,
    Filterannonceursids,
    annonceurs,
    Filtermarquesids,
    marques,
    Filterproduitsids,
    produits,
    SideBarFilterPosition,
    ManageSideBarfilterDisplay,
    sideBarFilterPosition,
    typeVeille
  } = UseFiltersStore((state) => state);
  const [mediaUrl, setMediaUrl] = useState("/veille_radio");
  const { DownloadExlsxFile } = UseVeilleStore((state) => state)
  const [disable, setDisable] = useState(true);
  const [dataList, setDataList] = useState([]);
  const [sortOption, setSortOption] = useState('dateAsc');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10
  const [searchTerm, setSearchTerm] = useState('');
  const [pdata, setPdata] = useState([]);
  const [sdata, setSdata] = useState('');
  const [welcomVeille, setWelcomVeille] = useState(false)
  const [showdataloading, setShowdataloading] = useState(false)
  const [fetchDataTime, setFetchDataTime] = useState(0)
  const [loadingStep, setLoadingStep] = useState(0.5)
  const [displayVeilleDate, setDisplayVeilleDate] = useState(false)
  const [loadingLineDisplay, setLoadingLineDisplay] = useState(false)
  document.title = 'veille publicitaire'
  console.log("displayveilledata", displayVeilleDate)
  console.log("display", veilletvData)
  useEffect(() => {
    // console.log("media", media)
    setPdata([])
    ResetDataveilleFetched && ResetDataveilleFetched()
    setWelcomVeille(false)
    if (media == "") {
      setDisable(true)
    } else if (media == "television") {
      setDisable(false)
      setMediaUrl("/veille_tv")
    } else if (media == "radio") {
      setDisable(false)
      setMediaUrl("/veille_radio")
    } else if (media == "presse") {
      setDisable(false)
      setMediaUrl("")
    }

  }, [media, veille_diffusion, date1, date2])

  useEffect(() => {
    if (veilletvData.length > 0) {
      // Filter out entries with null values in any required field
      const sortedData = veilletvData.filter((elem) => {
        return (
          elem.Insertion_Pub_Name !== null &&
          elem.Insertion_Supports !== null &&
          elem.Insertion_Advertiser_Id !== null &&
          elem.Insertion_Advertiser_Name !== null &&
          elem.Insertion_Brand_Id !== null &&
          elem.Insertion_Brand_Name !== null &&
          elem.Insertion_Classe_Id !== null &&
          elem.Insertion_Classe_Name !== null &&
          elem.Insertion_Diffusion !== null &&
          elem.Insertion_Famille_Id !== null &&
          elem.Insertion_Famille_Name !== null &&
          elem.Insertion_Fichier !== null &&
          elem.Insertion_Format !== null &&
          elem.Insertion_Id !== null &&
          elem.Insertion_Image !== null &&
          elem.Insertion_Premiere !== null &&
          elem.Insertion_Product_Id !== null &&
          elem.Insertion_Product_Name !== null &&
          elem.Insertion_Pub_Id !== null &&
          elem.Insertion_Secteur_Id !== null &&
          elem.Insertion_Secteur_Name !== null &&
          elem.Insertion_Type !== null &&
          elem.Insertion_Variete_Id !== null &&
          elem.Insertion_Variete_Name !== null &&
          elem.Insertion_Version !== null
        );
      }).sort((a, b) => {
        // Sort based on the selected option
        if (sortOption === 'dateAsc') {
          return new Date(a.Insertion_Premiere) - new Date(b.Insertion_Premiere);
        } else if (sortOption === 'dateDesc') {
          return new Date(b.Insertion_Premiere) - new Date(a.Insertion_Premiere);
        } else if (sortOption === 'message') {
          return a.Insertion_Pub_Name.localeCompare(b.Insertion_Pub_Name);
        } else if (sortOption === 'product') {
          return a.Insertion_Product_Name.localeCompare(b.Insertion_Product_Name);
        }
        return 0;
      });

      console.log("sortedData", sortedData);
      setSdata(sortedData);

      // Filter based on search term
      const filteredData = sortedData.filter((e) => {
        if (sortedData.length > 0) {
          const searchLower = searchTerm.toLowerCase();
          // Filter items that match the search term in any relevant field
          return (
            e.Insertion_Product_Name?.toLowerCase().includes(searchLower) ||
            e.Insertion_Pub_Id?.toString().includes(searchLower) ||
            e.Insertion_Famille_Name?.toLowerCase().includes(searchLower) ||
            e.Insertion_Brand_Name?.toLowerCase().includes(searchLower) ||
            e.Insertion_Secteur_Name?.toLowerCase().includes(searchLower) ||
            e.Insertion_Classe_Name?.toLowerCase().includes(searchLower) ||
            e.Insertion_Variete_Name?.toLowerCase().includes(searchLower) ||
            e.Insertion_Supports?.toLowerCase().includes(searchLower) ||
            e.Insertion_Advertiser_Name?.toLowerCase().includes(searchLower)
          );
        }
        return false;
      });

      console.log("filteredData", filteredData);

      // Apply pagination
      const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
      console.log("paginatedData", paginatedData);
      setPdata(paginatedData);
    } else {
      // If no data, set empty or default data
      setPdata([]);
    }
  }, [veilletvData, searchTerm, sortOption, page]);

  const handlePageChange = (event, value) => {
    console.log("page value", value)
    setPage(value);
    setPdata(pdata);
  };
  const getData = () => {
    setLoadingLineDisplay(true)
    setSearchTerm('')
    //setPdata([]);
    const startTime = new Date().getTime();
    setWelcomVeille(true)
    getveilletvData && getveilletvData(
      date1,
      date2,
      veille_diffusion,
      media,
      typeVeille,
      Filterfamilles,
      familles,
      Filtersupports, supports,
      classes,
      Filterclassesids,
      Filtersecteursids,
      secteurs,
      Filtervarietiesids,
      varieties,
      Filterannonceursids,
      annonceurs,
      Filtermarquesids,
      marques,
      Filterproduitsids,
      produits,)
    //it is not working
    setTimeout(() => {
      setShowdataloading(true)
    }, 10000);

    const endTime = new Date().getTime();
    setFetchDataTime(endTime - startTime);
    setTimeout(() => {
      setLoadingStep(fetchDataTime / 100)

    }, fetchDataTime);
    setTimeout(() => {
      setLoadingLineDisplay(false)
    }, 5000);

    setDisplayVeilleDate(true)

  }
  const DownloadFile = () => {
    DownloadExlsxFile && DownloadExlsxFile(veilletvData, media)
  }
  const handelZIPfileDownload = async () => {
    console.log("veilletvData", veilletvData)

    //const id=e.Insertion_Id
    const imageUrls = veilletvData.map((item) => `https://immar-media.com/${item.Insertion_Image}`)
    console.log("list of files to download", imageUrls)

    const zip = new JSZip();

    // Loop through each image URL
    for (const url of imageUrls) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${url}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const fileName = url.split('/').pop(); // Get the file name from the URL
        zip.file(fileName, arrayBuffer); // Add the image to the ZIP file
      } catch (error) {
        console.error('Error downloading image:', error);
      }
    }

    // Generate the ZIP file and trigger download
    zip.generateAsync({ type: 'blob' })
      .then((content) => {
        saveAs(content, 'images.zip'); // Save the ZIP file
      })
      .catch((error) => {
        console.error('Error generating ZIP file:', error);
      });

    //const files=veilletvData.map((item)=>`${PORT}${mediaUrl}/${item.Insertion_Fichier}`)

    // const zip = new JSZip();

    // const filePromises = files.map(async (file) => {
    //   try {
    //     const response = await axios.get(file);
    //     if (!response.ok) {
    //       throw new Error(`Failed to fetch ${file}: ${response.statusText}`);
    //     }
    //     const blob = await response.blob();
    //     zip.file(file.name, blob);
    //   } catch (error) {
    //     console.error(`Error fetching ${file}:`, error);

    //   }
    // });
    // // Wait for all files to be fetched
    // await Promise.all(filePromises);

    // // Generate the zip file
    // const zipBlob = await zip.generateAsync({ type: 'blob' });

    // // Trigger the download
    // saveAs(zipBlob, `${media}_web_veille_${date1}_${date2}.zip`);

  }

  const handeToggleSideBar = () => {
    ManageSideBarfilterDisplay('-100%');
  }

  const handeOpenSideBar = () => {
    const newPosition = sideBarFilterPosition === '100%' ? '0%' : '0%';
    console.log("newPosition", newPosition)
    ManageSideBarfilterDisplay('0%');
  }
  const handerechercheveille = () => {
    getVeilleSearch && getVeilleSearch(
      date1,
      date2,
      veille_diffusion,
      media
    )
  }

  useEffect(() => {


  }, [Filterfamilles, familles, Filtersupports, supports,
    classes,
    Filterclassesids,
    Filtersecteursids,
    secteurs,
    Filtervarietiesids,
    varieties,
    Filterannonceursids,
    annonceurs,
    Filtermarquesids,
    marques,
    Filterproduitsids,
    produits])
    const [resStyle, setResStyle] = useState({
    wrapDiv: 'nowrap',
    marginTopAll: '4%',
    widthRightbtns: '',
    widthImage: "500px",
    felexDirection: 'row',
    back: window.innerWidth < 768 ? 'yellow' : '',
  });

  useEffect(() => {
    const handleResize = () => {
      setResStyle({
        wrapDiv: window.innerWidth < 768 ? 'wrap' : 'nowrap',
        widthRightbtns: window.innerWidth < 768 ? '100%' : '',
        paddingLeftBtn: window.innerWidth < 768 ? '10px' : '0px',
        widthLefbtnWrapper: window.innerWidth < 768 ? '100%' : '',
        justifyContentRightBtnWrapper: window.innerWidth < 768 ? 'space-between' : 'center',
        marginTopAll: window.innerWidth < 768 ? '14vh' : '4%',
        widthImage: window.innerWidth < 768 ? '250px' : '500px',
        felexDirection: window.innerWidth < 768 ? 'column' : 'row',
        back: window.innerWidth < 768 ? 'yellow' : '',
        MarginRightbtn: window.innerWidth < 768 ? '0px' : '16px',
        textAlineCenter: window.innerWidth < 768 ? 'center' : '',
        displayFlex: window.innerWidth < 768 ? 'flex' : '',

      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (veilletvData.length > 0) {

      setDisplayVeilleDate(true)


    } else {
      setDisplayVeilleDate(false)
    }
  }, [veilletvData])
  if (!(autoriseVeillePresse || autoriseVeilleRadio || autoriseVeilleTv)) {
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
            vous n'êtes pas abonnés</b>

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
    }}

    >
      <Container style={{ maxWidth: "100%" }}>
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: 'space-between',
          flexWrap: resStyle.wrapDiv,
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: resStyle.wrapDiv
          }}>
            <MultipleSelectMedia />
            <RecherchePub />
            <div style={{
              width: "100%", height: "auto",
              marginTop: resStyle.paddingLeftBtn,
              marginLeft: resStyle.MarginRightbtn,
            }}>
              <DateRangeTest />
            </div>


          </div>
          {ShowSearchKey && (<TextField
            label="Chercher..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            style={{
              marginRight: resStyle.MarginRightbtn,
              marginTop: resStyle.paddingLeftBtn,
              backgroundColor: "white",
              borderRadius: "5px",
              height: "50px",
              border: "none"
            }}
          />)}
          <div style={{
            display: "flex",
            justifyContent: "space-between", alignItems: "center",
            width: resStyle.widthRightbtns,
            paddingTop: resStyle.paddingLeftBtn
          }}>
            <LoadingButtonData
              getData={getData}
              isloading={false}
              isSucces={false}
              disablebtn={!media || dataVeilleISFetched}
            //disablebtn={!media}
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

            {/* <AnchorTemporaryDrawer getData={getData} /> */}
          </div>


        </div>
        <div onClick={() => handeToggleSideBar()}>
          {welcomVeille ? (
            <div style={{ marginBottom: "10%" }}>
              {showdataloading ? (
                <div style={{width:"100%"}}>
                  {loadingLineDisplay && <LoadingLineIndicator 
                  step={loadingStep} totalDuration={fetchDataTime} />}
                  {(displayVeilleDate && !loadingLineDisplay) && (
                    // <Toolbar sx={{
                    //   background: "#f8f9fa",
                    //   color: "#00a6e0",
                    //   marginTop: "15px",
                    //   marginBottom: "15px",
                    //   padding: "10px 20px",
                    //   borderRadius: "8px",
                    //   boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    //   display: "flex",
                    //   justifyContent: "center",
                    //   alignItems: "center"

                    // }}>
                    //   <div style={{
                    //     display: 'flex',
                    //     flexDirection: resStyle.felexDirection,
                    //     width: "100%",

                    //   }}>
                    //     <Typography variant="h6" style={{
                    //       flexGrow: 1,
                    //       textTransform: "none",
                    //       textAlign: resStyle.textAlineCenter,
                    //       display: resStyle.displayFlex,
                    //       flexDirection: resStyle.felexDirection,
                    //       alignItems: "center"


                    //     }}>
                    //       {media === "television" ? 
                    //       "Télèvision" : media === "radio" ? 
                    //       "Radio" : media === "presse" ? "Presse" : ""}
                    //       &nbsp;Publicités&nbsp;&nbsp;
                    //       Total:{veilletvData.length}
                    //     </Typography>


                    //     <Typography variant="h6" 
                    //     style={{ flexGrow: 1, color: "#00a6e0", fontSize: "18px" }}>

                    //     </Typography>
                    //     <div style={{ display: "flex",flexGrow:"1" }}>

                    //       <div style={{
                    //         cursor: "pointer", display: "flex",
                    //         flexDirection: "column",
                    //         alignItems: "center",
                    //         justifyContent: "center",
                    //         marginRight: "15px"
                    //       }} onClick={DownloadFile}>
                    //         <SimCardDownloadIcon
                    //           sx={{ color: "#00a6e0" }} />
                    //         <p style={{
                    //           textTransform: "",
                    //           fontSize: "10px", color: "#00a6e0"
                    //         }}>Exporter</p>
                    //       </div>

                    //       <div style={{
                    //         cursor: "pointer", display: "flex",
                    //         flexDirection: "column", alignItems: "center", justifyContent: "center"
                    //       }} onClick={handelZIPfileDownload}>
                    //         <FolderZipIcon sx={{ color: "#00a6e0" }} />
                    //         <p style={{ textTransform: "", fontSize: "10px",
                    //            color: "#00a6e0" }}>Télèchrger ZIP</p>
                    //       </div>
                    //       {/* </Typography> */}

                    //     </div>
                    //     <TextField
                    //       label="Chercher..."
                    //       variant="outlined"
                    //       size="small"
                    //       value={searchTerm}
                    //       onChange={(e) => {
                    //         setSearchTerm(e.target.value);
                    //         setPage(1); // Reset to the first page on new search
                    //       }}
                    //       style={{
                    //         marginRight: resStyle.MarginRightbtn,
                    //         marginTop: resStyle.paddingLeftBtn
                    //       }}
                    //     />

                    //     <FormControl variant="outlined" size="small" sx={{ marginTop: resStyle.paddingLeftBtn }}>
                    //       <InputLabel>Trier Par</InputLabel>
                    //       <Select
                    //         value={sortOption}
                    //         onChange={(e) => setSortOption(e.target.value)}
                    //         label="Sort By"
                    //       >
                    //         <MenuItem value="dateAsc">Date (Asc)</MenuItem>
                    //         <MenuItem value="dateDesc">Date (Desc)</MenuItem>
                    //         <MenuItem value="message">Message</MenuItem>
                    //         <MenuItem value="product">Produit</MenuItem>
                    //       </Select>
                    //     </FormControl>
                    //   </div>

                    // </Toolbar>
                    <BasicSpeedDial DownloadFile={DownloadFile}
                      handelZIPfileDownload={handelZIPfileDownload} />

                  )}
                  {(displayVeilleDate && !loadingLineDisplay) && (
                    <div className="veilledata tootbal-element"
                    style={{width:"100%",display:"flex",
                       justifyContent:"center", 
                      flexDirection:"column"
                     
                    }}
                     >
                      {/* {pdata?.map((e) => (<MediaControlCard
                        key={veilletvData.indexOf(e)}
                        diffusion_first={e.Insertion_Premiere}
                        creation={`${PORT}/${e.Insertion_Image}`}
                        product={e.Insertion_Product_Name}
                        id_message={e.Insertion_Pub_Id}
                        message={e.Insertion_Pub_Name}
                        format={e.Insertion_Format}
                        version={e.Insertion_Version}
                        fichier={`${PORT}${mediaUrl}/${e.Insertion_Fichier}`}
                        famille={e.Insertion_Famille_Name}
                        classe={e.Insertion_Classe_Name}
                        secteur={e.Insertion_Secteur_Name}
                        marque={e.Insertion_Brand_Name}
                        support={e.Insertion_Supports}
                        produit={e.Insertion_Product_Name}
                        variete={e.Insertion_Variete_Name}
                        annonceur={e.Insertion_Advertiser_Name}
                        id={media === "presse" ? e.Insertion_Id : e.Insertion_Fichier}
                      />)) */}
                      <div className="advertisment_wrap" style={{
                        display: "flex", flexWrap: "wrap",
                        justifyContent:"space-between" , 
                        marginTop:"20px"                      
                      }}>
                        {pdata?.map((e) => (<AdvertisementCard
                          key={veilletvData.indexOf(e)}
                          diffusion_first={e.Insertion_Premiere}
                          creation={`${PORT}/${e.Insertion_Image}`}
                          product={e.Insertion_Product_Name}
                          id_message={e.Insertion_Pub_Id}
                          message={e.Insertion_Pub_Name}
                          format={e.Insertion_Format}
                          version={e.Insertion_Version}
                          fichier={`${PORT}${mediaUrl}/${e.Insertion_Fichier}`}
                          famille={e.Insertion_Famille_Name}
                          classe={e.Insertion_Classe_Name}
                          secteur={e.Insertion_Secteur_Name}
                          marque={e.Insertion_Brand_Name}
                          support={e.Insertion_Supports}
                          produit={e.Insertion_Product_Name}
                          variete={e.Insertion_Variete_Name}
                          annonceur={e.Insertion_Advertiser_Name}
                          id={media === "presse" ? e.Insertion_Id : e.Insertion_Fichier}
                          

                        />))
                        }
                      </div>
                      <Pagination
                        count={Math.ceil(sdata.length / itemsPerPage)}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        sx={{
                          display: 'flex', justifyContent: 'center',
                          marginTop: '20px', marginBottom: '20px',
                          '& .MuiPaginationItem-root': {
                            color: 'white',
                          },

                        }}
                      />
                    </div>
                  )
                  }
                  {(!displayVeilleDate && dataVeilleISFetched) && (
                    //addloading condition
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
                    </Container>

                  )
                  }
                </div>)
                : (
                  <div></div>
                )}
            </div>
          ) : (
            <div className="w-100 justify-content-center" style={{ display: "flex" }}>
              <img src={TableIlustration}
                alt="immar media"
                width={resStyle.widthImage}
                height={resStyle.widthImage} />
            </div>

          )}
        </div>
        <AutomaticSideFilterBar getData={getData} />
      </Container>
    </div>
  );
}
